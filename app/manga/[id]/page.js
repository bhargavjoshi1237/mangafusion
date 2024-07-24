import Carsoul from "@/app/ui_component/carsoul_bg";
import TopPublishing from "@/app/ui_component/top_publishing";
import GridX from "@/app/ui_component/grid";
import Navbar from "@/app/ui_component/navbar";
export default async function Home({ params }) {
    async function fetchExternalData() {
        // const supabase = createClient();
        // const response = await fetch(`https://api.jikan.moe/v4/manga/${params.id}/full`);
        // const datax = await response.json();
        // const { data: supabaseData, error } = await supabase
        // .from('w')
        // .select();
        // return {datax,supabaseData};
    }
 

  // const {datax, supabaseData } = await fetchExternalData();
  
  return (
    <>
     {/* <p className="text-white">{JSON.stringify(datax)}</p> */}
   <Navbar />
   <Carsoul />
   <TopPublishing />
   <GridX />
      </>
  );
}
