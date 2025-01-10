export const runtime = 'edge';

import { createClient } from "./supabase";
import { Homecontainer } from "./ui_component/homecontainer";

export default async function Home() {
  async function fetchExternalData() {
    const startTime = performance.now();
    const supabase = createClient();
    try {
      const { data, error } = await supabase
        .from('all_cash')
        .select('*')
        .order('name', { ascending: true });
      const endTime = performance.now();
      const responseTime = (endTime - startTime).toFixed(2);
      console.log(`Supabase fetch took ${responseTime}ms`);
      if (error) {
        console.error('Error fetching data:', error);
        return { data: [], responseTime }; 
      }
      return {data, responseTime};
    } catch (error) {
      const endTime = performance.now();
      console.error(`Fetch failed after ${(endTime - startTime).toFixed(2)}ms:`, error);
      return { data: [], responseTime: (endTime - startTime).toFixed(2) };
    }
  }

  const { data,responseTime } = await fetchExternalData();
  
  return (
    <>
    <Homecontainer print={false} data={data} res={responseTime} />
    </>
  );
}
