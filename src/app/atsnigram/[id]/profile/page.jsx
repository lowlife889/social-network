"use client";

import React from "react";
import { useState, useEffect } from "react";
import "@/app/atsnigram/[id]/home.css";
import { signOut } from "next-auth/react";
import "@/app/atsnigram/[id]/profile/profile.css";
import Public from "@/components/Public";
import { getSession } from "next-auth/react";

function Profile({ params }) {
  const [perfilImg, setPerfilImg] = useState("");
  const [sessionUser, setSessionUser] = useState(null);
  const [hayImg, setHayImg] = useState(null);
  const [perfilImagen, setPerfilImagen] = useState("");
  const [animation, setAnimation] = useState(null);
  const [publicaciones, setPublic] = useState(null);
  const [openP, setOpenP] = useState(null);
  const [imagen, setImagen] = useState(null);
  const [id, setId] = useState(null);
  const [descripcion, setDescripcion] = useState(null);
  const [fecha, setFecha] = useState(null);
  const [nPosts, setNPosts] = useState(0);
  const [onAnimation, setOnAnimation] = useState(false);
  const getPublic = async () => {
    const session = await getSession();
    setSessionUser(session.user.name);

    const res = await fetch(`/api/getProfilePublic`, {
      method: "POST",
      body: JSON.stringify({
        username: params.id,
      }),
      headers: {
        "Content-Type": "/aplication/json",
      },
    });
    const response = await res.json();
    setNPosts(response.response.length);
    setPerfilImg(response.img);
    setPublic(response.response.reverse());
  };

  const changePerfilImg = async (e) => {
    e.preventDefault();
    setHayImg(null);
    if (perfilImagen != null) {
      const formData = new FormData();

      formData.append("file", perfilImagen);
      formData.append("username", params.id);

      const res = await fetch("/api/changeImg", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      setPerfilImg(data.img);
      setOnAnimation(true);
      setTimeout(() => {
        setOnAnimation(false);
      }, 2000);
    }
  };

  const showPublic = (img, desc, fecha, id) => {
    setOpenP("ok");
    setDescripcion(desc);
    setImagen(img);
    setFecha(fecha);
    setId(id);
  };
  useEffect(() => {
    getPublic();
  }, []);

  useEffect(() => {}, [perfilImagen]);

  return (
    <div className="home-container">
      {publicaciones ? (
        <div className="publicaciones-container">
          <div className="perfil-container">
            <div className="perfil-container2">
              {openP ? (
                <>
                  <div className="back-container">
                    <div
                      className="back"
                      onClick={() => {
                        setOpenP(null);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    </div>
                  </div>
                  <Public
                    img={imagen}
                    username={params.id}
                    desc={descripcion}
                    fecha={fecha}
                    perfilImg={perfilImg}
                    id={id}
                    del={true}
                    cond={sessionUser == params.id}
                    funcion={() => {
                      setTimeout(() => {
                        getPublic();
                        setTimeout(() => {
                          setOpenP(null);
                        }, 700);
                      }, 500);
                    }}
                  ></Public>
                </>
              ) : (
                <>
                  <div className="header">
                    <form
                      onSubmit={changePerfilImg}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        height: 200,
                        width: "fit-content",
                      }}
                    >
                      <label
                        className={`perfil-img ${
                          onAnimation ? "onAnimation" : ""
                        }`}
                        htmlFor={`${
                          sessionUser == params.id && "file-upload2"
                        }`}
                        style={{
                          backgroundImage: `url(${perfilImg})`,
                          cursor: `${sessionUser == params.id && "pointer"}`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          imageRendering: "smooth",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "#ECE9D9",
                        }}
                        onPointerOver={() => {
                          setAnimation("on");
                        }}
                        onPointerLeave={() => {
                          setAnimation(null);
                        }}
                        onClick={() => {
                          setAnimation(null);
                        }}
                      >
                        {animation && sessionUser == params.id && (
                          <>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-6 h-6"
                              style={{
                                width: "100%",
                                height: "100%",
                                backgroundColor: "rgb(0, 0, 0, .7)",
                                padding: "30px",
                                color: "#FFFBEB",
                                borderRadius: 150,
                                backdropFilter: "blur(3px)",
                              }}
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                              />
                            </svg>
                          </>
                        )}
                      </label>
                      <input
                        type="file"
                        onChange={(e) => {
                          setHayImg("ok");
                          setPerfilImagen(e.target.files[0]);
                        }}
                        style={{ display: "none", width: 0 }}
                        id="file-upload2"
                      />
                      <button
                        className="btn3"
                        style={{ display: hayImg ? "flex" : "none" }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6"
                          style={{ width: 30, height: 30 }}
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m4.5 12.75 6 6 9-13.5"
                          />
                        </svg>
                      </button>
                    </form>
                    <div className="data-container">
                      <div className="line1">
                        <h2>{params.id}</h2>
                        <>
                          {sessionUser == params.id ? (
                            <button
                              className="btn11"
                              onClick={() => {
                                signOut();
                              }}
                            >
                              Cerrar sesion
                            </button>
                          ) : (
                            <></>
                          )}
                        </>
                      </div>
                      <div
                        className="stats-container"
                        style={{
                          justifyContent: `${sessionUser != params.id && "start"}`,
                          marginLeft: `${sessionUser != params.id && "3px"}`,
                        }}
                      >
                        <span className="stats">
                          <strong>{nPosts}</strong> Publicaciónes
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="posts-container">
                    <h3>Publicaciónes</h3>
                    <div className="post">
                      <div className="post-container">
                        {publicaciones.map((x, i) => {
                          return (
                            <div
                              key={i}
                              style={{
                                backgroundImage: `url(${x.img})`,
                              }}
                              className="post-img"
                              onClick={() => {
                                showPublic(x.img, x.desc, x.createdAt, x.id);
                              }}
                            ></div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div
          className="loading"
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: 200,
            fontSize: 18,
            fontWeight: 500,
            color: "#451a0370",
          }}
        >
          Cargando perfil
        </div>
      )}
    </div>
  );
}

export default Profile;
