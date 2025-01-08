import Carsoul from "@/app/ui_component/carsoul_bg";
import TopPublishing from "@/app/ui_component/top_publishing";
import Navbar from "@/app/ui_component/navbar";
import Publishers from "./publishers";
import NewsComponent from "./news";
import Footer from "./footer";
// import NewsComponent from "./news";
import { fetchBookDetails } from './digitalallfetch';
import DigitalGrid from "./digitalgrid";
import GridXXY from "./grid copy 2";

export async function Homecontainers({ data, print }) {
    const { ulDetails } = await fetchBookDetails();
    const indicesToInclude = [1, 3, 4, 8, 9];
    const titles = ["New Releases", "On Sale", "Top Upcoming - Pre-Order", "Monthly Ranking", "Free eBook - Sale"];
    const filteredUlDetails = ulDetails.filter((_, index) => indicesToInclude.includes(index + 1));

    const firstTwoUlDetails = filteredUlDetails.slice(0, 2);
    const remainingUlDetails = filteredUlDetails.slice(2);

    const processBooks = (ulDetail) => {
        let filteredBooks = ulDetail.books.filter(book => !book.tags.includes("Chapter"));
        if (filteredBooks.length < 8) {
            const chapterBooks = ulDetail.books.filter(book => book.tags.includes("Chapter"));
            filteredBooks = filteredBooks.concat(chapterBooks.slice(0, 8 - filteredBooks.length));
        }
        return filteredBooks.slice(0, 9); // Ensure exactly 8 entries
    };

    return (
        <>
            <div className="bg-[#161616] overflow-hidden">
                <Navbar print={print} />
                <Carsoul data={data[0].json} />
                <TopPublishing data={data[1]} />
                
                {firstTwoUlDetails.map((ulDetail, ulIndex) => {
                    const processedBooks = processBooks(ulDetail);
                    return (
                        <DigitalGrid key={ulIndex} title={titles[ulIndex]} data={{ books: processedBooks }} />
                    );
                })}

                <Publishers />
        {/* <GridXXY kitsu={false} data={""} title={"Top Light Novels"} /> */}

                {remainingUlDetails.map((ulDetail, ulIndex) => {
                    const processedBooks = processBooks(ulDetail);
                    return (
                        <DigitalGrid key={ulIndex + 2} title={titles[ulIndex + 2]} data={{ books: processedBooks }} />
                    );
                })}
                
                <div className="w-[85%] mt-5 ml-auto mr-auto"><NewsComponent /></div>
                <Footer />
            </div>
        </>
    );
}