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
                <Link href='/dashboard/expressoroom'>
                <Tooltip content="Rooms" color='warning' placement='right'>
                    <div className=' bg-white h-[3rem] w-[3rem] rounded-[80%] flex justify-center items-center'>
                        <CameraIndoorIcon fontSize='small' color='action' />
                    </div>
                </Tooltip>
                </Link>
                <Link href='/dashboard/friends'>
                <Tooltip content="Friends" color='primary' placement='right'>
                    <div className=' bg-white h-[3rem] w-[3rem] rounded-[80%] flex justify-center items-center'>
                        <PeopleIcon fontSize='small' color='action' />
                    </div>
                </Tooltip>
                </Link>
                <Link href='/dashboard/expressoinbox'>
                <Tooltip content="Messages" color='success' placement='right'>
                    <div className=' bg-white h-[3rem] w-[3rem] rounded-[80%] flex justify-center items-center'>
                        <ChatBubbleIcon fontSize='small' color='action' />
                    </div>
                </Tooltip>
                </Link>
                <Link href='/dashboard/expressoai'>
                <Tooltip content="AI" color='danger' placement='right'>
                    <div className=' bg-white h-[3rem] w-[3rem] rounded-[80%] flex justify-center items-center'>
                        <AutoAwesomeIcon fontSize='small' color='action' />
                    </div>
                </Tooltip>
                </Link>
                <Link href='/dashboard/features'>
                <Tooltip content="Features" color='secondary' placement='right'>
                    <div className=' bg-white h-[3rem] w-[3rem] rounded-[80%] flex justify-center items-center'>
                        <InsightsIcon fontSize='small' color='action' />
                    </div>
                </Tooltip>
                </Link>
            </div>
            <Link href='/explore'>
            <div className=' bg-white h-[3rem] w-[3rem] rounded-[80%] flex justify-center items-center'>
                <LogoutIcon fontSize='small' color='action' />
            </div>
            </Link>
        </div>








    );
}