import Logo from './logo'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import PeopleIcon from '@mui/icons-material/People';
import FlareIcon from '@mui/icons-material/Flare';
import LogoutIcon from '@mui/icons-material/Logout';
import CameraIndoorIcon from '@mui/icons-material/CameraIndoor';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import InsightsIcon from '@mui/icons-material/Insights';
import { Tooltip } from "@nextui-org/react";
import Link from 'next/link'



export default function sidebar() {


    return (

        <div className=" w-[5rem] h-[100%] flex flex-col items-center justify-between  gap-[2rem] relative z-10 p-[15px] ">

            <Logo width={50}></Logo>
            <div className=' flex flex-col gap-[15px]'>
                
            </div>
            
        </div>








    );
}