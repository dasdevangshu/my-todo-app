import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "./lib/mongodb";

const config = {
    callbacks: {
        async redirect({ url, baseUrl }) {
            return baseUrl
        }
    },
    adapter: MongoDBAdapter(clientPromise),
    providers: [GitHub({clientId: process.env.GITHUB_CLIENT_ID, clientSecret: process.env.GITHUB_CLIENT_SECRET})]
} satisfies NextAuthConfig;

export const {handlers, auth, signIn, signOut} = NextAuth(config)