import React from "react";
import {Select, SelectItem, Avatar, Chip} from "@nextui-org/react";
import {users} from "./data";

export default function App() {
  return (
    <Select
    
      items={users}
      variant="bordered"
      isMultiline={true}
      selectionMode="multiple"
      placeholder="Select a user"
      // labelPlacement="outside"
      classNames={{
        base: " w-[100%]",
        trigger: "min-h-12 py-2",
      }}
      renderValue={(items) => {
        return (
          <div className="flex flex-wrap gap-2">
            {items.map((item) => (
              <Chip key={item.key}>{item.data?.name}</Chip>
            ))}
          </div>
        );
      }}
    >
      {(user) => (
        <SelectItem key={user.id} textValue={user.name} className=" list" >
          <div className="flex gap-2 items-center">
            <Avatar alt={user.name} className="flex-shrink-0" size="sm" src={user.avatar} />
            <div className="flex flex-col">
              <span className="text-small text-customtextblack-500">{user.name}</span>
              <span className="text-tiny text-default-500">{user.email}</span>
            </div>
          </div>
        </SelectItem>
      )}
    </Select>
  );
}
