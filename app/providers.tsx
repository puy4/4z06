'use client';

import '@/app/ui/global.css';
import { poppins } from '@/app/ui/fonts';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { NextUIProvider } from "@nextui-org/react";


export function Providers({
  children,
}: {
  children: React.ReactNode
}) {
  return <NextUIProvider><UserProvider>{children}</UserProvider></NextUIProvider >;


}