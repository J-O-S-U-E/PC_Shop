'use client'

import React, { useRef } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import { useStateContext } from '@/context/StateContext';
import { urlForImage } from '@/sanity/lib/image'
import toast from 'react-hot-toast';

const Cart = () => {
    const cartRef = useRef();
    const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuantity, onRemove } = useStateContext();

  return (
    <div className="w-screen bg-transparent fixed right-0 top-0 z-[100] transition-all" ref={cartRef}>
        <div className="h-screen w-[600px] bg-white float-right py-10 px-2.5 relative">
            <button
            type="button"
            className="flex items-center text-lg font-medium cursor-pointer gap-0.5 ml-2.5 border-0 bg-transparent"
            onClick={() => setShowCart(false)}>
                <span className='align-baseline'><AiOutlineLeft /></span>
                <span className="ml-2.5">Your cart</span>
                <span className="ml-2.5 text-red-600">({totalQuantities} items)</span>
            </button>

            {cartItems.length < 1 && (
              <div className="m-10 text-center">
                <AiOutlineShopping size={150}/>
                <h3 className="font-semibold text-xl"> Your shopping bag is empty</h3>
                <Link href="/">
                  <button
                    type="button"
                    onClick={() => setShowCart(false)}
                    className="w-full max-w-[400px] py-2.5 px-3 rounded-2xl border-0 text-xl mt-2.5 mb-10 uppercase bg-blue-600 text-white cursor-pointer scale-x-100 scale-y-100 transition-transform duration-500 ease-linear"
                  >
                    Continue Shopping
                  </button>
                </Link>
              </div>
            )}
            <div className="mt-4 overflow-auto max-h-[70vh] py-5 px-2.5">
              {cartItems.length >=1 && cartItems.map((item) => (
                <div className="flex gap-8 p-2 border border-gray-400" key={item._id}>
                  <img src={urlForImage(item?.image[0])}
                  className="w-48 h-36 rounded-2xl bg-white" />
                  <div className="w-full">
                    <div className="flex gap-2.5 justify-between">
                      <h5 className="text-base text-blue-800">{item.name}</h5>
                      <h4 className="text-base text-black">${item.price}</h4>
                    </div>
                    <div className="mt-7 flex pt-2.5 flex justify-between">
                      <div>                        
                        <div className="relative flex flex-row w-7/12 h-10 bg-transparent rounded-lg">
                          <button className="w-20 h-full text-gray-600 bg-gray-100 border-r rounded-l outline-none cursor-pointer dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-400 hover:text-gray-700 dark:bg-gray-900 hover:bg-gray-300">
                            <span onClick={() => toggleCartItemQuantity(item._id, 'dec')}><AiOutlineMinus className="m-auto"/></span>
                          </button>
                          <span className="flex items-center justify-center w-full font-semibold text-center text-gray-700 placeholder-gray-700 bg-gray-100 outline-none dark:text-gray-400 dark:placeholder-gray-400 dark:bg-gray-900 focus:outline-none text-md hover:text-black">{item.quantity}</span>
                          <button className="w-20 h-full text-gray-600 bg-gray-100 border-l rounded-r outline-none cursor-pointer dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-400 dark:bg-gray-900 hover:text-gray-700 hover:bg-gray-300">
                            <span onClick={() => toggleCartItemQuantity(item._id, 'inc')}><AiOutlinePlus className="m-auto"/></span>
                          </button>
                        </div>
                      </div>
                      <button
                      type="button"
                      className="text-2xl text-red-500 cursor-pointer bg-transparent border-0"
                      onClick={() => onRemove(item)}
                      >
                        <TiDeleteOutline />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {cartItems.length >= 1 && (
              <div className="absolute bottom-3 right-1 w-full py-7 px-16">
                <div className="flex justify-between">
                  <h3 className="text-xl">Subtotal:</h3>
                  <h3 className="text-xl">${totalPrice.toFixed(2)}</h3>
                </div>
                <div className="w-[300px] m-auto">
                  <button
                  type="button"
                  className="w-full max-w-[400px] py-2.5 px-3 rounded-2xl border-0 text-xl mt-2.5 mb-10 uppercase bg-blue-600 text-white cursor-pointer scale-x-100 scale-y-100 transition-transform duration-500 ease-linear"
                  onClick=""
                  >
                    Pay and checkout
                  </button>
                </div>
              </div>
            )}
        </div>
    </div>
  )
}

export default Cart