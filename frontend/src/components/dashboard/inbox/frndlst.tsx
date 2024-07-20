"use client";
import { Button, Input, Tooltip } from "@nextui-org/react";

import { useState } from 'react';
import UpcomingIcon from '@mui/icons-material/Upcoming';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import React from "react";
import { DateInput } from "@nextui-org/react";
import { parseZonedDateTime } from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";
import { today } from "@internationalized/date";
import Shine from './shine'
import { DatePicker } from "@nextui-org/react";
import { now, getLocalTimeZone } from "@internationalized/date";
import FriendPicker from "./addfriends";
import Cards from "@/components/dashboard/room/cards";
import Image from 'next/image'
import { blackops } from '@/app/fonts'
import SearchIcon from '@mui/icons-material/Search';
import Profile from "@/components/dashboard/friends/mainprofile";

export default function joinroom(props: any) {


    const [friend, setFriend] = React.useState("");



    return (



        <Cards>

<div className={` w-[100%] flex justify-between  text-wrap text-left text-[2rem] font-black ${blackops.className}`}>
                    Friends
                    
                </div>
            <div className="w-full bg-[rgba(25,25,25,0.9)] flex flex-col h-[75vh]   border-small px-[5px] py-[2px] rounded-bl-3xl  rounded-tl-3xl border-default-200 dark:border-default-100 dark overflow-y-auto">

<Profile user={props.user} username={props.username} photo={props.photo} favourite={true} />
<Profile user={props.user} username={props.username} photo={props.photo} favourite={true} />
<Profile user={props.user} username={props.username} photo={props.photo} favourite={true} />
<Profile user={props.user} username={props.username} photo={props.photo} favourite={true} />
<Profile user={props.user} username={props.username} photo={props.photo} />
<Profile user={props.user} username={props.username} photo={props.photo} />
<Profile user={props.user} username={props.username} photo={props.photo} />





</div>
        </Cards>


    );
}