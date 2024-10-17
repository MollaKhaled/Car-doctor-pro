import connectDb from "@/lib/connectDb";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcrypt";
import { signIn } from 'next-auth/react';
export const authOptions = {
  // secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  // session: {
  //   strategy: 'jwt',
  //   maxAge: 60 * 60 * 24 * 30,
  // },
  // providers: [
  //   CredentialsProvider({
  //     credentials: {
  //       User: {
  //         label: "User Name",
  //         type: "Text",
  //         required: true,
  //         placeholder: "Your User Name",
  //         name: 'user name'
  //       },
  //       email: {
  //         label: "Email",
  //         type: "text",
  //         required: true,
  //         placeholder: "Your Email",
  //         name: 'email'
  //       },
  //       password: {
  //         label: "password",
  //         type: "password",
  //         required: true,
  //         placeholder: "Your Password",
  //         name: 'password'
  //       },

  //     },
  //     async authorize(credentials) {
  //       const { email, password } = credentials;
  //       if (!credentials) {
  //         return null;
  //       }
  //       if (email) {
  //         const nextDb = await connectDb();
  //         const currentUser = await nextDb.collection('members').findOne({ email })
  //         console.log({currentUser});

  //         if (currentUser) {
  //           if (currentUser.password === password) {
  //             return currentUser;
  //           }
  //         }
  //       }
  //       else null;
  //     }
  //   }),
  //     GoogleProvider({
  //       clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  //       clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
  //     }),

  //     GitHubProvider({
  //       clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
  //       clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET,
  //     })

  // ],
  //   callbacks: {
  //     async jwt({ token, account, user }) {
  //       // Persist the OAuth access_token and or the user id to the token right after signin
  //       if (account) {
  //         token.type = user.type

  //       }
  //       return token;
  //     },
  //     async session({ session, user, token }) {

  //       // session.user.type = user.type
  //       session.user.type = token.type
  //       return session;
  //     },
  //   }
}
const handler = NextAuth({
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 30,
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},

      },
      async authorize(credentials) {
        const { email, password } = credentials;
        if (!email || !password) {
          return null;
        }
        const carDb = await connectDb();
        const currentUser = await carDb.collection('users').findOne({ email })
        if (!currentUser) {
          return null;
        }
        const passwordMatched = bcrypt.compareSync(
          password,
          currentUser.password
        );
        if (!passwordMatched) {
          return null;
        }
        return currentUser;

      }

    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),

    GitHubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET,
    })

  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === 'google' || account.provider === 'github') {
        const { name, email, image } = user;
        try {
          const carDb = await connectDb();
          const userCollection = await carDb.collection('users')
          const userExist = await userCollection.findOne({ email })
          if (!userExist) {
            const res = await userCollection.insertOne(user);
            return user;
          }
        }
        catch (error) {
          console.log(error);
        }
      }
      else {
        return user;
      }
    }
  },
  pages: {
    signIn: "/login"
  }
});


export { handler as GET, handler as POST };

