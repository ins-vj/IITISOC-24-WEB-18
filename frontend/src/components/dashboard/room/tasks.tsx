import React from "react";
import {Button} from "@nextui-org/react";
import WordPullUp from "./pullup";
import TaskList from "./tasktable";
import {Input} from "@nextui-org/react";
import AddIcon from '@mui/icons-material/Add';

export default function Tasks() {

  const [newtask, setNewTask] = React.useState("");



  return (



    <div className="  flex flex-col h-min w-min backdrop-blur-md bg-[#ffffff3b] gap-[20px] p-[20px] rounded-3xl ">

      <WordPullUp
        className="text-[2rem] w-[600px] flex justify-start font-bold tracking-[-0.02em] text-white  "
        words="Tasks"
      />

      <div className=" flex justify-between gap-4">

      <Input
     size="lg"
      placeholder="New Task"
      value={newtask}
      onValueChange={setNewTask}
    />
    <Button isDisabled={newtask ? false : true} isIconOnly color="warning" size="lg" variant="solid"  className=" text-white">
        <AddIcon/>
      </Button> 

      </div>
    

      
      <TaskList/>




    </div>



  );
}