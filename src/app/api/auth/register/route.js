import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import bcrypt from "bcrypt";

export async function POST(request){
  try{
    const data = await request.json();

    const userFound = await prisma.user2.findUnique({
      where: {
        email: data.email,
      },
    });

    if (userFound) {
      return NextResponse.json(
        {
          message: "El email ya existe",
        },
        {
          status: 400,
        }
      );
    }

    const userNameFound = await prisma.user2.findUnique({
      where: {
        username: data.username,
      },
    });

    if (userNameFound) {
      return NextResponse.json(
        {
          message: "El nombre de usuario ya existe",
        },
        {
          status: 400,
        }
      );
    }


    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await prisma.user2.create({
      data: {
        username: data.username,
        img: " ",
        email: data.email,
        password: hashedPassword,
      },
    });


    const { password: _, ...user2 } = newUser;

    
    return NextResponse.json(user2);
  }catch(error){
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    )
  }

}