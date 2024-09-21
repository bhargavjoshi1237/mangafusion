"use client"
import React from 'react';

const Ani = ({ img ,id,title,synopsis, type,status, rateing,episodes}) => {

  const handleClick = () => {
    window.location.href = `/animez?id=${id}`;
  
  };

  return (
  


<>
<center><div className='fon ml-1 mt-7 mr-1' onClick={() => handleClick()}>

  {img ? (
<img className='' style={{ height:"257px" }} src={img} alt="" />
) : (
<div className="skeleton" style={{ width: "100%", height: "100%" }}></div>
)}
<p className="fon text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl" style={{ fontSize: "9.5px" }}>{title}</p>
{/* <div className='w-full h-[20px] bg-white mb-2 text-xs'><p className='fon' style={{color:"black"}}>{type}</p></div> */}
</div></center>

<div className='border ' style={{width:"200px", height:"fit-content", backgroundColor:"#212121"}}>
<p className="fon mt-2 mb-2 ml-2 mr-2" style={{fontSize:"10px", color:"black", backgroundColor:"white"}}>{type}</p>
  <div className='ml-2 mr-2 '><p align="left" className="text-sm mt-2 fon " style={{color:"white", margin: "0"}} >{title}</p>
  <p align="left" className="fon  mt-3   mr-2" style={{fontSize:"10px", color:"white", margin: "0"}}>{rateing}</p>
  <p align="left" className="fon text-xs mr-2 mt-4">
  {(synopsis ? synopsis.substring(0, 100) + "..." : "")}
</p>
 <p align="left" className="fon text-xs mt-2 mb-2  mr-2" style={{color:"white"}}>{status}</p>
</div>

{episodes && episodes.length > 0 ? (
 
            episodes.map((episode) => (

              <li key={episode.mal_id} className="ml-2 flex">
                <p className='text-sm' href={episode.url} target="_blank" rel="noopener noreferrer">{episode.title}</p>
                {episode.premium && <span className="ml-1"><p className='text-sm'>(P)</p></span>}
              </li>
            ))
          ) : (
           <></>
          )}
 

<div className="flex flex-col justify-between h-full">
  <div className="flex-1">
   <br />
  </div>
  <div className="flex">
    <button style={{width:"90%"}} className="btn ml-2 mb-2 mr-2 mt-auto">
<span style={{color:"white"}} className="material-icons"> bookmark_outline</span>
    </button>
  </div>
</div>

</div>
</>



  );
};

export default Ani;
