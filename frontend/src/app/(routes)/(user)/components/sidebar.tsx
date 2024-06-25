import Logo from './logo'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import PeopleIcon from '@mui/icons-material/People';
import FlareIcon from '@mui/icons-material/Flare';
import LogoutIcon from '@mui/icons-material/Logout';

export default function sidebar(){


    return(

        <div className=" w-[5rem] h-[100%] flex flex-col items-center justify-between  gap-[2rem] relative z-10 p-[15px] ">

<Logo width={50}></Logo>
<div className=' flex flex-col gap-[15px]'>
<div  className=' bg-white h-[3rem] w-[3rem] rounded-[80%] flex justify-center items-center'>
<PeopleIcon fontSize='small' color='action' />
</div>

<div  className=' bg-white h-[3rem] w-[3rem] rounded-[80%] flex justify-center items-center'>
<ChatBubbleIcon fontSize='small' color='action' />
</div>

<div  className=' bg-white h-[3rem] w-[3rem] rounded-[80%] flex justify-center items-center'>
<FlareIcon fontSize='small' color='action' />
</div>
</div>

<div  className=' bg-white h-[3rem] w-[3rem] rounded-[80%] flex justify-center items-center'>
<LogoutIcon fontSize='small' color='action' />
</div>
        </div>








    );
}