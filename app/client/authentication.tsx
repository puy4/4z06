"use client"
import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';
import React from 'react';
import type { NextPage } from 'next';
import Authenticated from './Authenticated';
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button} from "@nextui-org/react";
import Link from 'next/link';
import {Image as NextUIImage} from "@nextui-org/react";
const Authentication: NextPage  = () => {
  const { user, error, isLoading } = useUser();


  return (
    <main className="min-h-screen">
      <Navbar maxWidth={`full`}>
        <NavbarBrand>
          <NextUIImage
          isBlurred={true}
          src="/poker.svg"
          width={25}
          alt="NextUI hero Image"
          radius={`none`}
          />
        <p className="font-bold text-inherit">4ZP6</p>
        </NavbarBrand>
          <NavbarContent className="sm:flex gap-4" justify="center">
            Multiplayer Realtime Cribbage
          </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
          {user ? 
            (<Button as={Link} href="/api/auth/logout" variant="flat">
              Log Out
            </Button>):            (<Button as={Link} href="/api/auth/login" variant="flat">
              Log In
            </Button>)}
          </NavbarItem>
        </NavbarContent>
      </Navbar>

    {user ? <Authenticated key="auth"/>:<UnAuth key="unauth" />}

    </main>


  )
}


const UnAuth: NextPage  = () => {
  return(    

    <div className="flex items-center flex-col flex-row">
      <div className="py-12">

        <Image
          src="/poker2.svg"
          width={600}
          height={600}
          className=""
          alt=""
        />



      </div>
    </div>


  )
}

export default Authentication;
