import axios from 'axios';
import cheerio from 'cheerio';

async function fetchBookswagonData(url) {
  try {
    // Fetch search results
    const searchResponse = await axios.get(`https://www.bookswagon.com/search-books/${url}`);
    const searchHtml = searchResponse.data;
    const $search = cheerio.load(searchHtml);
    
    // Extract first product URL from the search results
    const productSummaryDiv = $search('.product-summary');
    const firstAnchorTag = productSummaryDiv.find('a').first();
    const firstAnchorUrl = firstAnchorTag.attr('href');

    // Validate the firstAnchorUrl
    if (!firstAnchorUrl) {
      throw new Error('No product URL found in search results.');
    }

    // If the URL is relative, make it absolute
    const fullProductUrl = firstAnchorUrl.startsWith('http')
      ? firstAnchorUrl
      : `https://www.bookswagon.com${firstAnchorUrl}`;

    // Fetch product details page
    const productResponse = await axios.get(fullProductUrl);
    const productHtml = productResponse.data;
    const $product = cheerio.load(productHtml);
    
    // Extracting the label content (price)
    const label = $product('#ctl00_phBody_ProductDetail_lblourPrice').text().trim();
    const imgSrc = $product('#ctl00_phBody_ProductDetail_imgProduct').attr('src');
    const title = $product('#ctl00_phBody_ProductDetail_lblTitle').text().trim();

    // Log values for debugging
    console.log('Price:', label, 'Image Source:', imgSrc, 'Title:', title);
    
    // Extracting book details
    const bookDetailDiv = $product('#bookdetail');
    const details = {};
    bookDetailDiv.find('li').each((i, elem) => {
      const key = $product(elem).find('span.font-weight-bold').text().replace(':', '').trim();
      const value = $product(elem).contents().not($product(elem).find('span.font-weight-bold')).text().trim();
      details[key] = value;
    });

    // Extracting release label
    const release = $product('#ctl00_phBody_ProductDetail_lblRelease').text().replace(' | Released: ', '').trim();

    // Extracting the about section
    const aboutBookText = $product('#aboutbook').text().replace('About the Book', '').trim();

    // Extracting author details
    const authors = [];
    const authorDetailDiv = $product('.authordetailtext');
    authorDetailDiv.find('label').each((i, elem) => {
      const text = $product(elem).text().trim().replace('By: ', '');
      const labelId = $product(elem).attr('id');
      if (text) {
        if (labelId.includes('lblAuthor') && !labelId.includes('Type')) {
          authors.push({ author: text });
        } else if (labelId.includes('lblAuthorType')) {
          const lastAuthor = authors[authors.length - 1];
          if (lastAuthor) {
            lastAuthor.role = text;
          }
        }
      }
    });

    // Checking availability
    const availability = $product('#ctl00_phBody_ProductDetail_lblAvailable').text().trim();
    const isAvailable = availability !== 'Out of Stock';

    // Extracting bestseller books
    const bestsellerBooksArray = [];
    $product('#bestsellerdetail .card.cardtest').each((i, elem) => {
      const book = {};
      const anchor = $product(elem).find('a');
      const img = $product(elem).find('img');
      book.name = anchor.attr('title');
      book.image = img.attr('src');
      book.link = anchor.attr('href');
      bestsellerBooksArray.push(book);
    });

    // Constructing JSON response
    return {
      labelContent: label,
      imgSrc: imgSrc,
      title: title,
      bookDetails: details,
      releaseLabel: release,
      paragraphs: aboutBookText,
      authorDetails: authors,
      isOutOfStock: !isAvailable,
      bestsellerBooks: bestsellerBooksArray
    };
  } catch (error) {
    console.error('Error fetching and parsing HTML:', error.message);
    throw new Error('Failed to fetch data from Bookswagon');
  }
}

export default fetchBookswagonData;
