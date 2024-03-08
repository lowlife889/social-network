"use client";
import Link from "next/link";
import { getSession } from "next-auth/react";
import { useState } from "react";
import { Gruppo } from "next/font/google";
import { useEffect } from "react";
import { CiSquarePlus } from "react-icons/ci";
import { GoHome } from "react-icons/go";

import { IoPersonCircleOutline } from "react-icons/io5";

import "@/app/globals.css";
const shadows = Gruppo({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
});

export default function Layout({ children }) {
  const [ruta, setRuta] = useState("");

  const getUserData = async () => {
    const session = await getSession();
    if (session) {
      let ruta = session.user.name;
      setRuta(ruta);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  
  return (
    <main className="page-container">
      <nav className="nav-container">
        <div className="logo-container">
          <h1 className={shadows.className}>atsnigram</h1>
        </div>
        <ul className="item-container">
          <li className="item">
            <Link href={`/atsnigram/${ruta}`} className="link">
              <GoHome className="icon"></GoHome><strong className="stron">Inicio</strong>
            </Link>
          </li>
          <li className="item">
            <Link href={`/atsnigram/${ruta}/create`} className="link">
              <CiSquarePlus className="icon"></CiSquarePlus> <strong className="stron">Crear</strong>
            </Link>
          </li>
          <li className="item">
            <Link href={`/atsnigram/${ruta}/profile`} className="link">
              <IoPersonCircleOutline className="icon"></IoPersonCircleOutline> <strong className="stron">Perfil</strong>
            </Link>
          </li>
        </ul>
      </nav>

      <section className="page-content">{children}</section>
    </main>
  );
}
