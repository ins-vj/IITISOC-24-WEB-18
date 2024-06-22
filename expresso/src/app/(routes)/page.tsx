"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";




export default function Home() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  if (loading) {
    return <>
    </>;
  }
  return (
    <div className={styles.app}>
    <>
    hello
    </>
    </div>
  );
}
