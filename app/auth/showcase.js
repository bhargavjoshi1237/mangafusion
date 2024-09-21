'use client'
import * as React from 'react';
import { useEffect, useState } from 'react';
import AutoScroll from 'embla-carousel-auto-scroll';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { supabase } from '../supabaseC';

export function CarouselOrientation() {
  const [images, setImages] = useState([]);
  const [imagesx, setImagesx] = useState([]);


  useEffect(() => {
    const fetchImages = async () => {
      const { data, error } = await supabase
        .from('all_cash')
        .select('json')
        .eq('name', 'carousel');

      if (error) {
        console.error('Error fetching images:', error);
        return;
      }

      if (data.length > 0) {
        const jsonData = data[0].json;
        console.log('Fetched data:', jsonData);

        // Assuming jsonData contains an array of image URLs
        setImages(jsonData.anilist);
        setImagesx(jsonData.trendingThisWeek);

      }
    };

    fetchImages();
  }, []);

  return (
    <div className='flex ml-auto mr-10'>
        <div className='h-screen  w-[200px]'>
        <Carousel
      plugins={[
        AutoScroll({}),
      ]}
      opts={{
        align: 'start',
        loop: true,
      }}
      orientation="vertical"
      className="w-[400px] -ml-20 rotate-180"
    >
      <CarouselContent className="-mt-1 h-screen">
        {imagesx.map((image, index) => (
          <CarouselItem key={index} className=" md:basis-1/6">
            <div className="h-[50%] w-[150px]">
              
               
                  <img src={image.full?.data?.attributes?.posterImage?.original} alt={`Slide ${index + 1}`} className=" rounded-lg rotate-180" />
                
              
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
        </div>
        <div className='h-screen   w-[200px]'>
        <Carousel
      plugins={[
        AutoScroll({}),
      ]}
      opts={{
        align: 'start',
        loop: true,
      }}
      orientation="vertical"
      className="w-[400px] -ml-52"
    >
      <CarouselContent className="-mt-1 h-screen">
      {[...imagesx].sort(() => Math.random() - 0.5).map((image, index) => (
  <CarouselItem key={index} className="md:basis-1/6">
    <div className="h-[50%] w-[150px]">
      <img src={image.full?.data?.attributes?.posterImage?.original} alt={`Slide ${index + 1}`} className="rounded-lg" />
    </div>
  </CarouselItem>
))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
        </div>
    </div>
  );
}
