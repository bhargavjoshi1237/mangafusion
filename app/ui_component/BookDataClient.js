import cheerio from 'cheerio';

async function fetchAndFindAudioBookByVolume(typeId) {
  try {

    // Fetch series page HTML
    const seriesUrl = `https://global.bookwalker.jp/series/${typeId}/`;
    const seriesResponse = await fetch(seriesUrl);
    if (!seriesResponse.ok) {
      throw new Error(`HTTP error! status: ${seriesResponse.status}`);
    }
    const seriesHtml = await seriesResponse.text();

    // Parse HTML using cheerio
    const $ = cheerio.load(seriesHtml);
    const tileList = $("ul.o-tile-list");
    if (!tileList.length) {
      console.log("Could not find ul.o-tile-list");
      return null;
    }

    const bookData = [];
    const listItems = tileList.find('li.o-tile');

    listItems.each((index, listItem) => {
      const imageElement = $(listItem).find('img.lazy');
      const imageUrl = imageElement.length ? imageElement.data('srcset').split(',')[1].trim().split(' ')[0] : null;
      const tagElements = $(listItem).find('ul.m-tile-tag-box li.m-tile-tag div');
      const tags = tagElements.map((i, tag) => $(tag).text().trim()).get();
      const titleElement = $(listItem).find('h2.a-tile-ttl a');
      const title = titleElement.length ? titleElement.text().trim() : null;
      const link = titleElement.length ? titleElement.attr('href') : null;
      const priceElement = $(listItem).find('div.a-tile-price');
      const price = priceElement.length ? priceElement.text().trim() : null;

      bookData.push({
        image: imageUrl,
        tags: tags,
        title: title,
        link: link,
        price: price,
      });
    });
    return bookData;

  } catch (error) {
    console.error('Error fetching or processing data:', error);
    return null;
  }
}

export function extractBookName(title) {
  if (!title) return null;
  const nameRegex = /(.+), Vol\. \d+/;
  const match = title.match(nameRegex);
  return match ? match[1].trim() : null;
}

export default async function ABookDataClient(typeId) {
  const result = await fetchAndFindAudioBookByVolume(typeId);
  
  return result;
}