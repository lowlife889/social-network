"use client";

import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import Public from "@/components/Public";
import { useRouter } from "next/navigation";
import "@/app/globals.css"
import "@/app/atsnigram/[id]/home.css";
function Main({params}) {
  const [carga, setCarga] = useState("");
  const [publicaciones, setPublicaciones] = useState(null);
  const router= useRouter()
  const getPublic = async () => {
    const session= await getSession()
    if(session){
      if(session.user.name != params.id){
        router.push(`/atsnigram/${session.user.name}`)
      }
    }
    const res = await fetch("/api/getPublic", {
      method: "POST",
      body: {
        todoOk: "ok",
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if (data.response[0] == undefined) {
      setPublicaciones(null);
    } else {
      setCarga("carga-animation");
      setPublicaciones(data.response.reverse());
    }
  };

  useEffect(() => {
    getPublic();
  }, []);

  return (
    <div className="home-container">
      <div className={`publicaciones-container ${carga}`}>
        {publicaciones ? (
          <>
            {publicaciones.map((x, i) => {
              return (
                <Public
                  key={i}
                  img={x.img}
                  username={x.username}
                  desc={x.desc}
                  fecha={x.createdAt}
                  perfilImg={x.perfilImagen}
                  id={x.id}
                  del={false}
                  funcion={null}
                  cond={false}
                ></Public>
              );
            })}
          </>
        ) : (
          <h2 className="noP">No hay publicaciónes disponibles</h2>
        )}
      </div>
    </div>
  );
}

export default Main;
