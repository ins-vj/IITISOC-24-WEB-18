import { Button, Input } from "@nextui-org/react";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import { useEffect, useState } from "react";
import Webcam from "react-webcam";
import Logo from './logo';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import React from "react";
import Cards from "@/components/dashboard/room/cards";

export default function joinroom() {

  const [video, setVideo] = useState(false);
  const [mic, setMic] = useState(false);

  const [link, setLink] = React.useState("");

  

  function openLink( id:string ) {
    window.location.pathname = `/call/${id}`;
  }


  function toggleVideo() {
    if (video) {
      setVideo(false);
    } else {
      setVideo(true);
    }
  }
  function toggleMic() {
    if (mic) {
      setMic(false);
    } else {
      setMic(true);
    }
  }

  return (
    <Cards>


      <Input
        isClearable
        type="email"
        variant="bordered"
        color="default"
        value={link}
        onValueChange={setLink}
        label="x x x x x x x x - x x x x - x x x x - x x x x  -x x x x x x x x x x x x " />


      <div className=" flex flex-row w-[100%] justify-between">

        <Button  onClick={()=>{openLink(link)}} isDisabled={link === "" ? true : false} color="primary" size="lg" startContent={<AddReactionIcon fontSize='small' />} radius="full" variant="flat" className="  text-customblue-500" >
          Join Room
        </Button>

        <div className=" flex gap-[5px] items-center">
          <div onClick={toggleVideo} className=' bg-[#ffffff81] h-[2.5rem] w-[2.5rem] rounded-[80%] flex justify-center items-center'>
            {video ? <VideocamIcon fontSize='small' color='warning' /> : <VideocamOffIcon fontSize='small' color='action' />}

          </div>
          <div onClick={toggleMic} className='bg-[#ffffff81] h-[2.5rem] w-[2.5rem] rounded-[80%] flex justify-center items-center'>
            {mic ? <MicIcon fontSize='small' color='warning' /> : <MicOffIcon fontSize='small' color='action' />}
          </div>

        </div>


      </div>


      {video ? <div className=" flex justify-center items-center h-[225px] w-[100%] bg-[#0000003b] rounded-3xl overflow-hidden"><Webcam mirrored height={470} width={470} className=" rounded-lg" /></div> : <div className=" flex justify-center items-center h-[225px] w-[100%] bg-[rgba(24,24,27)] rounded-3xl overflow-hidden"><div className=" -translate-x-[30%] translate-y-[20%]  "><Logo width={400}/></div></div>}


      </Cards>
    
  );
}
