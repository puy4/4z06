/**
 * Warning: Opening too many live preview tabs will slow down performance.
 * We recommend closing them after you're done.
 */
import React from "react";
import dynamic from 'next/dynamic';

const PresenceClient = dynamic(() => import('./presence-client'), {
  ssr: false,
})

const Presence = () => {

  const pageId = "Presence"

  return (
      <>

        <div className="flex flex-col grow gap-6 pt-12 pr-12 pb-12 pl-12 rounded-2xl h-[864px] ">
          <PresenceClient />
        </div>
      </>
  )
}

export default Presence;