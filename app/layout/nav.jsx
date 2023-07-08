"use client";
import "../globals.css";
import Link from "next/link";
import LoginBtn from "../loginBtn";
import { useCallback, useEffect, useState } from "react";

export default function Navbar(props) {
  const [scrollY, setScrollY] = useState(0);

  const onScroll = useCallback((event) => {
    if (window !== undefined) {
      setScrollY(window.scrollY);
    }
  }, []);

  useEffect(() => {
    //add eventlistener to window
    window.addEventListener("scroll", onScroll, { passive: true });
    // remove event on unmount to prevent a npm rrrmemory leak with the cleanup
    return () => {
      window.removeEventListener("scroll", onScroll, { passive: true });
    };
  }, []);

  return (
    <div
      className={`w-full bg-indigo-950 z-20 ${
        scrollY > 0 && "sticky top-0 border-b-black shadow-xl transition-all"
      }`}
    >
      <nav className="container max-w-5xl flex flex-row mx-aut0 space-x-8 py-5 text-center text-white items-end">
        <Link
          href="/"
          className={`logo block pr-2 pl-0 ml-0 basis-1/6 text-start text-white text-3xl font-extrabold ${
            scrollY > 0 && "text-2xl transition-all"
          }`}
        >
          Sw Forum
        </Link>
        <Link className="block px-2 basis-1/6 text-start" href="/list">
          Posts
        </Link>
        <LoginBtn isLoggedIn={props.session?.user.email} />
      </nav>
    </div>
  );
}
