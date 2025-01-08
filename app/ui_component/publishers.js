'use client'
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function TopPublishing() {
  const data = [
    {
      src: 'https://upload.wikimedia.org/wikipedia/en/b/b6/Seven_seas200.png',
      alt: 'Seven Seas',
      className: 'w-[100px]'
    },
    {
      src: 'https://static.wikia.nocookie.net/starwars/images/f/f3/YenPress.svg',
      alt: 'Yen Press',
      className: 'w-[130px]',
      style: { filter: "brightness(0) invert(1)" }
    },
    {
      src: '',
      alt: 'Kodansha',
      svg: (
        <svg className="w-[250px] kodansha-logo" version="1.1" x="0px" y="0px" viewBox="0 0 2000 516.54" style={{ enableBackground: "new 0 0 2000 516.54", fill: "#e7e7e7" }} aria-label="Kodansha" role="img">
          <g>
            <path d="M917.45,172.27c48.08,0,85.4,37.56,85.4,86.36c0,49.28-37.32,86.6-85.4,86.6c-48.09,0-84.69-37.32-84.69-86.6 C832.77,209.83,869.37,172.27,917.45,172.27z M918.17,319.16c32.3,0,55.74-26.08,55.74-60.52c0-33.73-23.45-60.05-55.74-60.05 c-33.01,0-56.46,26.31-56.46,60.05C861.71,293.08,885.16,319.16,918.17,319.16z"/>
            <path d="M1027.48,342.6V175.14h52.39c45.21,0,90.67,19.14,90.67,82.53c0,63.64-45.45,84.93-90.67,84.93H1027.48z M1055.94,200.98 v115.79h18.66c35.64,0,66.75-11.72,66.75-59.09c0-45.69-31.1-56.7-66.99-56.7H1055.94z"/>
            <path d="M1470.31,342.58l-83.25-119.97v119.97h-28.47V175.12h28.47l83.25,120.45V175.12h28.71v167.46H1470.31z"/>
            <path d="M1580.99,269.87c-30.62-5.03-49.04-22.25-49.04-49.52c0-29.9,27.27-48.08,59.09-48.08c29.66,0,48.56,12.68,61.96,26.79 l-19.86,21.05c-9.33-11.24-22.73-22.01-43.3-22.01s-29.18,11.48-29.18,21.53c0,11.24,7.18,19.14,26.55,22.49l16.75,2.87 c35.88,6.22,52.39,24.64,52.39,51.2c0,28.23-23.68,49.04-64.11,49.04c-31.1,0-52.87-14.59-66.75-32.06l19.38-19.62 c10.29,13.4,24.16,25.84,50.96,25.84c21.29,0,31.82-10.05,31.82-22.73c0-10.76-6.7-20.09-26.31-23.44L1580.99,269.87z"/>
            <path d="M1791.04,342.53v-72.49h-78.71v72.49h-28.47V175.07h28.47v68.9h78.71v-68.9h28.71v167.46H1791.04z"/>
            <polygon points="824.94,175.12 794.13,174.59 735.17,279.4 714.08,271.11 714.08,175.12 685.62,175.12 685.62,342.58 714.08,342.58 714.08,300.48 827.18,345.23 827.18,344.62 827.18,315.55 761.1,289.49"/>
            <path d="M1288.4,175.12h-62.05l-47.25,167.45h30.45l8.92-33.69h77.81l8.92,33.69h30.45L1288.4,175.12z M1225.35,283.01l21.53-82h21 l21.53,82H1225.35z"/>
            <path d="M1951.89,175.12h-62.05l-47.25,167.45h30.45l8.92-33.69h77.81l8.92,33.69h30.45L1951.89,175.12z M1888.84,283.01l21.53-82 h21l21.53,82H1888.84z"/>
          </g>
          <path d="M-0.86,0v516.54h516.54V0H-0.86z M210.44,294.08V28.47h250.98L304.32,317.62L210.44,294.08z M487.22,40.62v322.85 l-154.37-38.7L487.22,40.62z M181.97,28.47v258.47l-154.36-38.7V28.47H181.97z M27.61,277.6l154.36,38.7v171.78H27.61V277.6z M210.44,488.07V323.43l276.78,69.39v95.25H210.44z"/>
        </svg>
      )
    },
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Viz_Media_2017_logo.svg',
      alt: 'Seven Seas',
      className: 'w-[250px] ',
      style: { filter: "brightness(0) invert(1)" }
    },{
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Square_Enix_logo.svg/1200px-Square_Enix_logo.svg.png',
      alt: 'Seven Seas',
      className: 'w-[300px] ',
      style: { filter: "brightness(0) invert(1)" }
    },{
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Square_Enix_logo.svg/1200px-Square_Enix_logo.svg.png',
      alt: 'Seven Seas',
      className: 'w-[300px] ',
      style: { filter: "brightness(0) invert(1)" }
    }
  ];

  return (
       <div className="w-[87%] ml-auto mr-auto mt-6 mb-6">
        <p className=" ml-auto mr-auto text-xl text-white fon">
                    Top Publishers 
                </p>
    <div className=" mt-6 ml-auto mr-auto rounded-xl items-center justify-center overflow-hidden flex">
       
      <Carousel  plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]} className="w-full">
        <CarouselContent >
          {Array.from({ length: Math.ceil(data.length / 3) }).map((_, slideIndex) => (
            <CarouselItem key={slideIndex}>
            <div className="flex">
              {data.slice(slideIndex * 3, slideIndex * 3 + 3).map((entry, entryIndex) => (
                <div
                  key={entryIndex}
                  className="w-[30%] p-5 ml-auto mr-auto flex items-center justify-center border border-[#474747] rounded-lg"
                  style={{ height: '200px' }} // Set a fixed height for the container
                  onClick={() => {
                    if (entryIndex === 0) {
                      window.location.href = "/publisher/sevenseas";
                    } else if (entryIndex === 1) {
                      window.location.href = "/publisher/yenpress";
                    } else if (entryIndex === 2) {
                      window.location.href = "/publisher/vizmedia";
                    }
                  }}
                >
                  {entry.svg ? entry.svg : (
                    <img
                      src={entry.src}
                      alt={entry.alt}
                      className={entry.className}
                      style={{ userSelect: "none", maxHeight: '100%', ...entry.style }} // Ensure the image fits within the container
                      draggable="false"
                      onContextMenu={(e) => e.preventDefault()}
                    />
                  )}
                </div>
              ))}
            </div>
          </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div><br /></div>

  );
  
}