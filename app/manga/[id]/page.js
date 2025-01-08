import axios from 'axios';
import Navbar from '@/app/ui_component/navbar';
import { Separator } from '@/components/ui/separator';
import NewsComponent from '@/app/ui_component/news';
import Footer from '@/app/ui_component/footer';
import ABookDataClient from '@/app/ui_component/BookDataClient';


export default async function Home({ params }) {
    async function fetchExternalData() {
        const response1 = await fetch(`https://api.jikan.moe/v4/manga/${params.id}/full`);
        const datax = await response1.json();
        const titleEn = datax.data?.title_english;
        const titleEnUs = datax.data?.title;
        const searchcrit1 = titleEn ? titleEn.toLowerCase() : titleEnUs ? titleEnUs.toLowerCase() : '';
        const ebooks_yesno = "no";
        const subject = "manga";
        const onderwerp = "manga";
        const binding = "paperback";
        // Fetch data from ABC API
        const response = await axios.post('https://abc.nl/api/advanced_search_results/search', new URLSearchParams({
            searchcrit1,
            
            
            onderwerp,
            
        }));
        let items = response.data.items;
        const uniqueItems = [];
        const isbnSet = new Set();
        let sel_publisher = '';

        for (const item of items) {
            if (!isbnSet.has(item.isbn)) {
                isbnSet.add(item.isbn);
                uniqueItems.push(item);
                if (item.title?.toLowerCase().includes(`${searchcrit1}, vol.`)) {
                    sel_publisher = item.publisher;
                }
            }
        }

       const processedItems =  uniqueItems.sort((a, b) => a.pubdate_sort.localeCompare(b.pubdate_sort));
       let audiobookData = null;
       if (datax.data?.type === 'Light Novel'|| datax.data?.type === 'Novel') {
           try {
               const response2 = await axios.get(`https://global.bookwalker.jp/louis-api/autocomplete/?category=&term=${titleEn}`);
               const results = response2.data;
               const audiobook = results.find(item => item.type === 1 && item.value.includes("[AUDIOBOOK]"));
               if (audiobook) {
               
                   const typeId = audiobook.typeId;
                   const audiobookResponse = await ABookDataClient(audiobook.typeId)
                   audiobookData = audiobookResponse;
                  
               }
           } catch (error) {
               console.error("Error fetching audiobook data:", error);
           }
       }

  


        

        return { datax, processedItems, sel_publisher,uniqueItems, audiobookData };
    }

    const { datax, processedItems, sel_publisher,uniqueItems, audiobookData } = await fetchExternalData();
    processedItems.sort((a, b) => a.pubdate_sort.localeCompare(b.pubdate_sort));
    
    
    return (
        <>
           <div className="bg-[#161616]">
    <Navbar />
    {/* <p className='fon'>{JSON.stringify(datax)}</p>
  
    <p className="fon">Publisher found: {sel_publisher}</p> */}


<div className="mt-12 w-full bg-[#161616]">
<div className=" w-[95%] ml-auto mr-auto flex bg-[#161616]">
        <div className="bg-[#161616]">
        <img className="w-[180px] ml-auto sm:hidden visible mr-auto mb-10" src={datax?.data?.images?.webp?.large_image_url || 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'} alt="Book Cover" />
        <p className="fon text-3xl">{datax?.data?.title_english || datax?.data?.title}</p>
        <p className="fon text-xs mt-1 mb-1.5">{datax?.data?.type}</p>
        <p className="fon text-xs sm:w-[600px] w-[100%] ">{(datax.data?.synopsis)?.substring(0,400)}</p>
        <div className="w-full  mt-4 flex">
        
          <div className=" h-[100px] w-full  mt-2 bg-[#161616]"><div className="rating">
  <input type="radio" name="rating-1" className="mask mask-star" />
  <input type="radio" name="rating-1" className="mask mask-star" defaultChecked />
  <input type="radio" name="rating-1" className="mask mask-star" />
  <input type="radio" name="rating-1" className="mask mask-star" />
  <input type="radio" name="rating-1" className="mask mask-star" />
</div>
<div>
<p className="fon text-xs mt-1 ">Rated by {datax.data?.scored_by} Users {datax.data?.score}</p>

<div className="flex">
<div className="bg-[#212121] mt-2.5 mr-1 rounded-lg border-4 border-[#5c5c5c]">
<p className="fonx w-[100px] text-[#5c5c5c] text-xs mt-1 mb-1 " align="center">{'English'}</p>
</div>

<div className="w-[110px] ml-1 bg-[#212121] mt-2.5  rounded-lg border-4 border-[#5c5c5c]">
<p className="fonx text-[#5c5c5c] text-xs mt-1 mb-1 " align="center">{'Paperback'}</p>
</div>

</div>
</div>

</div>
        </div>
        <div className="mt-5  w-full flex bg-[#161616]">
  <img className=" mr-3 w-[35px]" src="https://anilist.co/img/icons/android-chrome-512x512.png" alt="" />
  <img className=" mr-3 w-[35px]" src="https://upload.wikimedia.org/wikipedia/commons/7/7a/MyAnimeList_Logo.png" alt="" />
  <img className=" mr-3 w-[35px]" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ03fsAE4oDU3K9-MHWWa7zufXmKKTZMArag&s" alt="" />
  <img className=" mr-3 w-[35px]" src="https://play-lh.googleusercontent.com/UNSg6fu9g6iScANPmlFV_vZyS1308qYUtPhPSAlH7V5pt8aqVrpX5LrNisWZgpfbVt8" alt="" />

  


</div>

        </div>
                    <img className="w-[210px] ml-auto hidden sm:block" src={datax.data?.images?.webp?.large_image_url || 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'} alt="Book Cover" />
                </div>
                </div>
                <Separator className="w-[95%] ml-auto mr-auto bg-[#5c5c5c] mt-8" />

<div className=" bg-[#161616]">
<p className="fon text-sm w-[95%] ml-auto mr-auto mt-4">{datax.data?.synopsis}</p></div>
</div>
<div className='bg-[#161616] h-12'></div>
<div className='bg-[#161616] '>
<div className="bg-[#212121] sm:visible  hidden  rounded-lg border-4 border-[#474747] w-[95%] h-fit min-h-[55px] flex flex-col sm:flex-row items-center justify-center mx-auto">
 <div className='w-[75%] flex items-center justify-center ml-auto mr-auto'>
  <div className="h-[35px] w-[95%] sm:w-[200px] ml-2 mr-2 flex items-center justify-center">
    <span className="material-icons fon mr-2" style={{fontSize:"30px"}}>book</span>
    <p className="fon text-sm">Status:{" "+datax.data?.status}</p>
  </div>
  <div className="h-[35px] w-[95%] sm:w-[200px] ml-2 mr-2 flex items-center justify-center">
    <span className="material-icons fon mr-2" style={{fontSize:"30px"}}>category</span>
    <p className="fon text-sm">Score: {" "+datax.data?.score}</p>
  </div>
  <div className="h-[35px] w-[95%] sm:w-[200px] ml-2 mr-2 flex items-center justify-center">
    <span className="material-icons fon mr-2" style={{fontSize:"30px"}}>publish</span>
    <p className="fon text-sm">From: {" "+datax.data?.serializations[0]?.name || "N/A"}</p>
  </div>
  <div className="h-[35px] w-[95%] sm:w-[200px] ml-2 mr-2 flex items-center justify-center">
    <span className="material-icons fon mr-2" style={{fontSize:"30px"}}>event</span>
    <p className="fon text-sm">Release: {" "+datax.data?.published.prop?.from.month+" - "+datax.data?.published?.prop?.from?.year}</p>
  </div>
  <div className="h-[35px] w-[95%] sm:w-[200px] ml-2 mr-2 flex items-center justify-center">
    <span className="material-icons fon mr-2" style={{fontSize:"30px"}}>straighten</span>
    <p className="fon text-sm">Status: {" "+datax?.data?.status}</p>
  </div>
  <div className="h-[35px] w-[95%] sm:w-[200px] ml-2 mr-2 flex items-center justify-center">
    <span className="material-icons fon mr-2" style={{fontSize:"30px"}}>translate</span>
    <p className="fon text-sm">English (Paperback)</p>
  </div></div>
</div>
<div className='h-5 bg-[#161616]'></div>
<div className=" sm:visible  hidden  rounded-lg border-4 border-[#474747] w-[95%] h-fit min-h-[55px] sm:flex flex-col sm:flex-row items-center justify-center mx-auto">
  <div className="h-[35px] w-full sm:w-[200px] ml-2 mr-2 flex items-center justify-center">
    <span className="material-icons fon mr-2" style={{fontSize:"30px"}}>book</span>
    <p className="fon text-sm">Manga Score: {" "+datax?.data?.score}</p>
  </div>
  <div className="h-[35px] w-full sm:w-[200px] ml-2 mr-2 flex items-center justify-center">
    <span className="material-icons fon mr-2" style={{fontSize:"30px"}}>category</span>
    <p className="fon text-sm  ">From: {" "+datax?.data?.serializations[0]?.name || "N/A"}</p>

  </div>
  <div className="h-[35px] w-full sm:w-[200px] ml-2 mr-2 flex items-center justify-center">
    <span className="material-icons fon mr-2" style={{fontSize:"30px"}}>scale</span>
    <p className="fon text-sm">Released On: {" "+datax?.data?.published?.prop?.from?.month+" - "+datax?.data?.published?.prop?.from?.year}</p>
  </div>
  <div className="h-[35px] w-full sm:w-[200px] ml-2 mr-2 flex items-center justify-center">
    <span className="material-icons fon mr-2" style={{fontSize:"30px"}}>event</span>
    <p className="fon text-sm">Status Now: {" "+datax.data?.status}</p>
  </div>
  <div className="h-[35px] w-full sm:w-[200px] ml-2 mr-2 flex items-center justify-center">
    <span className="material-icons fon mr-2" style={{fontSize:"30px"}}>straighten</span>
    <p className="fon text-sm">Total {processedItems.length} Books</p>
  </div>
  <div className="h-[35px] w-full sm:w-[200px] ml-2 mr-2 flex items-center justify-center">
    <span className="material-icons fon mr-2" style={{fontSize:"30px"}}>translate</span>
    <p className="fon text-sm">English (Paperback)</p>
  </div>
</div>
<br />
<Separator className="w-[95%] ml-auto mr-auto bg-[#5c5c5c] mt-3" />
<br />
<p className="fon text-3xl  w-[95%] mt-2 ml-auto mr-auto">Volumes</p>

<div className="ml-auto mr-auto w-[95%] mt-10 grid  grid-flow-col gap-6 ">
<div className="fon grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-8 gap-4 mt-4 bg-[#161616]">

{processedItems

  // .sort((a, b) => {
  //   // Extract numbers for sorting
  //   const numA = parseInt(a.title.match(/\d+$/));
  //   const numB = parseInt(b.title.match(/\d+$/));
  //   return numA - numB; // Sort in ascending order
  // })
  .slice(0, 150)
  .map((item, index) => (
    <a key={index} href={'/volume/'+item.isbn}>
      <div key={index} className="">
        <img src={"https://abc.nl"+item.cover.slice(0, -3) + '300'} alt={item?.title} className="rounded-sm w-[175px] ml-auto mr-auto h-auto mb-1.5" />
        <h3 className="fon w-full text-xs" align='center'>{item?.title}</h3>
      </div>
    </a>
  ))
}

    </div>
</div>
<br />

<Separator className="w-[95%] ml-auto mr-auto bg-[#5c5c5c] mt-3" />
<br />

{(datax.data?.type === 'Light Novel' || datax.data?.type === 'Novel') && (
  <>
    <p className="fon text-3xl w-[95%] mt-5 mb-3 ml-auto mr-auto">Audiobooks</p>
    <br />
    {audiobookData && (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-7 w-[95%] ml-auto mr-auto">
        {audiobookData.map((item, index) => {
          const url = new URL(item.link);
          const id = url.pathname.split('/').filter(Boolean).pop();
          return (
            <a href={`/audiobook/${id}`} key={index}>
              <div className="rounded-lg">
                <img src={item.image} alt={item.title} className="w-full h-auto mb-2" />
                <h3 className="fon text-lg">{item.title}</h3>
              </div>
            </a>
          );
        })}
      </div>
    )}
    <br />
    <Separator className="w-[95%] ml-auto mr-auto bg-[#5c5c5c] mt-3" />
    <br />
  </>
)}
{/* <Separator className="w-[95%] ml-auto mr-auto bg-[#5c5c5c] mt-3" /> */}
<br />
<div className='w-[95%] ml-auto mr-auto'>
<NewsComponent />
</div>
<br />
<Footer />
</div>


        </>
    );
}
