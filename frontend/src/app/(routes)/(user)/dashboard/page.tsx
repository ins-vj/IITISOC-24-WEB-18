"use client";
import { useEffect, useState } from "react";

import Loader from "../components/loader";
import Link from "next/link";
export default function Home() {

 

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 4000);
  }, []);
  if (loading) {
    return <>
      <Loader />
    </>;
  }else{
  return (
    <>

    <Link href="/explore">Logout</Link>


    </>
  );
}
}
