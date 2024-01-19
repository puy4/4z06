/**
 * Warning: Opening too many live preview tabs will slow down performance.
 * We recommend closing them after you're done.
 */

import React from "react";

import dynamic from 'next/dynamic';


const AuthenticationClient = dynamic(() => import('./authentication-client'), {
  ssr: false,
})

const Authentication = () => {

  const pageId = "Authentication";

  return (
      <>

        <div className="flex flex-col grow pt-12 pr-12 pb-12 pl-12 rounded-2xl h-[864px] ">
          <AuthenticationClient />
        </div>
      </>
  )
};

export default Authentication;