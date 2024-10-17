"use client"
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { HiOutlineShoppingBag  } from "react-icons/hi2";
import { IoSearch } from "react-icons/io5";
import { signOut, useSession } from 'next-auth/react';

import { usePathname, useRouter } from 'next/navigation';

const Navbar = () => {
  const pathName = usePathname();
  const router = useRouter();
  const session = useSession();
  // console.log(session);
  const navItems = [
    {
      title:"Home",
      path:'/'
    },
    {
      title:"About",
      path:'/about'
    },
    {
      title:"Services",
      path:'/services'
    },
    {
      title:"MyBookings",
      path:'/my-bookings'
    },
    {
      title:"Blog",
      path:'/blog'
    },
    {
      title:"Contact",
      path:'/contact'
    },
    
  ]
  const handler = () =>{
    router.push('login')
  }
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
          <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h7" />
        </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        {
              navItems.map((item) => (
                <li key={item.path}>
                  <Link href={item.path}>{item.title}</Link>
                </li>
              ))
            }
       
          </ul>
        </div>
        <Link href='/'>
          <Image src="/assets/logo.svg" alt="logo" height={60} width={100}></Image>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
        
        {
              navItems.map((item) => (
                <li key={item.path}>
                  <Link href={item.path}>{item.title}</Link>
                </li>
              ))
            }
       
        </ul>
      </div>
      <div className="navbar-end">
       <div className='flex space-x-3 items-center '>
       <IoSearch size={30}  />
       <HiOutlineShoppingBag size={30}  />
       </div>
        <a className="btn btn-outline btn-primary mx-2 px-6">Appointment</a>
        <div className='flex items-center space-x-3'>
      <div>
        <h6>{session?.data?.user?.name}</h6>
        <h6>{session?.data?.user?.type}</h6>
        </div>
        {/* {session?.data && (
          <div className='rounded-full mr-3 overflow-hidden size-12'>
             <Image height={50} width={50} 
             alt={session?.data?.user?.name}
             src={session?.data?.user?.image}
            />
          </div>
        )} */}
      <div>
      <Link href={'/signup'}>
      <button onClick={handler} className="btn btn-primary mr-4">sign up</button>
      </Link>
      {session.status !== "authenticated" ?
      (<button onClick={handler} className="btn btn-primary">Login</button>) :
      (<button 
        onClick={() => signOut()}
        className="btn btn-primary rounded">Logout</button>)
      }
      </div>
      </div>
      </div>
      
    </div>
  );
};

export default Navbar;