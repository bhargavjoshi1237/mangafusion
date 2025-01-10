'use client'
import Image from 'next/image';

export default function Man({ imagex, name = "No name available" }) {
    const truncatedName = name.length > 25 ? name.substring(0, 20) + '...' : name;

    const handleImageError = (e) => {
        console.log('Image failed to load:', imagex);
        e.target.src = "https://raw.githubusercontent.com/bhargavjoshi1237/mangafusion/refs/heads/master/4041.png";
        e.target.onerror = null;
    };

    // const handleImageLoad = () => {
    //     // console.log('Image loaded successfully:', imagex);
    // };

    return (
        <>
           <div className="ml-4 -mt-5">
           <Image 
                className="h-[235px] w-[163px] rounded-sm"
                src={imagex}
                width={163}
                height={235}
                alt={truncatedName}
                onError={handleImageError}
            />
            <p className="w-[163px] font text-xs fon text-white mt-2" align="center">
                {truncatedName}
            </p>
           </div>
        </>
    );
}