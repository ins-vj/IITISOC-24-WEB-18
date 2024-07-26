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
import {blackops} from '@/app/fonts'



export default function joinroom() {
   
    
    



    return (



        <div className="flex w-[100%] justify-around h-[43vh]  hover:scale-[1.01] transition-all duration-300 flex-col items-center   backdrop-blur-md bg-[rgba(20,20,20,1)]  rounded-3xl   ">
            
            <Image src="/data/generative/cool.jpeg"  width={2000} height={2000} alt="cool" className=" h-[100%] object-cover rounded-3xl" />
           
            <div className=" border-[1px] border-[rgba(254,254,254,0.2)] backdrop-blur-md p-[15px] w-[300px] h-min absolute bottom-[20px] left-[20px] rounded-3xl">

                <div className={` w-[100%] text-wrap text-left text-[2rem] font-black ${blackops.className}`}>
                    EXPRESSO INTELLIGENCE
                    <Button color="warning" size="lg" className=" w-[100%] dark">
                        Try Now
                    </Button>
                </div>

            </div>
            

        </div>



    );
}