"use client";
import { Button, Input } from "@nextui-org/react";

import { useState } from 'react';
import UpcomingIcon from '@mui/icons-material/Upcoming';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import React from "react";
import {DateInput} from "@nextui-org/react";
import {parseZonedDateTime} from "@internationalized/date";
import {useDateFormatter} from "@react-aria/i18n";
import { today} from "@internationalized/date";
import Shine from './shine'
import {DatePicker} from "@nextui-org/react";
import {now, getLocalTimeZone} from "@internationalized/date";
import FriendPicker from "./addfriends";

export default function joinroom() {

    const [value, setValue] = React.useState(parseZonedDateTime(`${now(getLocalTimeZone())}`));
   
    const [date, setDate] = React.useState(`${now(getLocalTimeZone()).toString().substring(0,10)}`);
    const [time, setTime] = React.useState(`${now(getLocalTimeZone()).toString().substring(11,16)}`);
    const [zone, setZone] = React.useState(`${now(getLocalTimeZone()).toString().substring(23)}`);

    function valueHandler(value:any){
        setValue(value);
        if (value){
            setDate(value.toString().substring(0,10));
            setTime(value.toString().substring(11,16));
            setZone(value.toString().substring(23));
        }
    }
    
 



    return (



        <div className="  flex flex-col h-min backdrop-blur-md bg-[#ffffff3b] gap-[20px] p-[20px] rounded-3xl ">

            <div className=" flex flex-row gap-[10px] justify-between">

                <Button color="danger" size="lg" startContent={<SettingsSuggestIcon fontSize='small' />} radius="full" variant="flat" className="  text-customblue-500" >
                    Create Custom Room
                </Button>




            </div>

            
           
        <DatePicker
        label="Event Date"
        variant="bordered"
        granularity="minute"
        shouldForceLeadingZeros={false}
        minValue={now(getLocalTimeZone())}
        hourCycle={12}
        showMonthAndYearPickers
        defaultValue={now(getLocalTimeZone())}
        onChange={valueHandler}
      />

      <div>Invite Friends</div>

        <FriendPicker />





      
      <div className="w-[400px] flex gap-[18px] items-center ">
        <UpcomingIcon fontSize='small' color='error' />
        <div className="text-default-500 text-sm text-justify">
        Friends will be notified about the upcoming meeting scheduled on {date} at {time} {zone}
        </div>
        </div>


        
        
       
         
             
           
            




        </div>



    );
}