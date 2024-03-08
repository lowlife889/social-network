"use client"
import { useRouter } from "next/navigation";

export default function Custom() {
  const router= useRouter()

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <h1
        style={{
          fontWeight: 600,
          fontSize: "25px",
          textAlign: "center",
          paddingInline: "10px",
        }}
      >
        404 - Página no encontrada
      </h1>
      <h2
        style={{
          fontWeight: 400,
          fontSize: "18px",
          textAlign: "center",
          paddingInline: "10px",
        }}
      >
        Lo sentimos, no pudimos encontrar la página que estás buscando.
      </h2>
        <button
        onClick={()=>{
          router.back()
        }}
          className="btn1"
          style={{
            alignSelf: "center",
            width: "200px",
            marginTop: "20px",
            fontSize: "15px",
            fontWeight: "500",
          }}
        >
          Volver
        </button>

    </div>
  );
}
