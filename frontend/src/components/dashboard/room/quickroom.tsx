import { Button, Input, Tooltip } from "@nextui-org/react";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import { useState } from "react";
import Webcam from "react-webcam";
import Logo from "./logo";
import { Tabs, Tab } from "@nextui-org/react";
import PublicIcon from "@mui/icons-material/Public";
import SecurityIcon from "@mui/icons-material/Security";
import React from "react";
import HelpIcon from "@mui/icons-material/Help";
import FriendPicker from "./addfriends";
import UpcomingIcon from "@mui/icons-material/Upcoming";
import Cards from "@/components/dashboard/room/cards";

export default function quickroom() {
  const [video, setVideo] = useState(true);
  const [mic, setMic] = useState(false);

  const [isPrivate, setIsPrivate] = useState(true);

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
      {/* <div className=" [@media(max-width:1109px)]:h-[100%] [@media(max-width:1109px)]:justify-around"> */}
      <div className=" flex flex-row w-[100%]  gap-[10px] justify-between items-start">
          <Button
            color="warning"
            size="lg"
            startContent={<VideoCallIcon fontSize="small" />}
            radius="full"
            variant="solid"
            className=" text-white"

          >
            Quick Room
          </Button>
        </div>

        <div className="flex items-end justify-between w-[100%] ">
          <div className=" relative min-w-[215px] max-w-[215px] h-[2.75rem] flex justify-between items-center  rounded-xl border-[2px] border-default-200 p-[3px]">
            <div
              className=" absolute -z-10 flex items-center justify-center h-[calc(100%-6px)] bg-customorange-600 rounded-lg w-[calc(50%-5px)] transition-left duration-200"
              style={{ left: isPrivate ? "3px" : "107.5px" }}
            ></div>

            <div
              onClick={() => setIsPrivate(true)}
              className="flex items-center justify-center h-[100%]   rounded-lg w-[calc(50%-1.5px)] text-white "
              style={{ opacity: isPrivate ? "1" : "0.6" }}
            >
              <SecurityIcon />
              <span>Private</span>
            </div>
            <div
              onClick={() => setIsPrivate(false)}
              className="flex items-center justify-center h-[100%]  rounded-lg w-[calc(50%-1.5px)] text-white"
              style={{ opacity: !isPrivate ? "1" : "0.6" }}
            >
              <PublicIcon />
              <span>Public</span>
            </div>

          </div>
          <Tooltip
          
            content="In Public rooms, users cannot freely share any video or audio"
            placement="top-end"
            className="text-white w-[300px]"
            color="warning"
            size="lg"
          >
            <HelpIcon fontSize="medium" color="warning"  />
          </Tooltip>


        </div>

        {/* {video ? (
        <div className=" flex justify-center items-center h-[225px] w-[300px] bg-[#0000003b] rounded-3xl">
          <Webcam mirrored height={300} width={300} className=" rounded-lg" />
        </div>
      ) : (
        <div className=" flex justify-center items-center h-[225px] w-[300px] bg-[#ffffff81] rounded-3xl ">
          <Logo width={40} />
        </div>
      )} */}

        <div className=" text-default-500 w-[100%]">Invite Friends</div>

        <FriendPicker color="warning" />

        <div className="w-[100%] flex gap-[18px] items-center ">
          <UpcomingIcon fontSize="small" color="error" />
          <div className="text-default-500 text-sm text-justify">
            Friends will be invited to the Quick Room
          </div>
        </div>
        
      </Cards>
   
  );
}
