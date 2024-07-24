export default async function mangadex_to_mal_id(slug){
    try {
        const response = await fetch("https://api.mangadex.org/manga/" + slug);
        const data = await response.json();
        const malId = data.data?.attributes?.links?.mal;
        console.log(data.data.attributes.links.mal);
        return malId;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}
