import { NextAuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'

export const authOptions:NextAuthOptions={
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENTID!,
            clientSecret:process.env.GOOGLE_CLIENTSECRET!,
        })
    ],
    
}