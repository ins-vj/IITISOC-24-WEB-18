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
import Cards from "@/components/landingpage/room/cards";

export default function joinroom() {

  const [video, setVideo] = useState(false);
  const [mic, setMic] = useState(false);

  const [link, setLink] = React.useState("");


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
        label="Code" />


      <div className=" flex flex-row w-[100%] justify-between">

        <Button isDisabled={link === "" ? true : false} color="primary" size="lg" startContent={<AddReactionIcon fontSize='small' />} radius="full" variant="flat" className="  text-customblue-500" >
          Join Room
        </Button>

        <div className=" flex gap-[5px] items-center">
          <div  className=' bg-[#ffffff81] h-[2.5rem] w-[2.5rem] rounded-[80%] flex justify-center items-center'>
            {video ? <VideocamIcon fontSize='small' color='warning' /> : <VideocamOffIcon fontSize='small' color='action' />}

          </div>
          <div  className='bg-[#ffffff81] h-[2.5rem] w-[2.5rem] rounded-[80%] flex justify-center items-center'>
            {mic ? <MicIcon fontSize='small' color='warning' /> : <MicOffIcon fontSize='small' color='action' />}
          </div>

        </div>


      </div>


     <div className=" flex justify-center items-center h-[200px] w-[100%] bg-[rgb(253,204,146,0.3)] rounded-3xl overflow-hidden"><div className=" -translate-x-[30%] translate-y-[20%]  "><Logo width={400}/></div></div>


      </Cards>
    
  );
}
