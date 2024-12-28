import cheerio from 'cheerio';

async function fetchAndFindBookByVolume(searchTerm, targetType, targetTitle) {
  try {
    // Fetch autocomplete data
    const autocompleteUrl = `https://global.bookwalker.jp/louis-api/autocomplete/?category=&term=${searchTerm}`;
    const autocompleteResponse = await fetch(autocompleteUrl);
    if (!autocompleteResponse.ok) {
      throw new Error(`HTTP error! status: ${autocompleteResponse.status}`);
    }
    const autocompleteData = await autocompleteResponse.json();

    // Find the item with the specified type in label
    const targetItem = autocompleteData.find(item => item.label && item.label.toLowerCase().includes(targetType.toLowerCase()));
    if (!targetItem || targetItem.type !== 1) {
      console.log(`No valid item found with type '${targetType}' in label.`);
      return null;
    }

    const typeId = targetItem.typeId;

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
      const priceElement = $(listItem).find('div.a-tile-price');
      const price = priceElement.length ? priceElement.text().trim() : null;

      bookData.push({
        image: imageUrl,
        tags: tags,
        title: title,
        price: price,
      });
    });

    const targetVolume = extractVolumeNumber(targetTitle);
    if (targetVolume == null) {
      console.log("Could not extract volume number.");
      return null;
    }

    const matchingBook = findMatchingBookByVolume(bookData, targetVolume);
    if (matchingBook) {
      console.log("Found the matching book:", matchingBook);
      return matchingBook;
    } else {
      console.log("No book matching the target volume was found.");
      return null;
    }

  } catch (error) {
    console.error('Error fetching or processing data:', error);
    return null;
  }
}

function extractVolumeNumber(title) {
  const volumeRegex = /Vol\. (\d+)/i;
  const match = title.match(volumeRegex);
  return match ? parseInt(match[1], 10) : null;
}

function findMatchingBookByVolume(bookData, targetVolume) {
  if (!bookData || bookData.length === 0) {
    return null;
  }

  return bookData.find(book => {
    const bookVolume = extractVolumeNumber(book.title);
    return bookVolume === targetVolume;
  }) || null;
}

export function extractBookName(title) {
  if (!title) return null;
  const nameRegex = /(.+), Vol\. \d+/;
  const match = title.match(nameRegex);
  return match ? match[1].trim() : null;
}

export default async function BookDataClient(targetTitle) {
  const searchTerm = extractBookName(targetTitle);
  const result = await fetchAndFindBookByVolume(searchTerm, "manga", targetTitle);
  console.log(searchTerm, "manga", targetTitle);
  return result;
}