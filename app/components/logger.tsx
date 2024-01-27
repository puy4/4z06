'use client';

import React from "react";
import {
  Listbox,
  ListboxSection,
  ListboxItem,
  Spacer,
  Code

} from "@nextui-org/react";

export class LogEntry {
    public timestamp: string
    public timemili: string
    public message: string
    public id: string
  
    constructor(message: string,id:string) {
      this.timestamp = new Date().toLocaleString()
      const d = new Date();
      this.timemili = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}.${d.getMilliseconds()}`
      this.message = message
      this.id = id
    }
  }
  
  export type LoggingProps = {
    logEntries: Array<LogEntry>,
    displayHeader: boolean
  }
  
  export default function Logger({ logEntries, displayHeader }: LoggingProps) {
    return (
        
      <div className=" ">
        
        {/*<>MESSAGES</>
        <Listbox
          variant="solid"
          items={logEntries}
          aria-label="Dynamic Actions"
          onAction={(key) => alert(key)}
        >
          {(item) => (
            <ListboxItem
              
              key={item.message+item.timemili}
              color={"default"}
              className={""}
            >
              {item.timestamp}      {item.id}&nbsp;&nbsp;{item.message}
            </ListboxItem>
          )}
        </Listbox>*/}


 




      </div>

    )
  }