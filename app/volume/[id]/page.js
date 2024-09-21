import Footer from "@/app/ui_component/footer";
import Man from "@/app/ui_component/manga";
import Navbar from "@/app/ui_component/navbar";
import NewsComponent from "@/app/ui_component/news";
import { Separator } from "@/components/ui/separator";
import fetchISBNData from "@/app/ui_component/functionisbn";
import fetchBookswagonData from "@/app/ui_component/bookswagon";
import TrackPriceDialog from "@/app/ui_component/track";


export const metadata = {
  title: "Manga Fusion",
}
export default async function Home({ params }) {
  
    async function fetchExternalData() {
        // const response = await fetch(`https://t-5hly.onrender.com/bwd/${params.id}`);
        // const datax = await response.json();
        const datax = await fetchBookswagonData(params.id);
        
        // const responsex = await fetch(`https://t-5hly.onrender.com/isbn/${params.id}`);
        // const dataxx = await responsex.json();
        const dataxx = await fetchISBNData(params.id)
        return {datax,dataxx};
    }
 

  const {datax,dataxx } = await fetchExternalData();

  return (
    <>

    
    <div className="bg-[#161616] overflow-hidden">
   
      <Navbar />
      <div className="mt-12 w-full ">
      <div className=" w-[95%] ml-auto mr-auto flex">
        <div className="">
        <img className="w-[180px] ml-auto sm:hidden visible mr-auto mb-10" src={dataxx.cover || datax.imgSrc} alt="Book Cover" />
        <p className="fon text-3xl">{datax.title}</p>
        <p className="fon text-xs mt-1 mb-1.5">{datax.bookDetails.Publisher}</p>
        <p className="fon text-xs sm:w-[600px] w-[100%] ">{(datax.paragraphs).substring(0,400)}</p>
        <div className="w-full  mt-4 flex">
        <div className="bg-[#212121] h-[120px] w-[85px] rounded-lg border-4 border-[#5c5c5c]">
           <div>
           <p className="fonx text-4xl text-center mt-5 mb-1.5 text-[#5c5c5c]">
    {(() => {
        const volIndex = datax.title.indexOf("Vol.");
        return parseInt(volIndex !== -1 ? datax.title.substring(volIndex + 4).trim() : parseInt(datax.title.split(" ")[datax.title.split(" ").length - 1]));
    })()}
</p>

           <p className="fonx text-[11px]  text-center mt-5 text-[#5c5c5c]">VOLUME</p></div> 
          </div>
          <div className=" h-[100px] w-full  ml-4"><div className="rating">
  <input type="radio" name="rating-1" className="mask mask-star" />
  <input type="radio" name="rating-1" className="mask mask-star" defaultChecked />
  <input type="radio" name="rating-1" className="mask mask-star" />
  <input type="radio" name="rating-1" className="mask mask-star" />
  <input type="radio" name="rating-1" className="mask mask-star" />
</div>
<div>
{/* <p className="fon text-xs mt-1 ">Rated by 20012 Users 4.5</p> */}

<div className="flex">
<div className="bg-[#212121] mt-2.5 mr-1 rounded-lg border-4 border-[#5c5c5c]">
<p className="fonx w-[100px] text-[#5c5c5c] text-xs mt-1 mb-1 " align="center">{datax.bookDetails.Language}</p>
</div>

<div className="w-[110px] ml-1 bg-[#212121] mt-2.5  rounded-lg border-4 border-[#5c5c5c]">
<p className="fonx text-[#5c5c5c] text-xs mt-1 mb-1 " align="center">{datax.bookDetails.Binding}</p>
</div>

</div>
<TrackPriceDialog ISBN={params.id} current_price={datax.labelContent} platform={"bookswagon"} img={dataxx.cover || datax.imgSrc} name={datax.title} />


</div>

</div>
        </div>
        <div className="mt-5  w-full flex">
  <img className=" mr-3 w-[35px]" src="https://anilist.co/img/icons/android-chrome-512x512.png" alt="" />
  <img className=" mr-3 w-[35px]" src="https://upload.wikimedia.org/wikipedia/commons/7/7a/MyAnimeList_Logo.png" alt="" />
  <img className=" mr-3 w-[35px]" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ03fsAE4oDU3K9-MHWWa7zufXmKKTZMArag&s" alt="" />
  <img className=" mr-3 w-[35px]" src="https://play-lh.googleusercontent.com/UNSg6fu9g6iScANPmlFV_vZyS1308qYUtPhPSAlH7V5pt8aqVrpX5LrNisWZgpfbVt8" alt="" />

  


</div>

        </div>
         
        <img className="w-[210px] ml-auto hidden sm:block" src={dataxx.cover || datax.imgSrc} alt="Book Cover" />
                </div>
      <Separator className="w-[95%] ml-auto mr-auto bg-[#5c5c5c] mt-8" />
      
            </div>
            <div className=" ">
            <p className="fon text-sm w-[95%] ml-auto mr-auto mt-4">{datax.paragraphs}</p></div>
<div className=" sm:visible  hidden mt-5 rounded-lg border-4 border-[#474747] w-[95%] h-fit min-h-[55px] sm:flex flex-col sm:flex-row items-center justify-center mx-auto">
  <div className="h-[35px] w-full sm:w-[200px] ml-2 mr-2 flex items-center justify-center">
    <span className="material-icons fon mr-2" style={{fontSize:"30px"}}>book</span>
    <p className="fon text-sm">ISBN: 9781638581826</p>
  </div>
  <div className="h-[35px] w-full sm:w-[200px] ml-2 mr-2 flex items-center justify-center">
    <span className="material-icons fon mr-2" style={{fontSize:"30px"}}>category</span>
    <p className="fon text-sm">Publisher: Square Enix</p>
  </div>
  <div className="h-[35px] w-full sm:w-[200px] ml-2 mr-2 flex items-center justify-center">
    <span className="material-icons fon mr-2" style={{fontSize:"30px"}}>scale</span>
    <p className="fon text-sm">Weight: 228 Gm</p>
  </div>
  <div className="h-[35px] w-full sm:w-[200px] ml-2 mr-2 flex items-center justify-center">
    <span className="material-icons fon mr-2" style={{fontSize:"30px"}}>event</span>
    <p className="fon text-sm">Release: 14 Apr 2020</p>
  </div>
  <div className="h-[35px] w-full sm:w-[200px] ml-2 mr-2 flex items-center justify-center">
    <span className="material-icons fon mr-2" style={{fontSize:"30px"}}>straighten</span>
    <p className="fon text-sm">H: 208 W: 145  S:20</p>
  </div>
  <div className="h-[35px] w-full sm:w-[200px] ml-2 mr-2 flex items-center justify-center">
    <span className="material-icons fon mr-2" style={{fontSize:"30px"}}>translate</span>
    <p className="fon text-sm">English (Paperback)</p>
  </div>
</div>

<br />
<Separator className="w-[95%] ml-auto mr-auto bg-[#5c5c5c] mt-3" />
<br />
<p className="fon text-3xl  w-[95%] mt-2 ml-auto mr-auto">Price Comparison [India]</p>

<div className="ml-auto mr-auto w-[90%] mt-10 sm:w-[95%] flex sm:grid-cols-1  grid-flow-col gap-6 sm:flex flex-col sm:flex-row items-center justify-center mx-auto">


<div className=" h-[80px] rounded-lg border-4 border-[#5c5c5c] w-full">
<div className="   h-[80px] w-[90%] ml-auto mr-auto  justify-center items-center flex">
<img className="-mt-1 h-[25px] mr-auto" src="https://zeevector.com/wp-content/uploads/Amazon-Logo-White@zeevector.png" alt="" />
{/* <p className="fon text-4xl mt-1.5">{(await fetchAmazonData(params.id)).price} </p> */}
<a target="_blank" href={"https://www.amazon.in/s?k="+params.id}><button className="btn btn-outline -mt-2">Fetch Price</button></a>


</div>
</div>



<div className=" h-[80px] rounded-lg border-4 border-[#5c5c5c] w-full">
<div className="   h-[80px] w-[90%] ml-auto mr-auto  justify-center items-center flex">
<img className="h-[40px] mr-auto -mt-2" src="https://d2g9wbak88g7ch.cloudfront.net/staticimages/logo-new.png" alt="" />
<div className="-mt-2 mr-2 border-green-500 rounded-lg w-[70px] h-[21px]" style={{borderWidth:"3px"}}><p className="fon text-xs w-full" align="center">IN STOCK</p></div>
<p className="fon text-4xl -mt-2">{datax.labelContent} </p></div><div className="mt-0 h-[50px] w-[90%] ml-auto mr-auto  flex">

</div></div>

<div className=" h-[80px] rounded-lg border-4 border-[#5c5c5c] w-full">
<div className="   h-[80px] w-[90%] ml-auto mr-auto  justify-center items-center flex">
<img className="h-[45px] mr-auto -mt-2 -ml-16" src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/fkheaderlogo_exploreplus-44005d.svg" alt="" />
{/* <p className="fon text-4xl mt-1.5">{(await fetchAmazonData(params.id)).price} </p> */}
<a target="_blank" href={"https://www.flipkart.com/search?q="+params.id}><button className="btn btn-outline -mt-2">Fetch Price</button></a>
</div><div className="mt-0 h-[50px] w-[90%] ml-auto mr-auto  flex">

{/* <div className="ml-auto mt-2.5 border-green-500 rounded-lg w-[125px] h-[30px]" style={{borderWidth:"3px"}}><p className="fon w-full" align="center">IN STOCK</p></div> */}
</div></div><div className=" h-[80px] rounded-lg border-4 border-[#5c5c5c] w-full">
<div className="   h-[80px] w-[90%] ml-auto mr-auto  justify-center items-center flex">
<img className="h-[45px] mr-auto   -mt-2" src="https://www.crossword.in/cdn/shop/files/crossword_logo_small_bc561912-757f-49bc-b641-bab1dfb66c4e_small.svg" alt="" />
{/* <p className="fon text-4xl mt-1.5">{(await fetchAmazonData(params.id)).price} </p> */}
<a target="_blank" href={"https://www.crossword.in/pages/search?q="+params.id}><button className="btn btn-outline -mt-2">Fetch Price</button></a>
</div><div className="mt-0 h-[50px] w-[90%] ml-auto mr-auto  flex">

{/* <div className="ml-auto mt-2.5 border-green-500 rounded-lg w-[125px] h-[30px]" style={{borderWidth:"3px"}}><p className="fon w-full" align="center">IN STOCK</p></div> */}
</div></div>


</div>
<br />
<Separator className="w-[95%] ml-auto mr-auto bg-[#5c5c5c] mt-3" />
<br />
<p className="fon text-3xl  w-[95%] mt-2 ml-auto mr-auto">In This Serise</p>
<div className="w-[95%] ml-auto mr-auto mt-12 grid grid-cols-2 sm:grid-cols-1 gap-6 sm:flex flex-col sm:flex-row items-center justify-center mx-auto">
  {datax.bestsellerBooks.slice(9, 18).map((book, index) => (
    <div key={index} className="ml-auto mr-auto">
      <a href={`/volume/${book.link.split('/').pop()}`} >
  <Man imagex={book.image} name={book.name} id={book.link.split('/').pop()} />
</a>
    </div>
  ))}
</div>
<br />

<br />
<p className="fon text-3xl  w-[95%]  ml-auto mr-auto">Bestseller Manga</p>
<div className="w-[95%] ml-auto mr-auto mt-12 grid grid-cols-2 sm:grid-cols-1 gap-6 sm:flex flex-col sm:flex-row items-center justify-center mx-auto">
  {datax.bestsellerBooks.slice(0, 9).map((book, index) => (
    <div key={index} className="ml-auto mr-auto">
     <a href={`/volume/${book.link.split('/').pop()}`} >
  <Man imagex={book.image} name={book.name} id={book.link.split('/').pop()} />
</a>
    </div>
  ))}
</div>
<br />
<Separator className="w-[95%] ml-auto mr-auto bg-[#5c5c5c] mt-3" />
<br />
<div className="w-[95%] ml-auto mr-auto ">
<NewsComponent />
</div>
<br /><br />
<Footer />
      </div>  
      </>
  );
}
