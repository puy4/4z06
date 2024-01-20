'use client';

import Logo from '@/app/ui/logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana  } from '@/app/ui/fonts';
import Image from 'next/image';
import ProfileClient from '@/app/ui/ProfileClient';


import { useUser } from '@auth0/nextjs-auth0/client';
export default function Page() {
  const { user, error, isLoading } = useUser();
  if (!user) {
  return (
    <main className="flex min-h-screen flex-col p-6">

      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-600 p-4 md:h-52">
        <Logo></Logo>
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <Link
            href="/api/auth/login"
           
            className="flex items-center gap-5 self-start rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">

          <Image
            src="/poker2.svg"
            width={500}
            height={500}
            className="hidden md:block"
            alt="Screenshots of the dashboard project showing desktop version"
          />
        </div>
          <Image
            src="/poker.svg"
            width={200}
            height={200}
            className="block md:hidden"
            alt="Screenshot of the dashboard project showing mobile version"
          />
      </div>
    </main>
  );  
  }
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-600 p-4 md:h-52">
      <Logo></Logo>
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <Link
          href="/dashboard"
          className="flex items-center gap-5 self-start rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400  md:text-base"
          >
          <span>Dashboard</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          {/* Add Hero Images Here hover: bg-blue-400*/}
          <Image
            src="/poker2.svg"
            width={500}
            height={500}
            className="hidden md:block"
            alt="Screenshots of the dashboard project showing desktop version"
          />
        </div>
          <Image
            src="/poker.svg"
            width={200}
            height={200}
            className="block md:hidden"
            alt="Screenshot of the dashboard project showing mobile version"
          />
      </div>
    </main>
  )

}
