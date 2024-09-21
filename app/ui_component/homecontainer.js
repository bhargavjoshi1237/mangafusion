import GridY from "./grid copy";
import AniGrid from "./anilist";
import Footer from "./footer";
import NewsComponent from "./news";
import Carsoul from "@/app/ui_component/carsoul_bg";
import TopPublishing from "@/app/ui_component/top_publishing";
import Navbar from "@/app/ui_component/navbar";
import GridX from "@/app/ui_component/grid";
import GridXXY from "./grid copy 2";

export async function Homecontainer({data}) {
    return(
        <>
        <div  className="bg-[#161616] overflow-hidden ">
          <Navbar />
      <Carsoul data={data[0].json} />
      <TopPublishing data={data[1]} />
      <GridX data={data[0].json.trendingThisWeek} title={"Trending this week"} />
      <GridXXY kitsu={false} data={data[0].json.topUpcoming} title={"Top Upcoming Manga"} />
      <GridY kitsu={true} data={data[0].json.highestRated} title={"Top Publishing Manga"} />
      <AniGrid kitsu={true} data={data[0].json.anilist} title={"Top Manga This Week"} />
      <div className="w-[85%] ml-auto mr-auto"><NewsComponent /></div>
      <Footer /></div>
        </>
    )
}