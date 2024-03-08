"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getSession } from "next-auth/react";
import { Gruppo } from "next/font/google";
const shadows = Gruppo({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
});

export default function Login() {
  const [errorss, setError] = useState(null);
  const [ok, setOk] = useState("ok");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  
  const obtenerSession = async () => {
    const session = await getSession();
    if (session) {
      let ruta = session.user.name;
      router.push(`/atsnigram/${ruta}`);
    } else {
      setOk(null);
    }
  };

  const [page, setPage] = useState(true);

  const onSubmit1 = handleSubmit(async (data) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res.error) {
      setError(res.error);
    } else {
      obtenerSession();
    }
  });

  const onSubmit2 = handleSubmit(async (data) => {
    if (data.confirmPassword != data.password) {
      setError("Las contraseñas no coinciden")
    }else{
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          username: data.user,
          email: data.email,
          password: data.password,
        }),
        headers: {
          "Content-Type": "aplication/json",
        },
      });
      if (res.ok) {
        setPage(true);
      } else {
        const response = await res.json();
        setError(response.message);
      }
    }
    
  });

  useEffect(() => {
    obtenerSession();
  }, []);

  return (
    <main className="page-container">
      {ok ? (
        <></>
      ) : (
        <div className="form-container">
          <div className="title-container">
            <h1 className={shadows.className}>atsnigram</h1>
          </div>
          {page ? (
            <form onSubmit={onSubmit1}>
              <div className="inp-container">
                <label htmlFor="email1">Email</label>
                <input
                  id="email1"
                  type="email"
                  maxLength={40}
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Requerido",
                    },
                  })}
                />
                {errors.email && <span>{errors.email.message}</span>}
              </div>
              <div className="inp-container">
                <label htmlFor="pas">Contraseña</label>

                <input
                  id="pas"
                  type="password"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Requerido",
                    },
                  })}
                />
                {errors.password && <span>{errors.password.message}</span>}
              </div>
              <button className="btn1">Acceder</button>
              <div className="error-container">
                {errorss && <span>{errorss}</span>}
              </div>
              <span className="change-span">
                No tienes una cuenta?{" "}
                <strong
                  className="reg"
                  onClick={() => {
                    setPage(false);
                    setError(null);
                  }}
                >
                  Registrarse
                </strong>
              </span>
            </form>
          ) : (
            <form onSubmit={onSubmit2}>
              <div className="inp-container">
                <label htmlFor="username">Nombre de usuario</label>

                <input
                  {...register("user", {
                    required: {
                      value: true,
                      message: "Requerido",
                    },
                  })}
                  id="username"
                  type="text"
                  maxLength={12}
                />
                {errors.user && <span>{errors.user.message}</span>}
              </div>
              <div className="inp-container">
                <label htmlFor="email">Email</label>

                <input
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Requerido",
                    },
                  })}
                  type="email"
                  id="email"
                />
                {errors.email && <span>{errors.email.message}</span>}
              </div>
              <div className="inp-container">
                <label htmlFor="password">Contraseña</label>
                <input
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Requerido",
                    },
                  })}
                  maxLength={12}
                  id="password"
                  type="password"
                />
                {errors.password && <span>{errors.password.message}</span>}
              </div>
              <div className="inp-container">
                <label htmlFor="confPas">Confirmar contraseña</label>

                <input
                  {...register("confirmPassword", {
                    required: {
                      value: true,
                      message: "Requerido",
                    },
                  })}
                  maxLength={12}
                  id="confPas"
                  type="password"
                />
                {errors.confirmPassword && (
                  <span>{errors.confirmPassword.message}</span>
                )}
              </div>

              <button className="btn1">Registrarse</button>
              <div className="error-container">
                {errorss && <span>{errorss}</span>}
              </div>
              <span className="change-span">
                Ya tienes una cuenta?{" "}
                <strong
                  className="reg"
                  onClick={() => {
                    setPage(true);
                    setError(null);
                  }}
                >
                  Acceder
                </strong>
              </span>
            </form>
          )}
        </div>
      )}
    </main>
  );
}
