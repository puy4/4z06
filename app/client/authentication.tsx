"use client"
import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';
import React, { useState } from 'react';
import type { NextPage } from 'next';
import Authenticated from './Authenticated';
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button} from "@nextui-org/react";
import Link from 'next/link';

import { ThemeSwitcher } from '../components/ThemeSwitcher';
import { GiCardJoker } from "react-icons/gi";

const Authentication: NextPage  = () => {
  const { user, error, isLoading } = useUser();
  const [gameSelected, setGame] = useState("");
  
  return (
    <main className="min-h-screen">
      <Navbar maxWidth={`full`}>
        <NavbarBrand>
          <Button variant='light' onClick={gameSelected==""?(()=>(null)):(()=>setGame(""))}>
            <GiCardJoker size={30} />
            <p className="font-bold text-inherit">4ZP6</p>
          </Button>
        </NavbarBrand>
          <NavbarContent className="sm:flex gap-4 " justify="center">
            Cribbage
          </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
          {user ? 
            (<Button as={Link} variant='light' size='sm' href="/api/auth/logout" >
              Log Out
            </Button>):  (<Button variant='light' size='sm' as={Link} href="/api/auth/login" >
              Log In
            </Button>)}
          </NavbarItem>
          <NavbarItem>
          <ThemeSwitcher/>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    {user ? <Authenticated setGame={setGame} gameSelected={gameSelected} key="auth"/>:<UnAuth key="unauth" />}
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
