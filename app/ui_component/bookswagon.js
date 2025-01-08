import axios from 'axios';
import cheerio from 'cheerio';

async function fetchBookswagonData(url) {
  try {
    // Fetch search results
    const searchResponse = await axios.get(`https://www.bookswagon.com/search-books/${url}`);
    const $search = cheerio.load(searchResponse.data);
    
    // Extract first product URL from the search results
    const firstAnchorUrl = $search('.product-summary a').first().attr('href');

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
    const $product = cheerio.load(productResponse.data);
    
    // Extracting the label content (price), image source, and title
    const label = $product('#ctl00_phBody_ProductDetail_lblourPrice').text().trim();
    const imgSrc = $product('#ctl00_phBody_ProductDetail_imgProduct').attr('src');
    const title = $product('#ctl00_phBody_ProductDetail_lblTitle').text().trim();

    // Extracting book details
    const details = {};
    $product('#bookdetail li').each((i, elem) => {
      let key = $product(elem).find('span.font-weight-bold').text().replace(':', '').trim().replace(/\s+/g, '');
      if (key === 'ISBN-13') {
        key = key.replace('-', '');
      }
      const value = $product(elem).contents().not($product(elem).find('span.font-weight-bold')).text().trim();
      details[key] = value;
    });

    // Extracting release label
    const release = $product('#ctl00_phBody_ProductDetail_lblRelease').text().replace(' | Released: ', '').trim();

    // Extracting the about section
    const aboutBookText = $product('#aboutbook').text().replace('About the Book', '').trim();

    // Extracting author details
    const authors = [];
    $product('.authordetailtext label').each((i, elem) => {
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
      const anchor = $product(elem).find('a');
      const img = $product(elem).find('img');
      bestsellerBooksArray.push({
        name: anchor.attr('title'),
        image: img.attr('src'),
        link: anchor.attr('href')
      });
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