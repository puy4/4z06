'use client';

import React from "react";


export class LogEntry {
    public timestamp: string
    public message: string
    public id: string
  
    constructor(message: string,id:string) {
      this.timestamp = new Date().toLocaleString()
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
      <div className="flex flex-col justify-start items-start gap-4">
        { displayHeader &&
        <div className="font-manrope text-sm min-w-[108px] whitespace-nowrap text-black text-opacity-100 leading-4 uppercase tracking-widest font-medium">
          <span className="uppercase">Message log</span>
        </div>
        }
        <div className="flex flex-col justify-start items-start rounded-lg bg-white">
  
          <div className="flex flex-col-reverse justify-start items-start gap-4 pt-6 pr-6 pb-6 pl-6 w-[752px] max-h-60 overflow-y overflow-x-scroll scrollbar ">
            <div className="font-jetbrains-mono text-sm  text-rose-400 text-opacity-100 leading-normal font-medium">
            <ul>
            {
              // Show the newest log entry at the top
              logEntries.map((logEntry: LogEntry) => {
                return (
                  <li key="logEntry" >
                    <span className="font-jetbrains-mono text-sm min-w-[20px] whitespace-nowrap text-slate-500 text-opacity-100 leading-normal font-medium">{logEntry.timestamp}      {logEntry.id}</span>&nbsp;&nbsp;{logEntry.message}
                  </li>
                )}
              )
            }
            </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }