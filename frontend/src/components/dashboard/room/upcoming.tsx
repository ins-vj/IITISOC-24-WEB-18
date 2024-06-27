import React from "react";
import {Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";
import WordPullUp from "./pullup";
import meetData from "./meetings.json";
import Link from "next/link";
import { AnchorIcon } from "./AnchorIcon";


export default function quickroom() {

  const columns = [
    {
      key: "event",
      label: "EVENT",
    },
    {
      key: "date",
      label: "Date",
    },
    {
      key: "time",
      label: "Time",
    },
    {
      key: "link",
      label: "Join",
    },
  ];

  const rows = meetData;



  return (



    <div className="  flex flex-col h-min w-min backdrop-blur-md bg-[#ffffff3b] gap-[20px] p-[20px] rounded-3xl ">

      <WordPullUp
        className="text-[2rem] w-[600px] font-bold tracking-[-0.02em] text-white  "
        words="Upcoming Meetings"
      />

      <Table aria-label="Upcoming meeting">
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={rows} >
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => <TableCell>

                {columnKey === "link" ? <Link href={getKeyValue(item, columnKey)} > <Button  color="danger" startContent={<AnchorIcon/>} isIconOnly={true} variant="light"></Button></Link> : <div>{getKeyValue(item, columnKey)}</div>}
                
                
               
                
                </TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>




    </div>



  );
}