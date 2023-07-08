"use client";

import { signIn, signOut } from "next-auth/react";

export default function LoginBtn(props) {
  let btnStyle = props.btnStyle;
  return (
    <>
      {btnStyle != "text" ? (
        <div className="basis-4/6 text-end">
          {props.isLoggedIn?.length > 0 ? (
            <>
              <p>Hello!</p>
            </>
          ) : (
            <>
              <button
                className="rounded-md bg-indigo-900 text-white font-bold px-5 py-2"
                onClick={() => signIn()}
              >
                Sign in
              </button>
            </>
          )}
        </div>
      ) : (
        <>
          {props.isLoggedIn?.length > 0 ? (
            <>
              <p>Hello!</p>
            </>
          ) : (
            <>
              <h3>Have we met?</h3>
              <p>
                Please{" "}
                <button
                  className="text-indigo-950 underline underline-offset-2 font-bold px-0 py-0"
                  onClick={() => signIn()}
                >
                  Sign in
                </button>{" "}
                to your account or create an account to join the conversation.
              </p>
            </>
          )}
        </>
      )}
    </>
  );
}
