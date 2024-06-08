import type { NextAuthConfig, User } from "next-auth";
import NextAuth, { CredentialsSignin } from "next-auth";
import GitHub from "next-auth/providers/github";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "./lib/mongodb";
import Credentials from "next-auth/providers/credentials"
import { CheckUser } from "./lib/checkUser";
import type { Provider } from "next-auth/providers"

class InvalidLoginError extends CredentialsSignin {
    code = "Invalid Username or Password"
  }

const providers : Provider[] = [
    GitHub({ clientId: process.env.GITHUB_CLIENT_ID, clientSecret: process.env.GITHUB_CLIENT_SECRET }),
    Credentials({
        name: "Credentials",
        credentials: {
            username: {
                label: "Username"
            },
            password: {
                label: "Password",
                type: "password"
            },
        },
        authorize: async (credentials) => {
            const CheckUserResult = await CheckUser(credentials.username as string, credentials.password as string)
            
            if (CheckUserResult) {
                const tempid = JSON.parse(JSON.stringify(CheckUserResult))._id
                const user: User = {
                    id: tempid,
                    name: credentials.username as string
                }
                return user
            }
            else {
                throw new InvalidLoginError()
            }
        }
    }),
]

const config = {
    callbacks: {
        async redirect({ url, baseUrl }) {
            return baseUrl
        },
        jwt({ token, user }) {
            if (user) { // User is available during sign-in
                token.id = user.id
            }
            return token
        },
        session({ session, token }) {
            session.user.id = token.id as string
            return session
        },
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    adapter: MongoDBAdapter(clientPromise),
    providers: providers,
    pages: {
        signIn: "/signin",
    }
} satisfies NextAuthConfig;

export const providerMap = providers.map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider()
      return { id: providerData.id, name: providerData.name }
    } else {
      return { id: provider.id, name: provider.name }
    }
  })

export const { handlers, auth, signIn, signOut } = NextAuth(config)