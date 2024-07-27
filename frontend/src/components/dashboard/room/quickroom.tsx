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


export default function QuickRoom() {
  const [video, setVideo] = useState(true);
  const [mic, setMic] = useState(false);
  const [isPrivate, setIsPrivate] = useState(true);
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
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
          onClick={() =>{ if(selectedFriends.length>0){ createMeeting(selectedFriends, isPrivate)}
          else{
            toast.error("Please select a friend to start a meeting")}
          }}
        >
          Quick Room
        </Button>
      </div>

      <div className="flex items-end justify-between w-[100%]">
        <div className="relative min-w-[215px] max-w-[215px] h-[2.75rem] flex justify-between items-center rounded-xl border-[2px] border-default-200 p-[3px]">
          <div
            className="absolute -z-10 flex items-center justify-center h-[calc(100%-6px)] bg-customorange-600 rounded-lg w-[calc(50%-5px)] transition-left duration-200"
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
        <Tooltip
          content="In Public rooms, users cannot freely share any video or audio"
          placement="top-end"
          className="text-white w-[300px]"
          color="warning"
          size="lg"
        >
          <HelpIcon fontSize="medium" color="warning" />
        </Tooltip>
      </div>

      <div className="text-default-500 w-[100%]">Invite Friends</div>
      <Select
        color="primary"
        items={friendsList}
        variant="bordered"
        isMultiline={true}
        selectionMode="multiple"
        placeholder="Select a user"
        classNames={{
          base: "w-[100%]",
          trigger: "min-h-12 py-2",
        }}
        renderValue={(items) => (
          <div className="flex flex-wrap gap-2">
            {items.map((item) => (
              <Chip key={item.key}>{item.data?.from_user.username}</Chip>
            ))}
          </div>
        )}
      >
        {(friend) => (
          <SelectItem
            key={friend.id}
            textValue={friend.from_user.username}
            className="list"
            onClick={() => handleFriendSelection(friend)}
          >
            <div className="flex items-center">
              <span className="text-small text-customtextblack-500">
                {friend.from_user.username}
              </span>
            </div>
          </SelectItem>
        )}
      </Select>
      <div className="w-[100%] flex gap-[18px] items-center">
        <UpcomingIcon fontSize="small" color="error" />
        <div className="text-default-500 text-sm text-justify">
          Friends will be invited to the Quick Room
        </div>
      </div>
    </Cards>
  );
}
