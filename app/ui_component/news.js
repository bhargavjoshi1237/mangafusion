"use client"
import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const NewsComponent = () => {
    const [newsData, setNewsData] = useState([]);
    const [detailedNewsData, setDetailedNewsData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://consumet-api-quvx.onrender.com/news/ann/recent-feeds');
                const data = await response.json();
                setNewsData(data.slice(0, 12)); // Fetch only the first 10 items
            } catch (error) {
                console.error('Error fetching news data:', error);
            }
        };

        fetchData();
    }, []);

    // useEffect(() => {
    //     const fetchDetailedData = async () => {
    //         try {
    //             const detailedDataPromises = newsData.map(async (item) => {
    //                 const response = await fetch(`https://consumet-api-quvx.onrender.com/news/ann/info?id=${item.id}`);
    //                 const detailedItem = await response.json();
    //                 return detailedItem;
    //             });

    //             const detailedData = await Promise.all(detailedDataPromises);
    //             setDetailedNewsData(detailedData);
    //         } catch (error) {
    //             console.error('Error fetching detailed news data:', error);
    //         }
    //     };

    //     if (newsData.length > 0) {
    //         fetchDetailedData();
    //     }
    // }, [newsData]);

    return (
        <>
            <div className='ml-auto mr-auto flex text-2xl '>
                <p className='float-left fon'>Trending NEWS</p>
            </div>

            <Carousel plugins={[
                Autoplay({
                    delay: 4500,
                }),
            ]} className=" ml-auto mr-auto mt-7 mb-10 sm:hidden">
                <CarouselContent className="flex justify-between">
                    {Array.isArray(newsData) && newsData.reduce((pairs, newsItem, index) => {
                        if (index % 1 === 0) {
                            pairs.push([newsItem]);
                        } else {
                            pairs[pairs.length - 1].push(newsItem);
                        }
                        return pairs;
                    }, []).map((pair, index) => (
                        <CarouselItem key={index} className="flex w-full justify-between">
                            {pair.map((newsItem, pairIndex) => (
                                <Dialog key={newsItem.id}>
                                    <DialogTrigger>
                                        <div className='rounded-xl h-[230px] flex flex-col items-center justify-center' style={{ width: '100%', backgroundImage: `url("${newsItem.thumbnail}")` }}>
                                            <p className='fon text-sm text-center ml-3 mr-3 w-[90%]'>{(newsItem.title).slice(0, 50)}</p>
                                            <p className='fon text-sm mt-2'>{newsItem.uploadedAt}</p>
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent className="bg-[#161616] rounded-md">
                                        <DialogHeader>
                                            <DialogTitle className="fon text-sm">{newsItem.title}</DialogTitle>
                                            <p className='fon text-xs mb-2'>{newsItem.uploadedAt}</p>
                                            <br />
                                            <img className='rounded-xl max-h-[500px] w-[500px]' src={newsItem.thumbnail} alt="" />
                                            <br />
                                            <p className='fon' id='intro' style={{ fontSize: "15px" }}>{detailedNewsData[pairIndex + index * 3]?.intro}</p>
                                            <p className='fon' id='DESCRIPTION' style={{ fontSize: "10px" }}>
                                                {(detailedNewsData[pairIndex + index * 3]?.description)?.slice(0, 500)}
                                            </p>
                                            <br />
                                            <button className='btn btn-outline w-1/4' onClick={() => window.open(newsItem.url, '_blank')} rel="noreferrer">Source</button>
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>
                            ))}
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
            <Carousel plugins={[
    Autoplay({
        delay: 4500,
    }),
]} className="hidden md:block ml-auto mr-auto mt-7 mb-10">
                <CarouselContent className="flex justify-between ">
                    {Array.isArray(newsData) && newsData.reduce((pairs, newsItem, index) => {
                        if (index % 4 === 0) {
                            pairs.push([newsItem]);
                        } else {
                            pairs[pairs.length - 1].push(newsItem);
                        }
                        return pairs;
                    }, []).map((pair, index) => (
                        <CarouselItem key={index} className="flex w-full justify-between">
                            {pair.map((newsItem, pairIndex) => (
                                <Dialog key={newsItem.id}>
                                    <DialogTrigger>
                                        <div className='rounded-xl h-[230px] flex flex-col items-center justify-center' style={{ width: '100%', backgroundImage: `url("${newsItem.thumbnail}")` }}>
                                            <p className='fon text-sm text-center ml-3 mr-3 w-[90%]'>{(newsItem.title).slice(0, 50)}</p>
                                            <p className='fon text-sm mt-2'>{newsItem.uploadedAt}</p>
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent className="bg-[#161616]">
                                        <DialogHeader>
                                            <DialogTitle className="fon text-sm">{newsItem.title}</DialogTitle>
                                            <p className='fon text-xs mb-2'>{newsItem.uploadedAt}</p>
                                            <br />
                                            <img className='rounded-xl max-h-[500px] w-[500px]' src={newsItem.thumbnail} alt="" />
                                            <br />
                                            <p className='fon' id='intro' style={{ fontSize: "15px" }}>{detailedNewsData[pairIndex + index * 3]?.intro}</p>
                                            <p className='fon' id='DESCRIPTION' style={{ fontSize: "10px" }}>
                                                {(detailedNewsData[pairIndex + index * 3]?.description)?.slice(0, 500)}
                                            </p>
                                            <br />
                                            <button className='btn btn-outline w-1/4' onClick={() => window.open(newsItem.url, '_blank')} rel="noreferrer">Source</button>
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>
                            ))}
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </>
    );
};

export default NewsComponent;
