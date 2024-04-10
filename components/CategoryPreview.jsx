import React from 'react'

import Link from 'next/link';

import { urlForImage } from '@/sanity/lib/image';

const CategoryPreview = ({ category: { image, name, slug, details } }) => {
  return (
          <div>
            {/* <Link href={`/category/${slug.current}`}> */}
            <Link href={`/store`}>
            <div className="group relative">
              <div className="relative h-80 w-full overflow-hidden rounded-lg bg-gray sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                  <img
                  src={urlForImage(image && image[0]).url()}
                  width={300}
                  height={300}
                  className='h-80 w-72 object-cover rounded-t-xl'
                  />
              </div>
              <h3 className="mt-6 text-sm text-gray-500">
                <div href="/">
                  <span className="absolute inset-0"></span>
                  {details}
                </div>
              </h3>
              <p className="text-base font-semibold text-gray-900">{name}</p>
            </div>
            </Link>
          </div>
    
  )
}

export default CategoryPreview