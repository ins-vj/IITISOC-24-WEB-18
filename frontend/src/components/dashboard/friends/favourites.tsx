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
import Cards from "@/components/dashboard/friends/cards";
import Image from 'next/image'
import {blackops} from '@/app/fonts'
import Card from "@/components/login/card";

import Profile from "@/components/dashboard/friends/favprofile";

export default function joinroom(props:any) {
   
    
    



    return (



        <Cards>
            
            
           
            

                <div className={` w-[100%] flex justify-between  text-wrap text-left text-[2rem] font-black ${blackops.className}`}>
                    Favourites
                    
                </div>

                <div className="w-full max-h-[18rem] min-h-[18rem] flex flex-col   border-small px-[5px] py-[2px] rounded-l-3xl border-default-200 dark:border-default-100 dark overflow-y-auto">

                 <Profile user={props.user} username={props.username} photo={props.photo} />
                 <Profile user={props.user} username={props.username} photo={props.photo} />
                 <Profile user={props.user} username={props.username} photo={props.photo} />
                 <Profile user={props.user} username={props.username} photo={props.photo} />
    
                </div>


                
        
            

        </Cards>



    );
}