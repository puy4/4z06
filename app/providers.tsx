'use client';

import '@/app/ui/global.css';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { NextUIProvider } from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import React from 'react';



export function Providers({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>

    <UserProvider><NextUIProvider><NextThemesProvider defaultTheme='light' attribute="class" themes={['dark','light']}>
      
    {children}
    </NextThemesProvider></NextUIProvider></UserProvider>
    </>   

    )


}