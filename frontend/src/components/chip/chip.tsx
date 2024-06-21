import React from "react";
import Link from "next/link";
import {Chip} from "@nextui-org/react";

export default function ChipUI(props:any) {
  return (
    <Chip
    size="lg"
      variant="solid"
      classNames={{
        base: "bg-gradient-to-br from-indigo-500 to-pink-500  ",
        content: "text-white",
      }}
    >
       <Link href={props.link}>
      {props.children}
      </Link>
    </Chip>
  );
}
