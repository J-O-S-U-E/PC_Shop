'use client'

import React from 'react'

import Link from 'next/link';
import Image from 'next/image';

import { Cart } from '@/components/Index';
import { useStateContext } from '@/context/StateContext';


import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
    const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <nav className="border-gray-200 bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <div className="flex">
                <Image src="/logo3.svg" width={50} height={50} className="h-8 mr-3" alt="PC Store Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white text-blue-700">PC Shop</span>
            </div>
            <div className="flex md:order-2">
                <div className="md:mx-5 flex justify-center items-center">
                    <div className="relative py-2">
                        <div className="t-0 absolute left-6">
                            <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-2.5 text-xs text-white">{totalQuantities}</p>
                        </div>
                        <button type="button" className="relative" onClick={() => setShowCart(true)}><FaShoppingCart size="30" color="white"/></button>
                    </div>
                </div>

                {showCart && <Cart />}
                
                <button data-collapse-toggle="navbar-cta" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-lg md:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
            </div>
            <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
                <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-700 rounded-lg bg-gray-800 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-gray-900">
                <li>
                    <Link href="/" className="block py-2 pl-3 pr-4 text-blue-500 bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0" aria-current="page">Home</Link>
                </li>
                <li>
                    <Link href="/store" className="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-700 md:hover:bg-transparent hover:text-blue-500 md:p-0">Shop</Link>
                </li>
                </ul>
            </div>
        </div>
    </nav>
    
  )
}

export default Navbar