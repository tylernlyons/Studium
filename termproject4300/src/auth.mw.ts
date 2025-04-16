import { NextAuthConfig } from "next-auth";

export const authMWConfig: NextAuthConfig = {
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    providers: [],
};
