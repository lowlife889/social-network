import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import prisma from "@/libs/prisma";
cloudinary.config({
  cloud_name: "driszyrgu",
  api_key: "456272356289637",
  api_secret: "hqrlduO-aO-dmanX3HvFW74CLow",
  secure:true
});

export async function POST(req) {
  const response = await req.formData();
  const image = await response.get("file");
  const username = await response.get("username");

  const fileBuffer = await image.arrayBuffer();
  var mime = image.type; 
  var encoding = 'base64'; 
  var base64Data = Buffer.from(fileBuffer).toString('base64');
  var fileUri = 'data:' + mime + ';' + encoding + ',' + base64Data;

  const user = await prisma.user2.findUnique({
    where: { username: username },
  });
  const publicaciones = await prisma.publicacion.findMany({
    where: { username: username },
  });
  

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

    publicaciones.map(async (x) => {
      x.perfilImagen = imageUrl;
  
      const publicUpdated = await prisma.publicacion.update({
        where: { username: username, id: x.id },
        data: x,
      });
    });
  
  
    user.img = imageUrl;
  
    const userUpdated = await prisma.user2.update({
      where: { username: username },
      data: user,
    });
  
    return NextResponse.json({
      img: imageUrl,
    });

  } catch (error) {
    console.log("server err", error);
    return NextResponse.json({ err: "Internal Server Error" }, { status: 500 });
  }

  
}
