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
import { createMeeting,createMeet, fetchFriendRequests } from "@/helpers/api"; // Combined imports for API calls
import toast from "react-hot-toast";

export default function QuickRoom() {
  const [video, setVideo] = useState(true);
  const [mic, setMic] = useState(false);
  const [isPrivate, setIsPrivate] = useState(true);
  const [selectedFriends, setSelectedFriends] = useState([]);
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
          color="warning"
          size="lg"
          startContent={<VideoCallIcon fontSize="small" />}
          radius="full"
          variant="solid"
          className="text-white"
          onClick={() =>  createMeet(isPrivate)}
        >
          
          Create Room
        </Button>
      </div>

      

   
      <div className="w-[100%] flex gap-[18px] items-center">
        <UpcomingIcon fontSize="small" color="error" />
        <div className="text-default-500 text-sm text-justify">
          Create a room and invite later to join you in call.
        </div>
      </div>
    </Cards>
  );
}
