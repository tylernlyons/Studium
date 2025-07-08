//auth config for the middleware to use for redirection

import { NextAuthConfig } from "next-auth";

export const authMWConfig: NextAuthConfig = {
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    providers: [],
};
