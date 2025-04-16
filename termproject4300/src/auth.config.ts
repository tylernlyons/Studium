import { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "./models/userSchema";

interface UserType {
    _id: string;
    email: string;
    name: string;
    username: string;
    password: string;
}

export const authConfig: NextAuthConfig = {
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    providers: [CredentialsProvider({
        credentials: {
            email: {},
            password: {},
        },
        async authorize(credentials) {

            if (!credentials) return null;

            try {
                const user = await User.findOne({ email: credentials.email }).lean() as unknown as UserType;

                if (user) {
                    const isMatch = await bcrypt.compare(
                        credentials.password as string,
                        user.password
                    );
                    console.log("Received credentials:", credentials);
                    console.log("Found user:", user);
                    console.log("Password match:", isMatch);
                    if (isMatch) {
                        return {
                            id: user._id.toString(),
                            email: user.email,
                            name: user.name || user.username,
                        };
                    } else {
                        console.log("Email or Password is not correct");
                        return null;
                    }
                } else {
                    console.log("User not found");
                    return null;
                }
            } catch (error: any) {
                console.log("An error occurred: ", error);
                return null;
            }
        },
    }),
    ],
};
