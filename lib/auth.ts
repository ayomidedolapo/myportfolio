import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { prisma } from "./prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) return null

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email as string },
          })

          if (!user || !user.isAdmin) return null

          const isValid = await bcrypt.compare(
            credentials.password as string,
            user.password
          )

          if (!isValid) return null

          return {
            id: user.id,
            email: user.email,
            name: user.name,
          }
        } catch (e) {
          // Fallback for when DB is asleep — allow env-based login
          if (
            credentials.email === process.env.ADMIN_EMAIL &&
            credentials.password === process.env.ADMIN_PASSWORD
          ) {
            return {
              id: "admin-fallback",
              email: process.env.ADMIN_EMAIL as string,
              name: "Admin",
            }
          }
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      return session
    },
  },
})