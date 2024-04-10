'use client';

export const revalidate = 30;

import React, { useState, useEffect, use } from 'react';
import { client } from '@/sanity/lib/client';
import { CategoryPreview, Hero, Product, GallerySlider } from '@/components/Index';

import { FaWallet, FaVirusSlash, FaBriefcase } from "react-icons/fa";
import { GiAutoRepair } from "react-icons/gi";
import { IoIosSpeedometer } from "react-icons/io";

export default function Home() {
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const query = '*[_type == "product"]'
    client.fetch(query)
      .then((data) => {
        setProducts(data)
      })
  }, [])

  useEffect(() => {
    const query = '*[_type == "category"]'
    client.fetch(query)
      .then((data) => {
        setCategories(data)
        setLoading(false)
      })
  }, [])


  if (isLoading) return <p>Loading...</p>
  if (!products || !categories) return <p>Error Loading Data</p>

  const featured = products.filter((item) => item.featured == true);

  return (
    <main className='overflow-hidden'>
      <div>
        <div className="relative text-center text-white">
          <GallerySlider />
          <div className="absolute left-2.5 sm:left-1/4 bottom-1/4">
            <span className="bg-red-600 inline-block w-44 rounded-full p-5"><span className="text-base">UP TO</span><br></br><span className="text-3xl font-bold">40% OFF</span> <span className="text-xs font-light">ON SELECT PRODUCTS</span></span>
          </div>
        </div>
      </div>

      {/* POPULAR PRODUCTS SECTION */}
      <div className="mt-1 pt-0.5 md:mt-20">
        <p className="font-serif text-6xl tracking-wide text-center my-10 mx-0 text-[#324d67]">Popular Products</p>
      </div>
      <div className='w-fit mx-auto grid grid-cols-1 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5 pb-24'>
        {featured?.map((product) => <Product key={product._id} product={product}/>)}
      </div>

      <Hero />

      <div className="">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:pb-16">
          <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-8">
            <h2 className="text-2xl font-bold text-gray-900">Categories</h2>
            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {categories?.map((category) => <CategoryPreview key={category._id} category={category}/>)}
            </div>
          </div>
        </div>
      </div>

      {/* Incentive Section for Diagnostic and Repair */}
      <section className="pb-10 relative">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-10 gap-8">
          <div className="col-span-10 lg:col-span-4 bg-cover bg-center h-[273px] rounded-xl flex flex-col justify-end p-6 lg:items-start items-center" style={{backgroundImage: "url('/diagnostic.jpg')"}}>
            <h4 className="font-medium text-xl leading-8 text-white mb-4">Set Appointment Today</h4>
            <form className="form flex flex-col md:flex-row gap-4">
              <div className="flex items-center rounded-[100px] border border-gray-300 bg-transparent py-[10px] px-4 gap-2">
              {/* <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  
                </svg> */}
                <input type="text" name="text" id="" placeholder="Phone Number" className="w-4/5	outline-none border-none font-normal text-base py-[1px] text-gray-400 bg-transparent" />
              </div>
              <button className="bg-indigo-600 rounded-[100px] py-[13px] px-6 font-semibold text-sm text-white whitespace-nowrap focus-within:outline-0 shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-400">Set Appointment</button>
            </form>
          </div>
          <div className="col-span-10 lg:col-span-6 w-full" id="services">
            <div className="box flex h-full justify-center flex-col">
              <h2 className="font-manrope font-bold text-3xl leading-10 text-black mb-14 lg:text-left text-center">Computer Diagnostics and Repair</h2>
              <div className="grid grid-cols-3 sm:grid-cols-5 w-full">
                <div className="box flex flex-col items-center">
                  <button className="rounded-full p-3 flex items-center justify-center mx-auto bg-white shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-50 hover:shadow-indigo-200 text-blue-700">
                    <FaWallet size={36}/>
                  </button>
                  <p className="mt-2 w-[92px] text-center font-medium text-sm text-black"> 7* day Payment </p>
                </div>
                <div className="box flex flex-col items-center">
                  <button className="rounded-full p-3 flex items-center justify-center mx-auto bg-white shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-50 hover:shadow-indigo-200 text-blue-700">
                    <FaVirusSlash size={36}/>
                  </button>
                  <p className="mt-2 w-[92px] text-center font-medium text-sm text-black"> Virus Scan </p>
                </div>
                <div className="box flex flex-col items-center">
                  <button className="rounded-full p-3 flex items-center justify-center mx-auto bg-white shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-50 hover:shadow-indigo-200 text-blue-700">
                    <GiAutoRepair size={36}/>
                  </button>
                  <p className="mt-2 w-[92px] text-center font-medium text-sm text-black"> Repair </p>
                </div>
                <div className="box flex flex-col items-center">
                  <button className="rounded-full p-3 flex items-center justify-center mx-auto bg-white shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-50 hover:shadow-indigo-200 text-blue-700">
                    <FaBriefcase size={36} />
                  </button>
                  <p className="mt-2 w-[92px] text-center font-medium text-sm text-black"> Consultation </p>
                </div>
                <div className="box flex flex-col items-center">
                  <button className="rounded-full p-3 flex items-center justify-center mx-auto bg-white shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-50 hover:shadow-indigo-200 text-blue-700">
                    <IoIosSpeedometer size={36} />
                  </button>
                  <p className="mt-2 w-[92px] text-center font-medium text-sm text-black"> Overclock </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </main>
  )
}
