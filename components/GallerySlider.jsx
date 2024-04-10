'use client';

import { Carousel } from 'flowbite-react';

const GallerySlider = () => {
  return (
  //   .image-container {
  //     display: grid;
  //     gap: 20px;
  //     width: 70%;
  //     margin: 0px auto;
  // }
    
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
        <Carousel indicators={false} leftControl=" " rightControl=" ">
          <img
            alt="..."
            src="/gpu-desk.jpg"
          />
          <img
            alt="..."
            src="/gpu.jpg"
          />
          <img
            alt="..."
            src="/board.jpg"
          />
          <img
            alt="..."
            src="/motherboard.jpg"
          />
          <img
            alt="..."
            src="/side-view-pc.jpg"
          />
        </Carousel>
    </div>
  )
}

export default GallerySlider