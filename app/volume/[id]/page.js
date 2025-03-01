import Footer from "@/app/ui_component/footer";
import Man from "@/app/ui_component/manga";
import Navbar from "@/app/ui_component/navbar";
import NewsComponent from "@/app/ui_component/news";
import { Separator } from "@/components/ui/separator";
import fetchISBNData from "@/app/ui_component/functionisbn";
import fetchBookswagonData from "@/app/ui_component/bookswagon";
import TrackPriceDialog from "@/app/ui_component/track";
import BookDataClient from "@/app/ui_component/BookDataClient1";

export const metadata = {
  title: "Manga Fusion",
};

export const runtime = 'edge';

export default async function Home({ params }) {
  async function fetchExternalData() {
    const [datax, dataxx, bookData] = await Promise.all([
      fetchBookswagonData(params.id),
      fetchISBNData(params.id),
      fetchBookswagonData(params.id).then(data => BookDataClient(data?.title)),
    ]);

    return { datax, dataxx, bookData };
  }

  const { datax, dataxx, bookData } = await fetchExternalData();

  const volumeNumber = (() => {
    const volIndex = datax?.title?.indexOf("Vol.");
    return parseInt(volIndex !== -1 ? datax?.title?.substring(volIndex + 4).trim() : parseInt(datax?.title?.split(" ")[datax?.title?.split(" ")?.length - 1]));
  })();

  return (
    <>
      <div className="bg-[#161616] overflow-hidden">
        <Navbar />
        <div className="mt-12 w-full">
          <div className="w-[95%] ml-auto mr-auto flex">
            <div>

              <img className="w-[180px] ml-auto sm:hidden visible mr-auto mb-10" src={dataxx?.cover || datax?.imgSrc} alt="Book Cover" />
              <p className="fon text-3xl">{datax?.title}</p>
              <p className="fon text-xs mt-1 mb-1.5">Series: {datax?.bookDetails?.SeriesTitle}</p>
              <p className="fon text-xs sm:w-[600px] w-[100%]">{(datax?.paragraphs)?.substring(0, 400)}</p>
              <div className="w-full mt-4 flex">
                <div className="bg-[#212121] h-[120px] w-[85px] rounded-lg border-4 border-[#5c5c5c]">
                  <div>
                    <p className="fonx text-4xl text-center mt-5 mb-1.5 text-[#5c5c5c]">{volumeNumber}</p>
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
                      <div className="bg-[#212121] mt-2.5 mr-1 rounded-lg border-4 border-[#5c5c5c]">
                        <p className="fonx w-[100px] text-[#5c5c5c] text-xs mt-1 mb-1" align="center">{datax?.bookDetails?.Language}</p>
                      </div>
                      <div className="w-[110px] ml-1 bg-[#212121] mt-2.5 rounded-lg border-4 border-[#5c5c5c]">
                        <p className="fonx text-[#5c5c5c] text-xs mt-1 mb-1" align="center">{datax?.bookDetails?.Binding}</p>
                      </div>
                    </div>
                    <TrackPriceDialog ISBN={params.id} current_price={datax?.labelContent} platform={"bookswagon"} img={dataxx?.cover || datax?.imgSrc} name={datax?.title} />
                  </div>
                </div>
              </div>
              <div className="mt-5 w-full flex">
                <img className="mr-3 w-[35px]" src="https://anilist.co/img/icons/android-chrome-512x512.png" alt="" />
                <img className="mr-3 w-[35px]" src="https://upload.wikimedia.org/wikipedia/commons/7/7a/MyAnimeList_Logo.png" alt="" />
                <img className="mr-3 w-[35px]" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ03fsAE4oDU3K9-MHWWa7zufXmKKTZMArag&s" alt="" />
                <img className="mr-3 w-[35px]" src="https://play-lh.googleusercontent.com/UNSg6fu9g6iScANPmlFV_vZyS1308qYUtPhPSAlH7V5pt8aqVrpX5LrNisWZgpfbVt8" alt="" />
              </div>
            </div>
            <img className="w-[210px] ml-auto hidden sm:block" src={dataxx?.cover || datax?.imgSrc} alt="Book Cover" />
          </div>
          <Separator className="w-[95%] ml-auto mr-auto bg-[#5c5c5c] mt-8" />
        </div>
        <div>
          <p className="fon text-sm w-[95%] ml-auto mr-auto mt-4">{datax?.paragraphs}</p>
        </div>
        <div className=" sm:visible hidden mt-5 rounded-lg border-4 border-[#474747] w-[95%] h-fit min-h-[55px] sm:flex flex-col sm:flex-row items-center justify-between mx-auto">
          <div className="w-[75%] flex items-center justify-center ml-auto mr-auto">
          <div className="h-[35px] w-full min-w-fit ml-2 mr-2 flex items-center justify-center">
            <span className="material-icons fon mr-2" style={{ fontSize: "30px" }}>book</span>
            <p className="fon text-sm">ISBN: {datax.bookDetails.ISBN13}</p>
          </div>
          <div className="h-[35px] min-w-fit  ml-2 mr-2 flex items-center justify-center">
            <span className="material-icons fon mr-2" style={{ fontSize: "30px" }}>category</span>
            <p className="fon text-sm">Publisher:  {datax.bookDetails.Publisher}</p>
          </div>
          <div className="h-[35px] w-full min-w-fit ml-2 mr-2 flex items-center justify-center">
            <span className="material-icons fon mr-2" style={{ fontSize: "30px" }}>scale</span>
            <p className="fon text-sm">Weight:  {datax.bookDetails.Weight}</p>
          </div>
          <div className="h-[35px] w-full min-w-fit ml-2 mr-2 flex items-center justify-center">
            <span className="material-icons fon mr-2" style={{ fontSize: "30px" }}>event</span>
            <p className="fon text-sm">Release:  {datax.bookDetails.PublisherDate}</p>
          </div>
          <div className="h-[35px] w-full min-w-fit ml-2 mr-2 flex items-center justify-center">
            <span className="material-icons fon mr-2" style={{ fontSize: "30px" }}>straighten</span>
            <p className="fon text-sm">H: {(datax.bookDetails.Height).replace("mm","")} W: {(datax.bookDetails.Width).replace("mm","")} SW:{(datax.bookDetails.SpineWidth).replace("mm","")}</p>
          </div>
          <div className="h-[35px] w-full min-w-fit ml-2 mr-2 flex items-center justify-center">
            <span className="material-icons fon mr-2" style={{ fontSize: "30px" }}>translate</span>
            <p className="fon text-sm">English ({datax.bookDetails.Binding})</p>
          </div></div>
        </div>
        <br />
        <Separator className="w-[95%] ml-auto mr-auto bg-[#5c5c5c] mt-3" />
        <br />
        <p className="fon text-3xl w-[95%] mt-2 ml-auto mr-auto">Price Comparison [India]</p>
        <div className="ml-auto mr-auto w-[90%] mt-10 sm:w-[95%] flex sm:grid-cols-1 grid-flow-col gap-6 sm:flex flex-col sm:flex-row items-center justify-center mx-auto">
          <div className="h-[80px] rounded-lg border-4 border-[#5c5c5c] w-full">
            <div className="h-[80px] w-[90%] ml-auto mr-auto justify-center items-center flex">
              <img className="-mt-1 h-[25px] mr-auto" src="https://zeevector.com/wp-content/uploads/Amazon-Logo-White@zeevector.png" alt="" />
              <a target="_blank" href={`https://www.amazon.in/s?k=${params.id}`}><button className="btn btn-outline -mt-2">Fetch Price</button></a>
            </div>
          </div>
          <div className="h-[80px] rounded-lg border-4 border-[#5c5c5c] w-full">
            <div className="h-[80px] w-[90%] ml-auto mr-auto justify-center items-center flex">
              <img className="h-[40px] mr-auto -mt-2" src="https://d2g9wbak88g7ch.cloudfront.net/staticimages/logo-new.png" alt="" />
              <div className="-mt-2 mr-2 border-green-500 rounded-lg w-[70px] h-[21px]" style={{ borderWidth: "3px" }}><p className="fon text-xs w-full" align="center">IN STOCK</p></div>
              <p className="fon text-4xl -mt-2">{datax?.labelContent}</p>
            </div>
          </div>
          <div className="h-[80px] rounded-lg border-4 border-[#5c5c5c] w-full">
            <div className="h-[80px] w-[90%] ml-auto mr-auto justify-center items-center flex">
              <img className="h-[45px] mr-auto -mt-2 -ml-16" src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/fkheaderlogo_exploreplus-44005d.svg" alt="" />
              <a target="_blank" href={`https://www.flipkart.com/search?q=${params.id}`}><button className="btn btn-outline -mt-2">Fetch Price</button></a>
            </div>
          </div>
          <div className="h-[80px] rounded-lg border-4 border-[#5c5c5c] w-full">
            <div className="h-[80px] w-[90%] ml-auto mr-auto justify-center items-center flex">
              <img className="h-[35px] w-[200px] mr-auto -mt-2" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfAPm8BNZyHeEov4V13nP1n-zuCzvzvcLFkw&s" alt="" />
              <p className="fon text-4xl -mt-2">{bookData?.price?.replace("US", "") || "N/A"}</p>
            </div>
          </div>
        </div>
        <br />
        <Separator className="w-[95%] ml-auto mr-auto bg-[#5c5c5c] mt-3" />
        <br />
        <p className="fon text-3xl w-[95%] mt-2 ml-auto mr-auto">In This Series</p>
        <div className="w-[95%] ml-auto mr-auto mt-12 grid grid-cols-2 sm:grid-cols-1 gap-6 sm:flex flex-col sm:flex-row items-center justify-center mx-auto">
          {datax?.bestsellerBooks?.slice(9, 18)?.map((book, index) => (
            <div key={index} className="ml-auto mr-auto">
              <a href={`/volume/${book.link.split('/').pop()}`}>
                <Man imagex={book.image} name={book.name} id={book.link.split('/').pop()} />
              </a>
            </div>
          ))}
        </div>
        <br />
        <br />
        <p className="fon text-3xl w-[95%] ml-auto mr-auto">Bestseller Manga</p>
        <div className="w-[95%] ml-auto mr-auto mt-12 grid grid-cols-2 sm:grid-cols-1 gap-6 sm:flex flex-col sm:flex-row items-center justify-center mx-auto">
          {datax?.bestsellerBooks?.slice(0, 9)?.map((book, index) => (
            <div key={index} className="ml-auto mr-auto">
              <a href={`/volume/${book.link.split('/').pop()}`}>
                <Man imagex={book.image} name={book.name} id={book.link.split('/').pop()} />
              </a>
            </div>
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