"use client"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
export default function Carsoul() {
    return (
<>
<Carousel plugins={[
            
            Autoplay({
              delay: 5000,
            }),
          ]} className="w-full ">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="flex">
            <div className="w-[95%] mt-2 ml-auto mr-auto  rounded-xl h-[300px] overflow-hidden flex bg-blend-darken" >
        <div className="w-[100%] mt-2   rounded-xl h-[300px] overflow-hidden flex bg-blend-darken relative " >
        <img src="https://imyvybtnpcbilsvgelve.supabase.co/storage/v1/object/public/pfps/20-J7ANcxy_86KQe.jpg"  className="bg-blend-darken z-10 rotate-12 h-[500px] -mt-10 -ml-11 filter" style={{filter:"brightness(0.30)"}}/>
        <img src="https://imyvybtnpcbilsvgelve.supabase.co/storage/v1/object/public/pfps/17-C3x-WZjrHAUSU.jpg" className="bg-blend-darken z-0 mt-auto -mb-32 -ml-20 h-[450px] filter" style={{filter:"brightness(0.30)"}} />
        
        <img src="https://imyvybtnpcbilsvgelve.supabase.co/storage/v1/object/public/pfps/18-qle3JsNlJ7llU.jpg" style={{rotate:"-25deg",filter:"brightness(0.30)"}}  className=" bg-blend-darken -ml-32 -mt-36 z-10 h-[700px] filter" />
        <img src="https://imyvybtnpcbilsvgelve.supabase.co/storage/v1/object/public/pfps/16-DXRMWlKzyZZzm.jpg" style={{rotate:"10deg",filter:"brightness(0.30)"}} className="bg-blend-darken  -mr-32 -ml-32 -mt-24  z-0 h-[700px] filter" />
        <img src="https://imyvybtnpcbilsvgelve.supabase.co/storage/v1/object/public/pfps/14-YDsqxnnZ-C_Un.jpg"  className="bg-blend-darken -ml-10 -mt-20 z-10 h-[650px] filter" style={{filter:"brightness(0.30)"}} />
        
        <img src="https://imyvybtnpcbilsvgelve.supabase.co/storage/v1/object/public/pfps/19-fIQfVq3bMECRQ.jpg"  className="bg-blend-darken rotate-12 -ml-24 z-10 -mt-20 -mr-10 h-[620px] filter" style={{filter:"brightness(0.30)"}} />
        
        </div>
        <div className="z-20  w-[96.5%] h-[250px] -ml-[99%] mt-[25px] flex ">
            <div className=" h-[250px] w-[187px]  flex items-center justify-center"> 
             <img src="https://cdn.myanimelist.net/images/manga/3/235363l.jpg" className="" alt="" /> 
            </div>
             <div className=" w-[80%]">
             <p className=" fon text-2xl text-white ml-10 mt-2">Classroom of the Elite: Year 2</p>
             <p className=" fon w-[600px] ml-10 mt-[12px] text-sm text-white">As Kiyotaka Ayanokouji and his classmates begin their second-year life, changes are seen everywhere throughout Tokyo Metropolitan Advanced Nurturing High School. With the third-years having graduated and incoming first-years entering the school, alliances are well underway. Meanwhile, conflicts between classes continue to build as the class point totals draw close.
            Meanwhile, conflicts between classes continue to build as the class point totals draw close. With another special exam looming ahead, will Ayanokouji remain in the shadows, or will he finally enter the spotlight and help his class rise to the illustrious Class A?
            </p>
            </div>
        <div className=" w-fit ml-auto " >
         <img className="h-[40px] w-[40px] -mt-1 ml-auto" src="https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg" alt="" /> 
         <p className=" fon text-white text-lg mt-1 mb-1 h-[40px]" align="right">Score: 8.33</p>   
         <p className=" fon text-white text-lg mt-1 mb-1 h-[40px]" align="right">Ranked: #33</p>   
         <p className=" fon text-white text-lg mt-1 mb-1 h-[40px]" align="right">Members: 37,197</p>   
         <p className=" fon text-white text-lg mt-1 mb-1 h-[40px]" align="right">Type: Light Novel</p>   
         <p className=" fon text-white text-lg mt-1 mb-1 h-[40px]" align="right">Genre: Drama</p>   

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
</>
);
}
