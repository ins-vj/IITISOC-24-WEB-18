import { Button, Tooltip, Select, SelectItem, Chip } from "@nextui-org/react";
import VideocamIcon from "@mui/icons-material/Videocam";
import { useEffect, useState } from "react";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import PublicIcon from "@mui/icons-material/Public";
import SecurityIcon from "@mui/icons-material/Security";
import HelpIcon from "@mui/icons-material/Help";
import UpcomingIcon from "@mui/icons-material/Upcoming";
import Cards from "@/components/dashboard/room/cards";
import { createMeeting, fetchFriendRequests } from "@/helpers/api"; // Combined imports for API calls
import toast from "react-hot-toast";


export default function CreateRoom({details: details}) {
  const [video, setVideo] = useState(true);
  const [mic, setMic] = useState(false);
  const [isPrivate, setIsPrivate] = useState(true);
  const [selectedFriends, setSelectedFriends] = useState<string[]>([details]);
  const [friendsList, setFriendsList] = useState([]);

  // Fetch the friend requests when the component mounts
  useEffect(() => {
    async function loadFriendRequests() {
      try {
        const data = await fetchFriendRequests();
        const acceptedFriends = data.filter((friend) => friend.currentStatus === "accepted");
        setFriendsList(acceptedFriends);
      } catch (error) {
        console.error("Failed to fetch friend requests:", error);
      }
    }

    loadFriendRequests();
  }, []);

  function toggleVideo() {
    setVideo((prev) => !prev);
  }

  function toggleMic() {
    setMic((prev) => !prev);
  }

  function handleFriendSelection(friend) {
    setSelectedFriends((prev) => {
      if (prev.includes(friend.from_user.id)) {
        return prev.filter((id) => id !== friend.from_user.id);
      } else {
        return [...prev, friend.from_user.id];
      }
    });
  }

  return (
    <Cards>
      <div className="flex flex-row w-[100%] gap-[10px] justify-between items-start">
        <Button
          color="success"
          size="lg"
          startContent={<VideoCallIcon fontSize="small" />}
          radius="full"
          variant="solid"
          className="text-white"
          onClick={() =>{ if(selectedFriends.length>0){  createMeeting(selectedFriends, isPrivate)}
          else{
            toast.error("Please select a friend to start a meeting")}
          }}
        >
          Create Room
        </Button>
        <div className="flex items-end justify-end  gap-5">
        <div className="relative min-w-[215px] max-w-[215px] h-[2.75rem] flex justify-between items-center rounded-xl border-[2px] border-default-200 p-[3px]">
          <div
            className="absolute -z-10 flex items-center justify-center h-[calc(100%-6px)] bg-[rgb(94,198,111)] saturate-[130%] rounded-lg w-[calc(50%-5px)] transition-left duration-200"
            style={{ left: isPrivate ? "3px" : "107.5px" }}
          ></div>

          <div
            onClick={() => setIsPrivate(true)}
            className="flex items-center justify-center h-[100%] rounded-lg w-[calc(50%-1.5px)] text-white"
            style={{ opacity: isPrivate ? "1" : "0.6" }}
          >
            <SecurityIcon />
            <span>Private</span>
          </div>
          <div
            onClick={() => setIsPrivate(false)}
            className="flex items-center justify-center h-[100%] rounded-lg w-[calc(50%-1.5px)] text-white"
            style={{ opacity: !isPrivate ? "1" : "0.6" }}
          >
            <PublicIcon />
            <span>Public</span>
          </div>
        </div>
       
      </div>
      </div>

     

      <div className="w-[100%] justify-between flex gap-[18px] items-center">
        
        <div className="text-default-500 flex gap-[18px] text-sm text-justify">
        <UpcomingIcon fontSize="small" color="error" />
          Forward gmail invitation later to invite
        </div>
        <Tooltip
          content="In Public rooms, users cannot freely share any video or audio"
          placement="bottom-end"
          className="text-white w-[300px] "
          color="success"
          size="lg"
        >
          <HelpIcon fontSize="medium" color="success" className=" brightness-150" />
        </Tooltip>
      </div>

      
    </Cards>
  );
}
