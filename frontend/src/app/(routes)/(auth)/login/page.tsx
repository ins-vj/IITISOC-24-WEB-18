"use client";
import { useEffect, useState } from "react";

import Loader from "./components/loader";
import Link from "next/link";
import Particle from '@/app/particlejs/particle'
export default function Login() {

 

  
  return (
    <>
   <Particle/>
    <Link href="/dashboard">Login</Link>


    </>
  );

}
