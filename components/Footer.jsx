import React from 'react'

import Link from 'next/link';
import Image from 'next/image';
import { footerLinks } from "@/constants";

const Footer = () => {
  return (
    <footer className="flex flex-col text-blue-700 mt-5 border-t border-gray-200 bg-gray-900">
      <div className="flex max-md:flex-col flex-wrap justify-between gap-5 sm:px-16 px-6 py-10">
        <div className="flex flex-col justify-start items-start gap-6">
          <Image src="/logo3.svg" alt="logo" width={118} height={18} className="object-contain"/>
          <p className="text-base text-white">
            PC Shop 2024 <br />
            All rights reserved &copy;
          </p>
        </div>
      

        <div className="flex-1 w-full flex md:justify-end flex-wrap max-md:mt-10 gap-20">
          {footerLinks.map((link) => (
            <div key={link.title}
            className="flex flex-col gap-6 text-base min-w-[170px]">
              <h3 className="font-bold">{link.title}</h3>
              {link.links.map((item) => (
                <Link
                  key={item.title}
                  href={item.url}
                  className="text-white hover:text-blue-500"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center flex-wrap mt-10 border-t border-gray-100 sm:px-16 px-6 py-10">
        <p>@2024 PC Shop. All Rights Reserved</p>
        <div className="flex-1 flex sm:justify-end justify-center max-sm:mt-4 gap-10;">
          <Link href="/"
          className="text-white hover:text-blue-500">
            Privacy Policy & Terms of Use
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer