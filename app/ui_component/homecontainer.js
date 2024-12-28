import GridY from "./grid copy";
import AniGrid from "./anilist";
import Footer from "./footer";
import NewsComponent from "./news";
import Carsoul from "@/app/ui_component/carsoul_bg";
import TopPublishing from "@/app/ui_component/top_publishing";
import Navbar from "@/app/ui_component/navbar";
import GridX from "@/app/ui_component/grid";
import GridXXY from "./grid copy 2";
import Publishers from "./publishers";

export async function Homecontainer({data}) {
    return(
        <>
        <div  className="bg-[#161616] overflow-hidden ">
            
          <Navbar />
      <Carsoul data={data[0].json} />
      <TopPublishing data={data[1]} />
      {/* <div className="w-[80%] ml-auto mr-auto border border-[#474747] pb-5 pt-5">
      <div className="flex justify-center items-center">
      <img className="w-[200px]" src="https://media.tenor.com/A07O_FLvHegAAAAj/%EB%B6%88%EA%B9%80.gif" alt="" />
      <img  className="w-[200px] ml-5" src="https://media.tenor.com/YaJVnr_0CZoAAAAe/anime-sad.png" alt="" />
      </div>
      <h2 className="w-full ml-auto mr-auto text-white text-6xl  mt-12 text-center">Site is under maintenance!!!</h2>
      <h2 className="w-full ml-auto mr-auto text-white text-3xl  mt-6 text-center">Some Features may not work as expected!</h2>

      </div> */}
      <GridX data={data[0].json.trendingThisWeek} title={"Trending this week"} />
      <GridXXY kitsu={false} data={data[0].json.topUpcoming} title={"Top Upcoming Manga"} />
      <GridY kitsu={true} data={data[0].json.highestRated} title={"Top Publishing Manga"} />
      <Publishers />
      <br /><br /><br />
      <AniGrid kitsu={true} data={data[0].json.anilist} title={"Top Manga This Week"} />
      <div className="w-[85%] ml-auto mr-auto"><NewsComponent /></div>
      <Footer /></div>
        </>
    )
}