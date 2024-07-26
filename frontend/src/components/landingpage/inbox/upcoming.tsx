import React from "react";
import {Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";
import WordPullUp from "./pullup";
import meetData from "./meetings.json";
import Link from "next/link";
import { AnchorIcon } from "./AnchorIcon";
import Cards from "@/components/dashboard/friends/cards";
import { blackops } from '@/app/fonts'
import Image from 'next/image'
export default function quickroom() {

  
  return (


    <div className="flex w-[100%] justify-around  h-[43vh] hover:scale-[1.01] transition-all duration-300 flex-col items-center   backdrop-blur-md bg-[rgba(20,20,20,1)]  rounded-3xl   ">
            
    <Image src="/data/generative/message.jpg"  width={2000} height={2000} alt="cool" className=" h-[100%] object-cover rounded-3xl" />
   
    <div className=" border-[1px] border-[rgba(254,254,254,0.2)] backdrop-blur-md p-[15px] w-[250px] h-min absolute bottom-[20px] left-[20px] rounded-3xl">

        <div className={` w-[100%] text-wrap text-left text-[2rem] font-black ${blackops.className}`}>
            EXPRESSO INBOX
            <Button disabled color="warning" size="lg" className=" dark">
                            Talk &#124; Share &#124; Invite
                        </Button>
        </div>

    </div>
    

</div>



    

   




   


  );
}