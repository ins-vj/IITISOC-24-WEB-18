"use client";
import { useEffect, useState } from "react";

import Loader from "../../components/loader";
import Link from "next/link";
import Image from "next/image";
import Sidebar from "../../components/sidebar";
import Topbar from "../../components/topbar";
import Calender from "../../components/calender";
import { Button, Input } from "@nextui-org/react";
import Quickroom from "./components/quickroom";
import Joinroom from "./components/joinroom";
import Customroom from "./components/customroom";

export default function Dashboard() {
  const [user, setUser] = useState("Jai");

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 2500);
  }, []);
  if (loading) {
    return (
      <>
        <Loader user={user} />
      </>
    );
  } else {
    return (
      <div className={`flex flex-col gap-[4rem] `}>
        <div className="flex flex-row justify-between items-center ">
          <div className=" flex flex-col">
            <span className=" text-[3rem] comfortaa font-bold ">
              {user}'s Dashboard
            </span>
            <span className=" text-[1.5rem] comfortaa text-[#10101075]">
              Connecting world
            </span>
          </div>
        </div>

        <div className=" w-[100%] flex flex-row flex-wrap gap-14">
          <Quickroom />

          <Joinroom />
          <Customroom />
        </div>
      </div>
    );
  }
}
