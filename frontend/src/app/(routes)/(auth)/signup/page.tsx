"use client";
import { useEffect, useState } from "react";

import Link from "next/link";
import Particle from "./components/particle";
import Image from "next/image";
import Card from "./components/card";

export default function SignUp() {
  return (
    <div className="flex flex-col h-[100vh] justify-center items-center overflow-y-hidden">
      <Particle />
      <Link href="/explore">
        <Image
          src="/data/logos/expresssignup.png"
          alt="expresso"
          width={200}
          height={50}
          className="absolute top-[0px] left-[0px] m-5 brightness-0 invert"
        />
      </Link>

      <Card />
    </div>
  );
}
