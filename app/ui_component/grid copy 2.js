"use client"
import Man from "./manga";
import { useToast } from "@/components/ui/use-toast";

export default function GridXXY({ data, title, kitsu }) {
    const { toast } = useToast()
    return (
        <>
            <div className="w-[85%] mt-6 ml-auto mr-auto h-fit mb-1">
                <p className="text-xl text-white fon">
                    {title}
                </p>
                <div className="mt-10 items-center justify-center h-fit mb-1 hidden sm:flex -ml-3">
                    {Array.isArray(data) && data.length > 0 ? (
                        data.slice(0, 9).map((item, index) => {
                            return (
                                <div key={index} className="mb-8" id="if kitsu is true"
                                 onClick={() => {
                                    toast({
                                    title: "This Manga is not released yet",
                                    description: "It will be available soon on MangaFusion",
                                    })
                                }} >
                                  <Man
                                    key={index}
                                    name={item?.attributes?.titles?.en_us || item?.attributes?.titles?.en || item?.attributes?.titles?.en_jp}
                                    imagex={item?.attributes?.posterImage.original}
                                  />
                               
                              </div>
                              
                            );
                        })
                    ) : (
                        
                        data?.length === 0 ? (
                            <div 
                            className="border border-white rounded-md p-4 flex items-center justify-center w-full"
                            style={{ 
                                backgroundImage: 'url(https://dw9to29mmj727.cloudfront.net/sections/2016/24907-READ_header_2000x800_options_colours_grey30.png)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        >
                            <p className="text-center text-black" style={{ fontFamily: "open" }}>No manga available for this stage</p>
                        </div>
                        ) : (
                        <>
                            <Man name="No data available" imagex="https://raw.githubusercontent.com/bhargavjoshi1237/Anime-Alley/refs/heads/bhargavjoshi1237-patch-4/404.jpg" />
                            <Man imagex="https://raw.githubusercontent.com/bhargavjoshi1237/Anime-Alley/refs/heads/bhargavjoshi1237-patch-4/404.jpg" />
                            <Man imagex="https://raw.githubusercontent.com/bhargavjoshi1237/Anime-Alley/refs/heads/bhargavjoshi1237-patch-4/404.jpg" />
                            <Man imagex="https://raw.githubusercontent.com/bhargavjoshi1237/Anime-Alley/refs/heads/bhargavjoshi1237-patch-4/404.jpg" />
                            <Man imagex="https://raw.githubusercontent.com/bhargavjoshi1237/Anime-Alley/refs/heads/bhargavjoshi1237-patch-4/404.jpg" />
                            <Man imagex="https://raw.githubusercontent.com/bhargavjoshi1237/Anime-Alley/refs/heads/bhargavjoshi1237-patch-4/404.jpg" />
                            <Man imagex="https://raw.githubusercontent.com/bhargavjoshi1237/Anime-Alley/refs/heads/bhargavjoshi1237-patch-4/404.jpg" />
                            <Man imagex="https://raw.githubusercontent.com/bhargavjoshi1237/Anime-Alley/refs/heads/bhargavjoshi1237-patch-4/404.jpg" />
                            <Man imagex="https://raw.githubusercontent.com/bhargavjoshi1237/Anime-Alley/refs/heads/bhargavjoshi1237-patch-4/404.jpg" />
                        </>
                        )
                    )}
                </div>
                {Array.isArray(data) && data.length > 0 ? (
                        data.slice(0, 8).map((item, index) => {
                            return (
                                <div key={index} className="sm:hidden mt-10 items-center justify-center grid grid-cols-1 sm:grid-cols-2 h-fit mb-1 grid-cols-2 grid -ml-3">
                                <div key={index} className="mb-8"
                                onClick={() => {
                                    toast({
                                    title: "This Manga is not released yet",
                                    description: "It will be available soon on MangaFusion",
                                    })
                                }} 
                                >
                                     <Man
                                        key={index}
                                        name={item?.attributes?.titles?.en_us || item?.attributes?.titles?.en || item?.attributes?.titles?.en_jp}
                                        imagex={item?.attributes?.posterImage.original}
                                    />
                                </div></div>
                            );
                        })
                    ) : (

                        <div 
                        className="sm:hidden border border-white mt-8 bm-3 rounded-md flex items-center justify-center w-full"
                        style={{ 
                            backgroundImage: 'url(https://dw9to29mmj727.cloudfront.net/sections/2016/24907-READ_header_2000x800_options_colours_grey30.png)',
                            backgroundSize: 'cover',
                        }}
                    >
                        <p className="text-L  text-black  p-5"style={{ fontFamily: "open" }}>No manga available for this stage</p>
                    </div>
                            
                    )}
                
            </div>
        </>
    );
}