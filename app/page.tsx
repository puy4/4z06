
import React from 'react';
import Logo from "./ui/logo";
import dynamic from 'next/dynamic';

const Authentication = dynamic(() => import('./client/authentication'), {
  ssr: false,
})


export default function Page() {



  return (
    <>
    <Logo/>
    <Authentication/>
    </>
    )


}
