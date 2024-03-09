import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import prisma from "@/libs/prisma";
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure:true
});

export async function POST(req) {
  const response = await req.formData();
  const image = await response.get("file");
  const username = await response.get("username");
  const desc = await response.get("description");

  const perfilImagen= await prisma.user2.findUnique({
    where:{
      username: username
    }
  })
  if (!image) {
    return NextResponse.json("No se ha subido ninguna imagen", { status: 400 });
  }else{
    const fileBuffer = await image.arrayBuffer();
    var mime = image.type; 
    var encoding = 'base64'; 
    var base64Data = Buffer.from(fileBuffer).toString('base64');
    var fileUri = 'data:' + mime + ';' + encoding + ',' + base64Data;

    try {
    
      const uploadToCloudinary = () => {
        return new Promise((resolve, reject) => {
  
            var result = cloudinary.uploader.upload(fileUri, {
              invalidate: true
            })
              .then((result) => {
                resolve(result);
              })
              .catch((error) => {
                reject(error);
              });
        });
      };
  
      const result = await uploadToCloudinary();
      
      let imageUrl = result.secure_url;
  
      await prisma.publicacion.create({
        data:{
          perfilImagen:perfilImagen.img,
          username:username,
          img:imageUrl,
          desc: desc,
        }
      })
  
      return NextResponse.json({
        message: "imagen subida",
        url:imageUrl,
      });

    } catch (error) {
      console.log("server err", error);
      return NextResponse.json({ err: "Internal Server Error" }, { status: 500 });
    }

    
  }
  
    
}
