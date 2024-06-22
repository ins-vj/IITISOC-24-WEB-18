"use client";
import Image from "next/image";
import Emogrid from "@/components/emogrid/emogrid";
import {Button} from "@nextui-org/react";
import Loader from "../../components/loader/loading";
import { useEffect, useState } from "react";
import Navbar from "@/components/navbar/navbar";
import Logo from "../../components/logo/logo";


import styles from "./page.module.css";
import Trapezium from "@/components/Trapezium/Trapezium";




import Hero from "../../components/hero/hero";
import { ButtonComponent } from "@/components/Buttons/ButtonComponent";
export default function Home() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 5000);
  }, []);
  if (loading) {
    return <Loader />;
  }
  return (
    <div className={styles.app}>
      {/* <Navbar /> */}
<ButtonComponent></ButtonComponent>
      <Hero></Hero>
<Trapezium></Trapezium>
    </div>
  );
}
