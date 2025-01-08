import cheerio from 'cheerio';

async function fetchAndFindAudioBookByVolume(typeId) {
  try {
    // Fetch series page HTML
    const seriesUrl = `https://global.bookwalker.jp/${typeId}/`;
    const seriesResponse = await fetch(seriesUrl);
    if (!seriesResponse.ok) {
      throw new Error(`HTTP error! status: ${seriesResponse.status}`);
    }
    const seriesHtml = await seriesResponse.text();

    // Parse HTML using cheerio
    const $ = cheerio.load(seriesHtml);

    // Extract book details
    const bookDetails = {};
    const detailBookTitle = $('div.detail-book-title.clearfix');
    bookDetails.title = detailBookTitle.find('h1[itemprop="name"]').text().trim();
    bookDetails.synopsisText = $('p.synopsis-text').text().trim();
    bookDetails.synopsisCopyright = $('p.synopsis-copyright').text().trim();
    bookDetails.price = $('p.detail-price').text().trim();
    bookDetails.image = $('div.book-img img').attr('src');

    // Extract table details
    const tableDetails = {};
    $('table.product-detail tr').each((index, element) => {
      const key = $(element).find('th').text().trim().replace(/\s+/g, '');
      const value = $(element).find('td').text().trim();
      tableDetails[key] = value;
    });
    bookDetails.tableDetails = tableDetails;

    // Extract recently viewed books
    const recentlyViewedBooks = [];
    $('ul.book-list.clearfix.js-recentlyViewed li.book-item').each((index, element) => {
      const book = {};
      book.link = $(element).find('a').attr('href');
      book.image = $(element).find('img').attr('src');
      book.title = $(element).find('p.book-title').text().trim();
      book.price = $(element).find('p.price').text().trim();
      recentlyViewedBooks.push(book);
    });
    bookDetails.recentlyViewedBooks = recentlyViewedBooks;

    // Extract audio trial src
    bookDetails.audioTrialSrc = $('audio#audiobook-trial').attr('src');

    return bookDetails;

  } catch (error) {
    console.error('Error fetching or processing data:', error);
    return null;
  }
}

export default async function ABookDataClient(typeId) {
  const result = await fetchAndFindAudioBookByVolume(typeId);
  return result;
}