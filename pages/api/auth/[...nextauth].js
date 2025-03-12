import NextAuth from "next-auth"
import CredentialProvider from 'next-auth/providers/credentials'
import {db} from "@/lib/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";


export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialProvider({
            name:"Credentials",
            credentials:{
                email:{label:"Email Address",type:"string"},
                password:{label:"Password",type:"string"},
            },
            async authorize(credentials, req) {

                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Email and password are required');
                }
                const userSnapshot = await getDocs(query(collection(db, "user"), where("email", "==", credentials.email)));

                    if (userSnapshot.empty) {
                      return {message:"User not found"};
                    }

                    const user = userSnapshot.docs[0].data();
                    if(user && user.password === credentials.password) {
                        return {id:user.id,email:user.email};
                    }
                    return  null
            },
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
            session.id = token.id;
            session.email = token.email;
            return session;
        },
    },
    pages: {
        signIn: '/auth/signin',
       signUp: '/auth/signup',

    },


}

export default NextAuth(authOptions)