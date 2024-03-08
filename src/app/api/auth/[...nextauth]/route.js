import NextAuth from "next-auth/next";
import CredentialsProvider  from "next-auth/providers/credentials";
import prisma from "@/libs/prisma";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password", placeholder: "*****" },
      },
      async authorize(credentials, req) {
        const userFound = await prisma.user2.findUnique({
            where: {
                email: credentials.email
            }
        })

        if (!userFound) throw new Error('No se encontro el usuario')
      
        const matchPassword = await bcrypt.compare(credentials.password, userFound.password)

        if (!matchPassword) throw new Error('Contraseña incorrecta')
        
        return {
            id: userFound.id,
            name: userFound.username,
            email: userFound.email,
        }
      },
    }),
  ],
  pages: {
    signIn: "/"
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };