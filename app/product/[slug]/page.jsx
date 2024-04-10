
"use client";

import Link from 'next/link';
import { client } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/image'
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useStateContext } from '@/context/StateContext';

export default function ProductDetails({ params }) { // params used with dynamic route to get information on the page.

  const [index, setIndex] = useState(0);
  const [productSlug, setProductSlug] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const { decQty, incQty, qty, onAdd } = useStateContext();

  useEffect(() => {
    const query = `*[_type == "product" && slug.current == '${params.slug}']`
    client.fetch(query)
      .then((data) => {
        setProductSlug(data)
        setLoading(false)
      })
  }, [])
  if (isLoading) return <p>Loading...</p>
  if (!productSlug) return <p>Error</p>
  return (

    <div className="py-10 font-poppins dark:bg-gray-800">
      <div className="max-w-6xl px-4 mx-auto">
        <div className="flex flex-wrap mb-24 -mx-4">

          {/* PRODUCT PICTURES */}
          <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
            <div className="sticky top-0 overflow-hidden ">
              
              {/* MAIN PICTURE */}
              <div className="relative mb-6 lg:mb-10 lg:h-96">
                <Image src={urlForImage(productSlug[0].image && productSlug[0].image[index]).url()} 
                width={600}
                height={600}
                alt={productSlug[0].name}/>
              </div>
              {/* MAIN PICTURE END */}

              {/* EXTRA PICTURES COURESEL */}
              <div className="flex-wrap hidden -mx-2 md:flex">
                  {productSlug[0].image?.map((item, i) => (
                  // added key. got error saying each child in a list should have a unique key prop
                  <div key={i} className="w-1/2 p-2 sm:w-1/4">
                    <a className="block border border-gray-200 hover:border-blue-400 dark:border-gray-700 dark:hover:border-blue-300" href="#">
                      <img src={urlForImage(item).url()}
                      width={150}
                      height={150}
                      onMouseEnter={() => setIndex(i)}
                      />
                    </a>
                   </div>
                  ))}
              </div>
              {/* END OF EXTRA PICTURES COURESEL*/}
            </div>
          </div>
          {/* PRODUCT PICTURES END */}

          <div className="w-full px-4 md:w-1/2">
            <div className="lg:pl-20">
              <div className="mb-6 ">
                <span className="px-2.5 py-0.5 text-xs text-blue-600 bg-blue-100 dark:bg-gray-700 rounded-xl dark:text-gray-200">New Arrival</span>
                {/* PRODUCT NAME */}
                <h2 className="max-w-xl mt-6 mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl dark:text-gray-300">
                  {productSlug[0].name}
                </h2>

                {/* RATING */}
                <div className="flex flex-wrap items-center mb-6">
                  <AiFillStar color="red" />
                  <AiFillStar color="red" />
                  <AiFillStar color="red" />
                  <AiFillStar color="red" />
                  <AiFillStar color="red" />
                  <a className="mb-4 text-xs underline hover:text-blue-600 dark:text-gray-400 dark:hover:text-gray-300 lg:mb-0">
                    (34)
                  </a>
                </div>
                {/* END RATING */}

                {/* PRICE */}
                <p className="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-400 ">
                  <span>${productSlug[0].price}</span>
                  {/* <span className="ml-3 text-base font-normal text-gray-500 line-through dark:text-gray-400">$429.99</span> */}
                </p>
                {/* END PRICE */}
              </div>

              {/* PRODUCT DETAILS */}
              <div className="mb-6">
                <h2 className="mb-2 text-lg font-bold text-gray-700 dark:text-gray-400">Product Details :</h2>
                <div className="text-gray-700">
                  {productSlug[0].details}
                </div>
              </div>

              <div className="py-6 mb-6 border-t border-b border-gray-200 dark:border-gray-700">
                <span className="text-base text-gray-600 dark:text-gray-400">In Stock</span>
                <p className="mt-2 text-sm text-blue-500 dark:text-blue-200">Ships from USA.
                  <span className="text-gray-600 dark:text-gray-400">
                  &nbsp;Most customers receive within 3-7 business days.
                  </span>
                </p>
              </div>

              {/* Add product to cart, quantity */}
              <div className="flex flex-wrap items-center mb-6">
                <div className="mb-4 mr-4 lg:mb-0">
                  <div className="w-24">
                    <div className="relative flex flex-row w-full h-10 bg-transparent rounded-lg">
                      <button className="w-20 h-full text-gray-600 bg-gray-100 border-r rounded-l outline-none cursor-pointer dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-400 hover:text-gray-700 dark:bg-gray-900 hover:bg-gray-300">
                        <span onClick={decQty}><AiOutlineMinus className="m-auto"/></span>
                      </button>
                      <span className="flex items-center justify-center w-full font-semibold text-center text-gray-700 placeholder-gray-700 bg-gray-100 outline-none dark:text-gray-400 dark:placeholder-gray-400 dark:bg-gray-900 focus:outline-none text-md hover:text-black">{qty}</span>
                      <button className="w-20 h-full text-gray-600 bg-gray-100 border-l rounded-r outline-none cursor-pointer dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-400 dark:bg-gray-900 hover:text-gray-700 hover:bg-gray-300">
                        <span onClick={incQty}><AiOutlinePlus className="m-auto"/></span>
                      </button>
                    </div>
                  </div>
                </div>

                <button type="button" className="w-full px-4 py-3 text-center text-blue-600 bg-blue-100 border border-blue-600 dark:hover:bg-gray-900 dark:text-gray-400 dark:border-gray-700 dark:bg-gray-700 hover:bg-blue-600 hover:text-gray-100 lg:w-1/2 rounded-xl" onClick={() => onAdd(productSlug[0], qty)}>
                  Add to cart
                </button>
              </div>

              {/* Buy now */}
              <div className="flex gap-4 mb-6">
                <button type="button" className="w-full px-4 py-3 text-center text-blue-600 bg-blue-100 border border-blue-600 dark:border-gray-700  hover:text-gray-100 hover:bg-blue-600 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-900 rounded-xl">
                  Buy now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}