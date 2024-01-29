import React from 'react';
import dynamic from 'next/dynamic';



const Authentication = dynamic(() => import('./client/authentication'), {
  ssr: false,
})


export default function Page() {
  return (
      <>
        <Authentication/>
      </>
    )


}
 