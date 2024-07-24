
export default async function recent_updated_new() {
    try {
      const response = await fetch("https://api.comick.io/chapter/?page=1&order=new&type=manga");
      const data = await response.json();
  
      const titles = data.slice(0, 10).map(entry => entry.md_comics.title);
      const malIds = await Promise.all(titles.map(async title => {
        const response = await fetch(`https://api.mangadex.org/manga?title=${encodeURIComponent(title)}&limit=1`);
        const data = await response.json();
        return data.data[0]?.attributes.links.mal || null; // Assuming the mal_id is in this structure
      }));
    
      return malIds;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }
  