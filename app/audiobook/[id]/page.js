import Footer from "@/app/ui_component/footer";
import Navbar from "@/app/ui_component/navbar";
import NewsComponent from "@/app/ui_component/news";
import { Separator } from "@/components/ui/separator";
import fetchAndFindAudioBookByVolume from "@/app/ui_component/bookwalkeraudiobook";
import AudioPlayer from "./audioplayer";


export const metadata = {
  title: "Manga Fusion",
};

export default async function Home({ params }) {
    async function fetchExternalData() {
        try {
          const [datax] = await Promise.all([
            fetchAndFindAudioBookByVolume(params.id)
          ]);
          console.log(datax.title);
          return datax;
        } catch (error) {
          console.error('Error fetching external data:', error);
          return null;
        }
      }

  const datax = await fetchExternalData();
  const formatDuration = (duration) => {
    const [hours, minutes] = duration.split(':').map(Number);
    return `${hours} Hr ${minutes} Mins`;
  };
  const volumeNumber = (() => {
    const volIndex = datax?.title?.indexOf("Vol.");
    return parseInt(volIndex !== -1 ? datax?.title?.substring(volIndex + 4).trim() : parseInt(datax?.title?.split(" ")[datax?.title?.split(" ")?.length - 1]));
  })();
  const extractVolumeNumber = (title) => {
    if (!title) return null;
    const match = title.match(/Vol\.\s*(\d+)/);
    return match ? match[1] : null;
  };
  return (
    <>
      <div className="bg-[#161616] overflow-hidden">
        <Navbar />
        {/* <p className="fon">{JSON.stringify(datax)}</p> */}
        <div className="mt-12 w-full">
          <div className="w-[95%] ml-auto mr-auto flex">
            <div>
              <img className="w-[180px] ml-auto sm:hidden visible mr-auto mb-10" src={datax?.image || "https://placehold.co/600x400"} alt="Book Cover" />
            
              <p className="fon text-3xl">{datax?.title}</p>
              <p className="fon text-xs mt-1 mb-1.5">{datax?.tableDetails?.Publisher}</p>
              <p className="fon text-xs sm:w-[600px] w-[100%]">{(datax?.synopsisText)?.substring(0, 400)}</p>
              <div className="w-full mt-4 flex">
                <div className="bg-[#212121] h-[120px] w-[85px] rounded-lg border-4 border-[#5c5c5c]">
                  <div>
                    <p className="fonx text-4xl text-center mt-5 mb-1.5 text-[#5c5c5c]">{extractVolumeNumber(datax?.title) || 0}</p>
                    <p className="fonx text-[11px] text-center mt-5 text-[#5c5c5c]">VOLUME</p>
                  </div>
                </div>
                <div className="h-[100px] w-full ml-4">
                  <div className="rating">
                    <input type="radio" name="rating-1" className="mask mask-star" />
                    <input type="radio" name="rating-1" className="mask mask-star" defaultChecked />
                    <input type="radio" name="rating-1" className="mask mask-star" />
                    <input type="radio" name="rating-1" className="mask mask-star" />
                    <input type="radio" name="rating-1" className="mask mask-star" />
                  </div>
                  
                  <div>
                    <div className="flex">
                      <div className="bg-[#212121] mt-2.5 mr-1 rounded-lg border-4 border-[#5c5c5c] flex items-center justify-center">
                        <p className="fonx w-[100px] text-[#5c5c5c] text-xs mt-1 mb-1" align="center">{"English"}</p>
                      </div>
                      <div className="w-fit ml-1 bg-[#212121] mt-2.5 rounded-lg border-4 border-[#5c5c5c]">
                        <p className="fonx pl-4 pr-4 text-[#5c5c5c] text-xs mt-1 mb-1" align="center">{"Unbridged Audiobook"}</p>
                      </div>
                    </div>
                    {/* <TrackPriceDialog ISBN={params.id} current_price={datax?.labelContent} platform={"bookswagon"} img={dataxx?.cover || datax?.imgSrc} name={datax?.title} /> */}
                  </div>
                </div>
              </div>
              <div className="mt-5 w-full flex">
                <img className="mr-3 w-[35px]" src="https://anilist.co/img/icons/android-chrome-512x512.png" alt="" />
                <img className="mr-3 w-[35px]" src="https://upload.wikimedia.org/wikipedia/commons/7/7a/MyAnimeList_Logo.png" alt="" />
                <img className="mr-3 w-[35px]" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ03fsAE4oDU3K9-MHWWa7zufXmKKTZMArag&s" alt="" />
                <img className="mr-3 w-[35px]" src="https://play-lh.googleusercontent.com/UNSg6fu9g6iScANPmlFV_vZyS1308qYUtPhPSAlH7V5pt8aqVrpX5LrNisWZgpfbVt8" alt="" />
              </div>
              <br />
              <div className="w-[95%] ml-auto mr-auto flex items-center justify-center sm:hidden">
  <AudioPlayer src={datax?.audioTrialSrc} />
</div>
            </div>
            
            <div className="ml-auto sm:block   hidden">
            <img className="w-[270px] h-[270px] ml-auto hidden sm:block" src={datax?.image || datax?.imgSrc} alt="Book Cover" />
            
            <div className="w-[270px]">
            <AudioPlayer src={datax?.audioTrialSrc} />

            </div>
              </div>
          </div>
          <Separator className="w-[95%] ml-auto mr-auto bg-[#5c5c5c] mt-8" />
        </div>
        <div>
          <p className="fon text-sm w-[95%] ml-auto mr-auto mt-4">{datax?.synopsisText}</p>
        </div>
        
        <div className="sm:visible hidden mt-5 rounded-lg border-4 border-[#474747] w-[95%] h-fit min-h-[55px] sm:flex flex-col sm:flex-row items-center justify-center mx-auto">
          <div className="h-[35px] w-full sm:w-[200px] ml-2 mr-2 flex items-center justify-center">
            <span className="material-icons fon mr-2" style={{ fontSize: "30px" }}>book</span>
            <p className="fon text-sm">Translate: {datax.tableDetails.Translatedby || "N/A"}</p>
          </div>
          <div className="h-[35px] w-fit  ml-2 mr-2 flex items-center justify-center">
            <span className="material-icons fon mr-2" style={{ fontSize: "30px" }}>category</span>
            <p className="fon text-sm">Publisher: {datax?.tableDetails?.Publisher}</p>
          </div>
          <div className="h-[35px] w-full sm:w-[200px] ml-2 mr-2 flex items-center justify-center">
            <span className="material-icons fon mr-2" style={{ fontSize: "30px" }}>scale</span>
            <p className="fon text-sm">Weight: 228 Gm</p>
          </div>
          <div className="h-[35px] w-fit ml-2 mr-2 flex items-center justify-center">
            <span className="material-icons fon mr-2" style={{ fontSize: "30px" }}>event</span>
            <p className="fon text-sm">Read by: {datax?.tableDetails?.Readby}</p>
          </div>
          <div className="h-[35px] w-full sm:w-[200px] ml-2 mr-2 flex items-center justify-center">
            <span className="material-icons fon mr-2" style={{ fontSize: "30px" }}>straighten</span>
            <p className="fon text-sm">Duration: {formatDuration(datax?.tableDetails?.Duration)}</p>
          </div>
          <div className="h-[35px] w-full sm:w-[200px] ml-2 mr-2 flex items-center justify-center">
            <span className="material-icons fon mr-2" style={{ fontSize: "30px" }}>translate</span>
            <p className="fon text-sm">English (AudioBook)</p>
          </div>
        </div>
        <br />
        <Separator className="w-[95%] ml-auto mr-auto bg-[#5c5c5c] mt-3" />
        <br />
        <p className="fon text-3xl w-[95%] mt-2 ml-auto mr-auto">Price Comparison [India]</p>
        <div className="ml-auto mr-auto w-[90%] mt-10 sm:w-[95%] flex sm:grid-cols-1 grid-flow-col gap-6 sm:flex flex-col sm:flex-row items-center justify-center mx-auto">
          <div className="h-[80px] rounded-lg border-4 border-[#5c5c5c] w-full">
            <div className="h-[80px] w-[90%] ml-auto mr-auto justify-center items-center flex">
            <img className="-mt-4 h-[45px] ml-1.5 mr-auto filter brightness-0 invert" src="https://upload.wikimedia.org/wikipedia/commons/d/d2/Audible_logo.svg" alt="" /> <a target="_blank" href={`https://www.audible.com/search?keywords=${(datax.title).replace("[AUDIOBOOK] ","")}`}><button className="btn btn-outline -mt-2">Fetch Price</button></a>
            </div>
          </div>
          <div className="h-[80px] rounded-lg border-4 border-[#5c5c5c] w-full">
            <div className="h-[80px] w-[90%] ml-auto mr-auto justify-center items-center flex">
              <img className="h-[15px] mr-auto -mt-2 " src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Barnes_%26_Noble_logo_%282021%29.svg" alt="" />
              {/* <div className="-mt-2 mr-2 border-green-500 rounded-lg w-[70px] h-[21px]" style={{ borderWidth: "3px" }}><p className="fon text-xs w-full" align="center">IN STOCK</p></div> */}
              <a target="_blank" href={`https://www.barnesandnoble.com/s/${(datax.title).replace("[AUDIOBOOK] ","")}/_/N-2sgz`}><button className="btn btn-outline -mt-2">Fetch Price</button></a>

            </div>
          </div>
          <div className="h-[80px] rounded-lg border-4 border-[#5c5c5c] w-full">
            <div className="h-[80px] w-[90%] ml-auto mr-auto justify-center items-center flex">
              <img className="h-[35px] mr-auto -mt-1" src="https://upload.wikimedia.org/wikipedia/commons/a/a2/Rakuten_Kobo_logo.svg" alt="" />
              <a target="_blank" href={`https://www.kobo.com/us/en/search?query=${(datax.title).replace("[AUDIOBOOK] ","")}&fcmedia=AudioBook`}><button className="btn btn-outline -mt-2">Fetch Price</button></a>
            </div>
          </div>
          <a href={`https://global.bookwalker.jp/${params.id}`} target="_blank" rel="noopener noreferrer" className="w-full">
  <div className="h-[80px] rounded-lg border-4 border-[#5c5c5c] w-full hover:border-green-500 transition-all duration-300 ease-in-out">
    <div className="h-[80px] w-[90%] ml-auto mr-auto justify-center items-center flex">
      <img className="h-[35px] w-[200px] mr-auto -mt-2" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfAPm8BNZyHeEov4V13nP1n-zuCzvzvcLFkw&s" alt="" />
      <p className="fon text-3xl -mt-2">{datax.price.replace("US", "") || "N/A"}</p>
    </div>
  </div>
</a>
        </div>
        <br />
        <Separator className="w-[95%] ml-auto mr-auto bg-[#5c5c5c] mt-3" />
        <br />
        <p className="fon text-3xl w-[95%] mt-2 ml-auto mr-auto">Simmiler Audiobooks</p>
        <div className="w-[95%] mt-10 items-center justify-center ml-auto mr-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
  {datax.recentlyViewedBooks.slice(0, 16).map((book, index) => (
    <a key={index} href={(book.link).replace("https://global.bookwalker.jp/", "/audiobook/")} className="text-lg fon block truncate">
      <div className="w-full items-center justify-center">
        <img className="w-[180px] h-[180px] object-cover mb-2 ml-auto mr-auto" src={book.image} alt={book.title} />
        <div className="w-[180px] ml-auto mr-auto">
          {(book.title).replace("[AUDIOBOOK] ", "")}
          <p className="text-sm fon">{book.price}</p>
        </div>
      </div>
    </a>
  ))}
</div>
        <br />
        <Separator className="w-[95%] ml-auto mr-auto bg-[#5c5c5c] mt-3" />
        <br />
       
        <p className="fon text-3xl w-[95%] mt-2 ml-auto mr-auto">Best Selling Audiobooks</p>
        <div className="w-[95%] mt-10 items-center justify-center ml-auto mr-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
  {datax.recentlyViewedBooks
    .filter(book => book.title.includes("[AUDIOBOOK]"))
    .slice(16)
    .map((book, index) => (
      <a key={index} href={(book.link).replace("https://global.bookwalker.jp/","/audiobook/")} className="text-lg fon block truncate">
        <div className="w-full items-center justify-center">
          <img className="w-[180px] h-[180px] object-cover mb-2 ml-auto mr-auto" src={book.image} alt={book.title} />
          <div className="w-[180px] ml-auto mr-auto">
            {(book.title).replace("[AUDIOBOOK] ","")}
            <p className="text-sm fon">{book.price}</p>
          </div>
        </div>
      </a>
    ))}
</div>
        <br />
        <Separator className="w-[95%] ml-auto mr-auto bg-[#5c5c5c] mt-3" />
        <br />
        <div className="w-[95%] ml-auto mr-auto">
          <NewsComponent />
        </div>
        <br /><br />
        <Footer />
      </div>
    </>
  );
}