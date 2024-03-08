"use client";
import React, { useState } from "react";
import "@/app/atsnigram/[id]/home.css";
import LazyLoad from "react-lazy-load";
import { useRouter } from "next/navigation";
function Public({
  username,
  img,
  desc,
  fecha,
  perfilImg,
  del,
  id,
  funcion,
  cond,
}) {
  const [loaded, setLoaded] = useState(false);
  const router= useRouter()
  const deletePublic = async () => {
    const data = await fetch("/api/getProfilePublic", {
      method: "DELETE",
      body: JSON.stringify({
        id: id,
      }),
      headers: {
        "Content-Type": "aplication/json",
      },
    });
  };

  return (
    <div className="publicacion">
      <div className="name-container">
        <div
          className="avatar"
          style={{
            backgroundImage: `url(${perfilImg})`,
            minWidth: "38px",
            backgroundSize: "cover",
            backgroundPosition: "center",
            imageRendering: "smooth",
          }}
          
        ></div>
        <h4
          style={{
            cursor: "pointer",
          }}
          onClick={() => {
            router.push(`/atsnigram/${username}/profile`);
          }}
        >
          {username}
        </h4>
        {del && cond && (
          <div className="delete" style={{ textAlign: "end", width: "80%" }}>
            <span style={{cursor:"pointer", fontSize:"13px", fontWeight:"700"}} onClick={() => {
                deletePublic();
                if (funcion != null) {
                  funcion();
                }
              }}> 
              Eliminar
            </span>

          </div>
        )}
      </div>
      <LazyLoad height={"fit-content"} offset={300}>
        <>
          <div className="img">
            <img
              onLoad={() => setLoaded(true)}
              style={{ opacity: loaded ? 1 : 0 }}
              className="imagen"
              loading="lazy"
              src={img}
            />
          </div>
          <div className="desc-container">
            <p style={{ marginTop: "10px" }}>{desc}</p>
            <span className="fecha">
              {new Date(fecha).toLocaleDateString()}
            </span>
          </div>
        </>
      </LazyLoad>
    </div>
  );
}

export default Public;
