"use client"

import Link from 'next/link'
import React from 'react'
import { BsBugFill } from "react-icons/bs";
import { usePathname } from 'next/navigation';
import classNames from 'classnames';


const NavBar = () => {

    const currentPath = usePathname();
    // console.log(currentPath);
    

    const links = [
        { label: 'Dashboard', href: '/'},
        { label: 'Issues', href: '/issues'}
    ]

  return (
  <nav className='flex space-x-8 border-b mb-5 px-5 items-center h-20 '>
    <Link href='/'><BsBugFill /></Link>

    <ul className='flex space-x-8'>
        {links.map(link => 
        <Link 
        key= {link.href} 
        className={classNames({
       'text-zinc-900' : link.href === currentPath,
       'text-zinc-500' : link.href !== currentPath,
       'hover:text-zinc-900 transition-colors' : true,
        })}
        href={link.href}>{link.label}</Link>)}
    </ul>
  </nav>

  )
}

export default NavBar