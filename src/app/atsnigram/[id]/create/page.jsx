"use client";
import { IoCloudUploadOutline } from "react-icons/io5";
import { CiCircleCheck } from "react-icons/ci";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import React from "react";
import "@/app/atsnigram/[id]/create/create.css";
import { useRouter } from "next/navigation";
function Create({ params }) {
  const [file, setFilee] = useState(null);
  const [filee, setFile] = useState(null);
  const [description, setDescription] = useState(null);
  const [desc, setDesc] = useState("desc");
  const [ok, setOk] = useState(null);
  const [ok2, setOk2] = useState(null);
  const [tieneAcceso, setTieneAcceso] = useState(false);
  const [enviado, setEnviado] = useState("");
  const router = useRouter();
  const obtenerSession = async () => {
    const session = await getSession();
    if(session){
      if (params.id == session.user.name) {
        setTieneAcceso(true);
      }else{
        router.push(`/atsnigram/${session.user.name}/create`)
      }
    }
  }

  useEffect(()=>{
    obtenerSession();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (filee != null && description != null) {
      setEnviado("ok");
      const formData = new FormData();

      formData.append("file", filee);
      formData.append("username", params.id);
      formData.append("description", description);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      setDescription("");
      setDesc("desc");
      setOk("ok");
      setOk2(null);
      setFilee(null);
      setTimeout(() => {
        router.push(`/atsnigram/${params.id}`);
        setTimeout(() => {
          setOk(null);
        }, 200);
      }, 1500);
    }
  };
  return (
    <div className="create-container">
      {tieneAcceso ? (
        <form className="create-form" onSubmit={onSubmit}>
          <h2>Crea una nueva publicación</h2>
          <textarea
            placeholder="Escribe una descripción sobre esta publicación"
            className={desc}
            maxLength={300}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              if (
                e.target.value == null ||
                e.target.value == "" ||
                description == ""
              ) {
                setDesc("desc");
              } else {
                setDesc("desc desc1");
              }
            }}
          />
          <div className="botones-container">
            {ok ? (
              <span className="tick">
                Redireccionando{" "}
                <CiCircleCheck className="check"></CiCircleCheck>
              </span>
            ) : (
              <>
                {ok2 ? (
                  <span className="tick tick2">
                    Procesando imagen
                    <CircularProgress className="load" color="inherit" />
                  </span>
                ) : (
                  <></>
                )}
              </>
            )}
            <label
              className={`custom-file-upload ${enviado}`}
              htmlFor="file-upload"
            >
              {file != null ? <>Cambiar imagen</> : <>Seleccionar imagen</>}
            </label>
            <input
              id="file-upload"
              type="file"
              onChange={(e) => {
                setFile(e.target.files[0]);
                setFilee(e);
              }}
            />

            <button
              onClick={() => {
                setOk2("ok");
              }}
              className={`btn2 ${enviado}`}
            >
              <IoCloudUploadOutline className="upload"></IoCloudUploadOutline>
            </button>
          </div>
        </form>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Create;
