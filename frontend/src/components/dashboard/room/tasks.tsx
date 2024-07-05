import React from "react";
import {Button} from "@nextui-org/react";
import WordPullUp from "./pullup";
import TaskList from "./tasktable";
import {Input} from "@nextui-org/react";
import AddIcon from '@mui/icons-material/Add';

export default function Tasks() {

  const [newtask, setNewTask] = React.useState("");



  return (



    <div className="flex w-[100%] flex-col items-center h-min  max-w-[350px] 2xl:max-w-[500px] backdrop-blur-md bg-[rgb(30,30,30)] gap-[20px] p-[20px] rounded-3xl">

      <WordPullUp
        className="text-[2rem] w-[100%] flex justify-start font-bold tracking-[-0.02em] text-white  "
        words="Tasks"
      />

      <div className=" flex justify-between gap-4 w-[100%]">

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