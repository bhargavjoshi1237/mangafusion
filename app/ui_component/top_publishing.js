'use client'
import * as React from "react";
import PubDiv from "./publishing_div";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
export default function TopPublishing({data}) {
  const [trendingData, setTrendingData] = React.useState([]);
  React.useEffect(() => {

        setTrendingData(data.json);
       
  }, []);

    return (
<>
    <div className="w-[90%] mt-4 ml-auto mr-auto rounded-xl h-[235px] overflow-hidden flex " >
   
 <Carousel plugins={[
    Autoplay({
      delay: 5000,
    }),
  ]} className="w-full">
  <CarouselContent>
    {/* Group entries into sets of 3 */}
    {Array.from({ length: Math.ceil(trendingData.length / 3) }).map((_, slideIndex) => (
      <CarouselItem key={slideIndex}>
        <div className="flex">
          {/* Hide this on mobile view */}
          <div className="w-full hidden md:flex">
            {trendingData.slice(slideIndex * 3, slideIndex * 3 + 3).map((entry, entryIndex) => (
              <PubDiv key={entryIndex} data={entry} />
            ))}
          </div>
          {/* Hide this on desktop view */}
          <div className="w-full block md:hidden -ml-4">
            {trendingData.slice(slideIndex * 3, slideIndex * 3 + 1).map((entry, entryIndex) => (
              <div key={entryIndex} className="w-full">
                <PubDiv data={entry} />
              </div>
            ))}
          </div>
        </div>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>




</div>
</>
);
}
