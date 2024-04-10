import React, { use } from 'react'

import { client } from '@/sanity/lib/client';

import { Product } from '@/components/Index';

function getProducts() {
    const query = '*[_type == "product"]'
    const data = client.fetch(query);
    return data;
}

export default function page() {
    const products = use(getProducts());
  return (
    <div>
      <div className="mt-20 pt-0.5">
        <p className="font-serif text-6xl tracking-wide text-center my-10 mx-0 text-[#324d67]">Shop</p>
      </div>
      <div className='w-fit mx-auto grid grid-cols-1 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5 pb-24'>
        {products?.map((product) => <Product key={product._id} product={product}/>)}
      </div>
    </div>
  )
}