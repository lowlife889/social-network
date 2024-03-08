import { NextResponse } from "next/server"
import prisma from "@/libs/prisma"
export async function POST(req){
  const res= await req.json()
  const data= await prisma.publicacion.findMany({
    where:{
      username:res.username
    }
  });
  const data2= await prisma.user2.findUnique({
    where:{
      username:res.username
    }
  });

  return NextResponse.json({
    response: data,
    img: data2.img
  })
}

export async function DELETE(response){
  const res= await response.json()

  const publicacion= await prisma.publicacion.delete({
    where:{
      id:res.id
    }
  })

  return NextResponse.json({
    message:"ok",
  })
}