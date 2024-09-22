"use client";
import { Button, CircularProgress } from "@nextui-org/react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { FaSpotify } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { VscGithubInverted } from "react-icons/vsc";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <main className="flex flex-col min-h-screen p-20 gap-5 items-center pt-40">
      <h1 className="font-bold text-2xl ">
        Ejemplo de uso OAuth2.0 con NextAuth
      </h1>
      {status === "unauthenticated" ? (
        <div className="w-full flex flex-col justify-center items-center gap-5">
          <h2 className="font-semibold">
            Inicie sesión con la aplicación deseada
          </h2>
          <div className="flex flex-col gap-2 w-full items-center justify-center">
            <Button
              className="font-medium w-1/2 bg-neutral-900 text-white border-1 border-neutral-800 rounded-2xl  hover:bg-white hover:text-black hover:border-black  "
              onClick={() => signIn("spotify")}
            >
              <div className="flex justify-center items-center gap-2">
                <FaSpotify size={"1.25rem"} />
                <p>Iniciar sesión con Spotify</p>
              </div>
            </Button>
            <Button
              className="font-medium w-1/2 bg-neutral-900   text-white border-1 border-neutral-800 rounded-2xl  hover:bg-white hover:text-black hover:border-black  "
              onClick={() => signIn("google")}
            >
              <div className="flex justify-center items-center gap-2">
                <FcGoogle size={"1.25rem"} />
                <p>Iniciar sesión con Google</p>
              </div>
            </Button>
            <Button
              className="font-medium w-1/2 bg-neutral-900 text-white border-1 border-neutral-800 rounded-2xl  hover:bg-white hover:text-black hover:border-black  "
              onClick={() => signIn("github")}
            >
              <div className="flex justify-center items-center gap-2">
                <VscGithubInverted size={"1.25rem"} />
                <p>Iniciar sesión con Github</p>
              </div>
            </Button>
          </div>
        </div>
      ) : status === "loading" ? (
        <div className="h-[40dvh] flex justify-center ">
          <CircularProgress aria-label="Loading..." />
        </div>
      ) : (
        <div className="flex flex-col gap-4 justify-center items-center">
          <h2 className="font-semibold">Datos de sesión:</h2>
          <div className="flex gap-5 items-center">
            <div>
              {session?.user?.email && (
                <p className="text-sm">
                  <span className="font-semibold">Correo electrónico: </span>
                  {session?.user?.email}
                </p>
              )}
              {session?.user?.name && (
                <p className="text-sm">
                  <span className="font-semibold">Nombre: </span>
                  {session?.user?.name}
                </p>
              )}
            </div>
            <Image
              className="rounded-sm shadow-lg border-white border-1"
              src={session?.user?.image ?? ""}
              alt={"Imagen de usuario"}
              width={50}
              height={50}
            />
          </div>

          <Button
            className="font-medium w-full bg-neutral-900 text-white border-1 border-neutral-800 rounded-2xl hover:bg-white hover:text-black hover:border-black"
            onClick={() => signOut()}
          >
            Cerrar sesión
          </Button>
        </div>
      )}
    </main>
  );
}
