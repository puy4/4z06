"use client";

import {Switch, SwitchProps, VisuallyHidden, useSwitch} from "@nextui-org/react";
import {useTheme} from "next-themes";
import {SunIcon,MoonIcon} from "@heroicons/react/24/outline"
import { useEffect, useState } from "react";
import React from "react";


export const ThemeSwitcher = (props:SwitchProps) => {
    const {
      Component, 
      slots, 
      isSelected, 
      getBaseProps, 
      getInputProps, 
      getWrapperProps,


    } = useSwitch(props,);
  
  const { theme, setTheme } = useTheme()
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    isSelected?(setTheme('light')):(setTheme('dark'))
  }, [isSelected])



  useEffect(() => setHasMounted(true));
  



  // this line is the key to avoid the error.
  if (!hasMounted) {return null;}


  return (


    <div >
      <Component {...getBaseProps()} 
      >
          <VisuallyHidden>
            <input {...getInputProps()} />
          </VisuallyHidden>
          <div
            {...getWrapperProps()}
            className={slots.wrapper({
              class: [
                "w-8 h-8",
                "flex items-center justify-center",
                "rounded-lg bg-background " 
              ],
            })}      
          >
            {isSelected ? <SunIcon/> : <MoonIcon/>}

          </div>
      </Component>

    </div>
    
  )
}

