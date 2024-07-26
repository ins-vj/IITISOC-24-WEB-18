import React from "react";
import {Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";
import WordPullUp from "./pullup";
import meetData from "./meetings.json";
import Link from "next/link";
import { AnchorIcon } from "./AnchorIcon";
import Cards from "@/components/landingpage/room/cards";

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



    <Cards>

      <WordPullUp
        className="text-[1.5rem] w-[100%] font-bold tracking-[-0.02em] text-left  "
        words="Upcoming Meetings"
      />

      <Table aria-label="Upcoming meeting" className=" h-[410px] ">
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




    </Cards>



  );
}