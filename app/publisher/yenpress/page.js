import axios from 'axios';
import Navbar from '@/app/ui_component/navbar';
import { fetchBookswagonSearchData } from "@/app/ui_component/publishers/sevenseas";
import { Separator } from '@/components/ui/separator';
import NewsComponent from '@/app/ui_component/news';
import Footer from '@/app/ui_component/footer';

export default async function Home({ params }) {
  async function fetchExternalData() {
    const { books, timeTaken } = await fetchBookswagonSearchData("yen-press");
    return { books, timeTaken };
  }

  const { books, timeTaken } = await fetchExternalData();
  return (
    <>
      <div className="bg-[#161616]">
        <Navbar />
        <div className="mt-12 w-full bg-[#161616]">
          <div className="w-[95%] ml-auto mr-auto flex bg-[#161616]">
            <div className="bg-[#161616]">
          
<img className="ml-auto sm:hidden visible mr-auto mb-10" src="https://upload.wikimedia.org/wikipedia/en/9/99/Yen_Press.png" alt="Book Cover" style={{ height: '100px' }} />

              <p className="fon text-3xl">Yen Press</p>
              <p className="fon text-xs mt-1 mb-1.5">Graphic Novels, Manga, and More</p>
              <p className="fon text-xs sm:w-[600px] w-[100%]">One of the preeminent
English-language comics
publishing houses in the world</p>
              <div className="w-full mt-4 flex">
                <div className="h-[100px] w-full mt-2 bg-[#161616]">
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
                        <p className="fonx w-[100px] text-[#5c5c5c] text-xs mt-1 mb-1" align="center">{'English'}</p>
                      </div>
                      <div className="bg-[#212121] mt-2.5 mr-1 rounded-lg border-4 border-[#5c5c5c]">
                        <p className="fonx w-[100px] text-[#5c5c5c] text-xs mt-1 mb-1" align="center">{'Light Novel'}</p>
                      </div>
                      <div className="w-[110px] ml-1 bg-[#212121] mt-2.5 rounded-lg border-4 border-[#5c5c5c]">
                        <p className="fonx text-[#5c5c5c] text-xs mt-1 mb-1" align="center">{'Paperback'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 w-full flex bg-[#161616]">
                <img className="mr-3 w-[35px]" src="https://anilist.co/img/icons/android-chrome-512x512.png" alt="" />
                <img className="mr-3 w-[35px]" src="https://upload.wikimedia.org/wikipedia/commons/7/7a/MyAnimeList_Logo.png" alt="" />
                <img className="mr-3 w-[35px]" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ03fsAE4oDU3K9-MHWWa7zufXmKKTZMArag&s" alt="" />
                <img className="mr-3 w-[35px]" src="https://play-lh.googleusercontent.com/UNSg6fu9g6iScANPmlFV_vZyS1308qYUtPhPSAlH7V5pt8aqVrpX5LrNisWZgpfbVt8" alt="" />
              </div>
            </div>
            <img className="w-[300px] h-[200px] ml-auto hidden sm:block" src="https://upload.wikimedia.org/wikipedia/fr/2/23/Yen_Press_logo.svg" alt="Book Cover" style={{ filter: "brightness(0) invert(1)" }} />
          </div>
        </div>
        <Separator className="w-[95%] ml-auto mr-auto bg-[#5c5c5c] mt-8" />
        <div className="bg-[#161616]">
          <p className="fon text-sm w-[95%] ml-auto mr-auto mt-4">KADOKAWA Corporation develops a broad range of businesses as a comprehensive entertainment company, including publishing, animation, and gaming, with a steady focus on creating intellectual property and expanding overseas. Hachette Book Group, a division of Hachette Livre (a Lagardère company), is a leading trade publisher made up of some of the strongest brands in the English-language publishing industry that also provides a wide range of custom distribution, fulfillment, digital, and sales services to third-party publishers.</p>
        </div>
        <br />
        <Separator className="w-[95%] ml-auto mr-auto bg-[#5c5c5c] mt-3" />
        <br />
        <p className="fon text-3xl w-[95%] mt-2 ml-auto mr-auto bg-[#161616]">Volumes</p>
        <div className="ml-auto mr-auto w-[95%] mt-10 grid grid-flow-col gap-6 bg-[#161616]">
          <div className="fon grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-8 gap-4 mt-4 bg-[#161616]">
            {books.map((book, index) => (
              <a key={index} href={'/volume/' + book.isbn}>
                <div key={index} className="">
                  <img src={book.image} alt={book?.name} className="rounded-sm h-[250px] ml-auto mr-auto mb-1.5" />
                  <h3 className="fon w-full text-xs" align='center'>{book.name}</h3>
                </div>
              </a>
            ))}
          </div>
        </div>
        <br />
        <Separator className="w-[95%] ml-auto mr-auto bg-[#5c5c5c] mt-3" />
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