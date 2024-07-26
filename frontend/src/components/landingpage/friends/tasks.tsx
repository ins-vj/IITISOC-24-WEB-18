import React from "react";
import {Button} from "@nextui-org/react";
import WordPullUp from "./pullup";
import TaskList from "./tasktable";
import {Input} from "@nextui-org/react";
import AddIcon from '@mui/icons-material/Add';
import Cards from "@/components/dashboard/friends/cards";
import SearchIcon from '@mui/icons-material/Search';
import Image from 'next/image'
export default function Tasks(props:any) {

  const [newtask, setNewTask] = React.useState("");



  return (



    <div className=" relative flex w-[100%]  justify-start  hover:scale-[1.01] transition-all duration-300  items-center bg-[rgb(253,204,146,0.3)]   backdrop-blur-md    rounded-3xl">

      <Image src="/data/generative/searching.jpg"  width={1000} height={1000} alt="cool" className="  w-[25%] rounded-l-3xl hidden sm:flex" />

      <div className=" relative flex w-[100%]  justify-start   flex-col items-center   backdrop-blur-md  gap-[20px] p-[20px]  rounded-3xl ">
      {/* <WordPullUp
        className="text-[1.5rem] w-[100%] flex justify-start font-bold tracking-[-0.02em] text-white  "
        words="Add Friends"
      /> */}

      <div className=" flex justify-between gap-4 w-[100%]">

      <Input
     size="lg"
      placeholder=""
      value={newtask}
      onValueChange={setNewTask}
      startContent={<div className="">@</div>}
     
      />  
    <Button isDisabled={newtask ? false : true} isIconOnly color="warning" size="lg" variant="solid"  className=" text-white">
        <SearchIcon fontSize='medium' color='warning' className=' transition-all duration-300'  style={{color: "white" }}/>
      </Button> 

      </div>

      <TaskList photo={props.photo} user={props.user} username={props.username}/>
    
      </div>
      




    </div>




  );
}