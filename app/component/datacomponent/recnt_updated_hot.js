export default async function recent_updated_hot() {
  try {
    const response = await fetch("https://api.comick.io/chapter/?page=1&order=hot&type=manga");
    const data = await response.json();

    const titles = data.slice(0, 10).map(entry => entry.md_comics.title);

    const malIdsAndCoversAndUrls = await Promise.all(titles.map(async title => {
      const response = await fetch(`https://api.mangadex.org/manga?title=${encodeURIComponent(title)}&limit=1&includes[]=cover_art`);
      const data = await response.json();

      const malId = data.data[0]?.attributes.links.mal || null;
      const coverArt = data.data[0]?.relationships.find(rel => rel.type === 'cover_art');
      const coverUrl = coverArt ? `https://uploads.mangadex.org/covers/${data.data[0].id}/${coverArt.attributes.fileName}` : null;

      let amz = data.data[0]?.attributes.links.amz || null;
      if (amz) {
        amz = amz.replace(".jp", ".in");
      }
      const cdj = data.data[0]?.attributes.links.cdj || null;
      const ebj = data.data[0]?.attributes.links.ebj || null;
      const raw = data.data[0]?.attributes.links.raw || null;

      return { malId, coverUrl, amz, cdj, ebj, raw };
    }));

    const malIds = malIdsAndCoversAndUrls.map(item => item.malId).filter(id => id !== null);
    const coverUrls = malIdsAndCoversAndUrls.map(item => item.coverUrl).filter(url => url !== null);
    const amzUrls = malIdsAndCoversAndUrls.map(item => item.amz).filter(url => url !== null);
    const cdjUrls = malIdsAndCoversAndUrls.map(item => item.cdj).filter(url => url !== null);
    const ebjUrls = malIdsAndCoversAndUrls.map(item => item.ebj).filter(url => url !== null);
    const rawUrls = malIdsAndCoversAndUrls.map(item => item.raw).filter(url => url !== null);

    return { malIds, coverUrls, amzUrls, cdjUrls, ebjUrls, rawUrls };
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
