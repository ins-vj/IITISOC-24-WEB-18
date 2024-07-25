"use client";
import React from "react";
import Cards from "@/components/dashboard/friends/cards";
import Image from "next/image";
import { blackops } from "@/app/fonts";

import Profile from "@/components/dashboard/friends/reqprofile";

export default function joinroom(props: any) {
  return (
    <Cards>
      <div
        className={` w-[100%] flex justify-between  text-wrap text-left text-[2rem] font-black ${blackops.className}`}
      >
        Friend Requests
      </div>

      <div className="w-full max-h-[12.5rem] min-h-[12.5rem] flex flex-col   border-small px-[5px] py-[2px] rounded-l-3xl border-default-200 dark:border-default-100 dark overflow-y-auto">
        <Profile
          user={props.user}
          username={props.username}
          photo={props.photo}
        />
        <Profile
          user={props.user}
          username={props.username}
          photo={props.photo}
        />
      </div>
    </Cards>
  );
}
