import Image from 'next/image'
import {Avatar} from "@nextui-org/react";

export default function topbar(){


    return(

        <div className="h-[5rem] w-[100%] flex items-center px-[15px] justify-between ">
            <Image src="/data/logos/expressconnect.png" width={130} height={50} alt='expresso'></Image>
            <Avatar  color="warning" src="" />

        </div>








    );
}