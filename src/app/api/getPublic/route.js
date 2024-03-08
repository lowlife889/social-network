import { NextResponse } from "next/server"
import prisma from "@/libs/prisma"
export async function POST(req){

  const data= await prisma.publicacion.findMany();
  

  return NextResponse.json({
    response:data,
  })
}