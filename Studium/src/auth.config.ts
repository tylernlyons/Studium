import { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "./models/userSchema";

// Define an interface for the user object
interface UserType {
    _id: string;
    email: string;
    name: string;
    password: string;
}

// NextAuth configuration object
export const authOptions: NextAuthConfig = {
    secret: process.env.NEXTAUTH_SECRET, // Secret used to encrypt JWT/session tokens

    session: {
        strategy: "jwt", // Using stateless JWT-based session strategy
    },

    // Add credentials as authentication provider
    providers: [
        CredentialsProvider({
            // Define expected login form fields
            credentials: {
                email: {},
                password: {},
            },

            // Authorization logic
            async authorize(credentials) {
                if (!credentials) return null;

                try {
                    // Find user in database by email
                    const user = await User.findOne({ email: credentials.email }).lean() as unknown as UserType;

                    if (user) {
                        // Compare hashed password in DB with input password
                        const isMatch = await bcrypt.compare(
                            credentials.password as string,
                            user.password
                        );

                        // If password matches, return user data
                        if (isMatch) {
                            return {
                                id: user._id.toString(),
                                email: user.email,
                                name: user.name,
                            };
                        } else {
                            console.log("Email or Password is not correct");
                            return null; // Invalid credentials
                        }
                    } else {
                        console.log("User not found");
                        return null;
                    }
                } catch (error: unknown) {
                    // Log and fail on error
                    console.log("An error occurred: ", error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token?.id && session.user) {
                session.user.id = token.id as string;
            }
            return session;
        }
    },

};
