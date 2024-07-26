import React from "react";
import {Button} from "@nextui-org/react";
import WordPullUp from "./pullup";
import TaskList from "./tasktable";
import {Input} from "@nextui-org/react";
import AddIcon from '@mui/icons-material/Add';
import Cards from "@/components/landingpage/room/cards";

export default function Tasks() {

  const [newtask, setNewTask] = React.useState("");



  return (



   <Cards>

      <WordPullUp
        className="text-[1.5rem] w-[100%] flex justify-start font-bold tracking-[-0.02em] text-white  "
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




    </Cards>




  );
}