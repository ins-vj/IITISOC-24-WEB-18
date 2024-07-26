import React, { useState, useEffect } from "react";
import { Select, SelectItem, Chip } from "@nextui-org/react";
import { fetchFriendRequests } from "@/helpers/api"; // Import the API call function

export default function FriendPicker({ color, onSelectedFriendsChange }) {
  const [friendsList, setFriendsList] = useState([]);

  // Fetch the friend requests when the component mounts
  useEffect(() => {
    async function loadFriendRequests() {
      try {
        const data = await fetchFriendRequests(); // Make API call
        // Filter only accepted friends
        const acceptedFriends = data.filter(
          (friend) => friend.currentStatus === "accepted"
        );
        setFriendsList(acceptedFriends); // Set the data to state
      } catch (error) {
        console.error("Failed to fetch friend requests:", error);
      }
    }

    loadFriendRequests();
  }, []); // Empty dependency array to run once on mount

  return (
    <Select
      color={color}
      items={friendsList}
      variant="bordered"
      isMultiline={true}
      selectionMode="multiple"
      placeholder="Select a user"
      classNames={{
        base: "w-[100%]",
        trigger: "min-h-12 py-2",
      }}
      onSelectionChange={onSelectedFriendsChange}
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
        >
          <div className="flex items-center">
            <span className="text-small text-customtextblack-500">
              {friend.from_user.username}
            </span>
          </div>
        </SelectItem>
      )}
    </Select>
  );
}