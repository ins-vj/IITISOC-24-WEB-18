import React from "react";
import {Listbox, ListboxItem, cn, Button} from "@nextui-org/react";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import Dp from "@/components/dashboard/dp";
import Profile from "@/components/landingpage/friends/profile";

export default function App(props:any) {
  const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

  return (
    <div className="w-full flex flex-col gap-[10px]  border-small px-[5px] py-[2px] rounded-3xl border-default-200 dark:border-default-100 ">

      <Profile user={props.user} username={props.username} photo={props.photo} />
    
    </div>
  );
}
