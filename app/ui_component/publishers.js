"use client"
import React from 'react';
import { useToast } from "@/components/ui/use-toast";
const Publishers = () => {
       const { toast } = useToast()
  return (
    <div className='w-[84%] ml-auto mr-auto rounded-lg h-[220px] 'onClick={() => {
       toast({
       title: "This Section is under development",
       description: "It will be available soon on MangaFusion",
       })
   }} >
     <p className="text-xl text-white fon">
                       By Top Publishers
                </p>
                <div className='w-full h-full flex mt-8 mb-5 '>
                   <div className=' w-[30%]  ml-auto mr-auto flex items-center justify-center border border-[#474747] rounded-lg'>
                          <img src='https://upload.wikimedia.org/wikipedia/en/b/b6/Seven_seas200.png' alt='' className='w-[120px] ' />
                   </div>
                   <div className=' w-[30%]  ml-auto mr-auto flex items-center justify-center border border-[#474747] rounded-lg'>
                          <img className='w-[325px] ' src='https://i.pinimg.com/originals/61/e4/f1/61e4f1016ba3e32b134ddca045f0a351.jpg' alt=''  />
                   </div> <div className=' w-[30%]  ml-auto mr-auto flex items-center justify-center border border-[#474747] rounded-lg'>
                          <img src='https://www.cdnlogo.com/logos/s/42/shogakukan.svg' alt='' className='w-[550px]'  style={{color:"white"}}/>
                   </div>
                </div>
    </div>
  );
};

export default Publishers;