"use client";
import { Button, Input,Tooltip } from "@nextui-org/react";

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
import PublicIcon from '@mui/icons-material/Public';
import SecurityIcon from '@mui/icons-material/Security';
import HelpIcon from '@mui/icons-material/Help';
export default function joinroom() {
    const [isPrivate , setIsPrivate] = useState(true);
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



        <div className=" flex w-[100%] flex-col items-center h-min  max-w-[350px] 2xl:max-w-[500px] backdrop-blur-md bg-[rgb(30,30,30)] gap-[20px] p-[20px] rounded-3xl">

            <div className=" flex flex-row gap-[10px] w-[100%] justify-between">

                <Button color="secondary" size="lg" startContent={<SettingsSuggestIcon fontSize='small' />} radius="full" variant="solid" className="  text-white" >
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



<div className="flex items-center w-[100%] justify-between ">

     

<div className=" relative min-w-[215px] max-w-[215px] h-[2.75rem] flex justify-between items-center  rounded-xl border-[2px] border-default-200 p-[3px]">

<div className=" absolute -z-10 flex items-center justify-center h-[calc(100%-6px)] bg-purple-800 rounded-lg w-[calc(50%-5px)] transition-left duration-200" style={{left : isPrivate ? "3px" : "107.5px"}}>
      
    </div>

<div onClick={()=>setIsPrivate(true)} className="flex items-center justify-center h-[100%]   rounded-lg w-[calc(50%-1.5px)] text-white " style={{opacity : isPrivate ? "1" : "0.6"}}>
      <SecurityIcon/>
      <span>Private</span>
    </div>
    <div onClick={()=>setIsPrivate(false)} className="flex items-center justify-center h-[100%]  rounded-lg w-[calc(50%-1.5px)] text-white" style={{opacity : !isPrivate ? "1" : "0.6"}}>
      <PublicIcon/>
      <span>Public</span>
    </div>

</div>

<Tooltip offset={30} content="In Public rooms, users cannot freely share any video or audio" placement="bottom-end" className="text-white w-[400px]" color="secondary">
<HelpIcon fontSize='small' color='secondary' />
</Tooltip>


</div>















      <div className="w-[100%] text-default-500">Invite Friends</div>

        <FriendPicker color="secondary" />





      
      <div className="w-[100%] flex gap-[18px] items-center ">
        <UpcomingIcon fontSize='small' color='secondary' />
        <div className="text-default-500 text-sm text-justify">
        Friends will be notified about the upcoming meeting scheduled on {date} at {time} {zone}
        </div>
        </div>


        
        
       
         
             
           
            




        </div>



    );
}