"use client";
import { loginWithGoogle } from "@/helpers/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Google = () => {
  const router = useRouter();

  const login = async (codeParam: string) => {
    console.log(codeParam);
    const c1 = await loginWithGoogle(codeParam);
    console.log(c1);
    if (c1) {
      router.push("/dashboard");
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    console.log(code);
    if (code) {
      login(code);
    }
  }, [router]);

  return <div>Loading...</div>;
};

export default Google;
