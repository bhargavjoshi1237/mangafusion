import { createClient } from "./supabase";
import { Homecontainer } from "./ui_component/homecontainer";
export default async function Home() {
  async function fetchExternalData() {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('all_cash')
      .select('*')
      .order('name', { ascending: true })
    if (error) {
      console.error('Error fetching data:', error);
      return { data: [] }; 
    }

    return { data };
  }

  const { data } = await fetchExternalData();
  
  return (
    <>
    <Homecontainer data={data} />
    </>
  );
}
