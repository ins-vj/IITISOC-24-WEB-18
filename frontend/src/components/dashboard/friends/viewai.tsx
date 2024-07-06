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

export default function joinroom(props:any) {


    const [friend, setFriend] = React.useState("");



    return (



        <div className="flex w-[100%] justify-around h-[85vh] [@media(min-width:1100px)]:h-[870px] hover:scale-[1.01] transition-all duration-300 flex-col items-center p-[15px] bg-[rgba(20,20,20,1)]  rounded-3xl   ">

            <Image src="/data/generative/friends.jpg" width={2000} height={2000} alt="cool" className=" h-[100%] object-cover rounded-3xl absolute  " />

            <div className=" border-[1px] relative z-10 border-[rgba(254,254,254,0.2)] backdrop-blur-sm p-[15px] w-[100%] h-[100%] flex flex-col gap-[15px]  rounded-3xl bg-[rgba(0,0,0,0)]">

                <div className={` w-[100%] flex justify-between  text-wrap text-left text-[2rem] font-black ${blackops.className}`}>
                    EXPRESSO FRIENDS
                    <Button disabled color="warning" size="lg" className=" dark">
                        Connect &#124; Express &#124; Enjoy
                    </Button>
                </div>


                <div className=" flex justify-between gap-4 w-[100%]">

                    <Input
                        size="lg"
                        placeholder="search"
                        value={friend}
                        onValueChange={setFriend}
                        className="  "
                        
                        variant="bordered"
                        color="warning"

                    />
                    <Button isDisabled={friend ? false : true} isIconOnly color="warning" size="lg" variant="solid" className=" text-white">
                        <SearchIcon fontSize='medium' color='warning' className=' transition-all duration-300' style={{ color: "white" }} />
                    </Button>

                </div>

                <div className="w-full bg-[rgba(25,25,25,0.9)] flex flex-col   border-small px-[5px] py-[2px] rounded-l-3xl border-default-200 dark:border-default-100 dark overflow-y-auto">

                 <Profile user={props.user} username={props.username} photo={props.photo} favourite={true} />
                 <Profile user={props.user} username={props.username} photo={props.photo} favourite={true} />
                 <Profile user={props.user} username={props.username} photo={props.photo} favourite={true} />
                 <Profile user={props.user} username={props.username} photo={props.photo} favourite={true} />
                 <Profile user={props.user} username={props.username} photo={props.photo} />
                 <Profile user={props.user} username={props.username} photo={props.photo} />
                 <Profile user={props.user} username={props.username} photo={props.photo} />
                 <Profile user={props.user} username={props.username} photo={props.photo} /><Profile user={props.user} username={props.username} photo={props.photo} />
                 <Profile user={props.user} username={props.username} photo={props.photo} />
                 <Profile user={props.user} username={props.username} photo={props.photo} />
                 <Profile user={props.user} username={props.username} photo={props.photo} />
    
                </div>

            </div>


        </div>



    );
}