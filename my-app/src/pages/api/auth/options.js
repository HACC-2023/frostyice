import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";

// TODO: need to add MongoDB for user accounts. Temporarily using process.env
export const options = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email:",
          type: "text",
          placeholder: "enter email",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "enter password",
        },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          await connectDB();
          console.log("email", email);
          const user = await User.findOne({ email: email });
          const users = await User.find({});
          console.log("all users:", users);
          console.log("user:", user);

          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);
          console.log("passwordsMatch:", passwordsMatch);

          if (!passwordsMatch) {
            return null;
          }

          return user;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],
  callbacks: {
    // Ref: https://authjs.dev/guides/basics/role-based-access-control#persisting-the-role
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.orgId = user.orgId;
      }
      return token;
    },
    // If you want to use the role in client components
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.orgId = token.orgId;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/credentials-signin",
    error: "/auth/signin"
    // error: "/auth/error",
    // Error code passed in query string as ?error=
  },
};
