"use client";
import Link from "next/link";
import Particle from "./components/particle";
import Image from "next/image";
import Card from "./components/card";
import { getUserDetails } from "@/helpers/api";
import { useEffect, useState } from "react";
import { UserDetailsFC } from "@/helpers/api";

export default function Login() {
  const [data, setData] = useState<UserDetailsFC>();
  useEffect(() => {
    const getData = async () => {
      const c1 = await getUserDetails();
      console.log(c1);
      setData(c1);
    };
    getData();
  }, []);
  return (
    <div className="flex flex-col h-[100vh] justify-center items-center overflow-y-hidden">
      <Particle />
      <Link href="/explore">
        <Image
          src="/data/logos/expresslogin.png"
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
