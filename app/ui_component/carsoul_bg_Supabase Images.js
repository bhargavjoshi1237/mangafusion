"use client";
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with hardcoded details
const supabase = createClient(
  "https://imyvybtnpcbilsvgelve.supabase.co", // Supabase URL
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlteXZ5YnRucGNiaWxzdmdlbHZlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMDY0MjkzNiwiZXhwIjoyMDM2MjE4OTM2fQ.9i8lh1ajWsqeWLF1QtqsrGC-cj2RhETeoGwEl3_RNcA" // Supabase Anon Key
);

export default function CarouselComponent({ data }) {
  const [trendingData, setTrendingData] = React.useState([]);

  React.useEffect(() => {
    async function fetchImages() {
      const enrichedData = await Promise.all(
        data.trendingThisWeek.map(async (entry) => {
          // Determine folder name from title, fallback to 'en' if 'en_us' is missing
          const folderName = entry.main.attributes.titles.en_us || entry.main.attributes.titles.en;

          // Fetch image list from Supabase storage in the "tempbg" bucket
          const { data: imageUrls, error } = await supabase
            .storage
            .from("tempbg")
            .list(folderName, { limit: 10 });

          if (error) {
            console.error("Error fetching images:", error.message);
            return entry;
          }

          return {
            ...entry,
            imageUrls: imageUrls.map((file) =>
              supabase.storage
                .from("tempbg")
                .getPublicUrl(`${folderName}/${file.name}`).data.publicUrl
            )
          };
        })
      );

      setTrendingData(enrichedData);
    }

    fetchImages();
  }, [data]);

  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 4000,
        }),
      ]}
      className="w-full"
    >
      <CarouselContent>
        {trendingData.map((entry, index) => (
          <CarouselItem key={index}>
            <div className="flex">
              <div className="w-[95%] mt-2 ml-auto mr-auto rounded-xl h-[300px] overflow-hidden flex bg-blend-darken bg-cover relative">
              <div className="w-[100%] rounded-xl h-[300px] overflow-hidden bg-blend-darken absolute z-0 hidden md:flex">
  <img
    loading="lazy"
    src={`${entry.atHomeServer.baseUrl}/data-saver/${entry.atHomeServer.chapter.hash}/${entry.atHomeServer.chapter.dataSaver[0]}`}
    className="inset-0 w-full object-cover bg-blend-darken z-10 rotate-12 h-[500px] -mt-10 -ml-11 filter"
    style={{ filter: "brightness(0.27)" }}
  />
  <img
    loading="lazy"
    src={`${entry.atHomeServer.baseUrl}/data-saver/${entry.atHomeServer.chapter.hash}/${entry.atHomeServer.chapter.dataSaver[1]}`}
    className="inset-0 w-full object-cover bg-blend-darken z-0 mt-auto -mb-32 -ml-20 h-[450px] filter"
    style={{ filter: "brightness(0.27)" }}
  />
  <img
    loading="lazy"
    src={`${entry.atHomeServer.baseUrl}/data-saver/${entry.atHomeServer.chapter.hash}/${entry.atHomeServer.chapter.dataSaver[2]}`}
    style={{ rotate: "-25deg", filter: "brightness(0.27)" }}
    className="inset-0 w-full object-cover bg-blend-darken -ml-32 -mt-36 z-10 h-[700px] filter"
  />
  <img
    loading="lazy"
    src={`${entry.atHomeServer.baseUrl}/data-saver/${entry.atHomeServer.chapter.hash}/${entry.atHomeServer.chapter.dataSaver[3]}`}
    style={{ rotate: "10deg", filter: "brightness(0.27)" }}
    className="inset-0 w-full object-cover bg-blend-darken -mr-32 -ml-32 -mt-24 z-0 h-[700px] filter"
  />
  <img
    loading="lazy"
    src={`${entry.atHomeServer.baseUrl}/data-saver/${entry.atHomeServer.chapter.hash}/${entry.atHomeServer.chapter.dataSaver[4]}`}
    className="inset-0 w-full object-cover bg-blend-darken -ml-10 -mt-20 z-10 h-[650px] filter"
    style={{ filter: "brightness(0.27)" }}
  />
  <img
    loading="lazy"
    src={`${entry.atHomeServer.baseUrl}/data-saver/${entry.atHomeServer.chapter.hash}/${entry.atHomeServer.chapter.dataSaver[5]}`}
    className="inset-0 w-full object-cover bg-blend-darken rotate-12 -ml-24 z-10 -mt-20 -mr-10 h-[620px] filter"
    style={{ filter: "brightness(0.27)" }}
  />
</div>

<div className="w-[100%] rounded-xl h-[300px] overflow-hidden flex bg-blend-darken absolute z-0 md:hidden">
  <img
    loading="lazy"
    src={`${entry.atHomeServer.baseUrl}/data-saver/${entry.atHomeServer.chapter.hash}/${entry.atHomeServer.chapter.dataSaver[0]}`}
    className="bg-blend-darken z-10 rotate-12 h-[500px] w-full -mt-10 -ml-64 filter"
    style={{ filter: "brightness(0.27)" }}
  />
  <img
    loading="lazy"
    src={`${entry.atHomeServer.baseUrl}/data-saver/${entry.atHomeServer.chapter.hash}/${entry.atHomeServer.chapter.dataSaver[1]}`}
    style={{ rotate: "-25deg", filter: "brightness(0.27)" }}
    className="w-full inset-0 object-cover bg-blend-darken -ml-32 -mt-36 z-0 h-[700px] filter"
  />
  <img
    loading="lazy"
    src={`${entry.atHomeServer.baseUrl}/data-saver/${entry.atHomeServer.chapter.hash}/${entry.atHomeServer.chapter.dataSaver[2]}`}
    style={{ rotate: "-25deg", filter: "brightness(0.27)" }}
    className="w-full inset-0 object-cover bg-blend-darken -ml-32 -mt-36 z-10 h-[700px] filter"
  />
  <img
    loading="lazy"
    src={`${entry.atHomeServer.baseUrl}/data-saver/${entry.atHomeServer.chapter.hash}/${entry.atHomeServer.chapter.dataSaver[3]}`}
    style={{ rotate: "10deg", filter: "brightness(0.27)" }}
    className="inset-0 w-full object-cover bg-blend-darken -mr-32 -ml-32 -mt-24 z-0 h-[700px] filter"
  />
</div>


                {/* Additional HTML structure */}
                <div
                  className="z-20 w-[96.5%] h-[250px] ml-[35px] mt-[25px] flex absolute"
                  id="floatdiv"
                >
                  <div className="h-[250px] w-[187px] items-center justify-center hidden md:flex">
                    <img
                      loading="lazy"
                      src={entry.full.data.attributes.posterImage.medium}
                      className="h-[270px] w-[250px]"
                      alt=""
                    />
                  </div>
                  
                  <div className="w-[80%] max-md:hidden">
                    <p className="fon text-2xl text-white ml-10 mt-2" id="title">
                      {entry.main.attributes.titles.en_us || entry.main.attributes.titles.en}
                    </p>
                    <p className="fon w-[600px] ml-10 mt-[12px] text-sm text-white">
                      {(entry.mangadex.data[0].attributes.description?.en || '').length > 450
                        ? (entry.mangadex.data[0].attributes.description?.en || '').substring(0, 450) + '...'
                        : (entry.mangadex.data[0].attributes.description?.en || '')}
                    </p>
                    <div className="rating ml-10 mt-3">
                      <input type="radio" name="rating-1" className="mask mask-star" />
                      <input type="radio" name="rating-1" className="mask mask-star" defaultChecked />
                      <input type="radio" name="rating-1" className="mask mask-star" />
                      <input type="radio" name="rating-1" className="mask mask-star" />
                      <input type="radio" name="rating-1" className="mask mask-star" />
                    </div>
                  </div>

                  <div className="w-fit ml-auto max-md:hidden">
                    <img
                      loading="lazy"
                      className="h-[40px] w-[40px] -mt-1 ml-auto"
                      src="https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg"
                      alt=""
                    />
                    <p className="fon text-white text-lg mt-1 mb-1 h-[40px]" align="right">
                      Score: {entry.main.attributes.averageRating}
                    </p>
                    <p className="fon text-white text-lg mt-1 mb-1 h-[40px]" align="right">
                      Ranked: #{entry.main.attributes.ratingRank}
                    </p>
                    <p className="fon text-white text-lg mt-1 mb-1 h-[40px]" align="right">
                      Members: {entry.main.attributes.favoritesCount}
                    </p>
                    <p className="fon text-white text-lg mt-1 mb-1 h-[40px]" align="right">
                      Type: {entry.main.type}
                    </p>
                    <p className="fon text-white text-lg mt-1 mb-1 h-[40px]" align="right">
                      Genre: Drama
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
