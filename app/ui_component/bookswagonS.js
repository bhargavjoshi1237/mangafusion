import axios from 'axios';
import cheerio from 'cheerio';

const fetchBookswagoSearchnData = async (searchcrit1) => {
  try {
    const response = await axios.get(`https://www.bookswagon.com/search-books/${searchcrit1}`);
    const html = response.data;
    const $ = cheerio.load(html);

    const label = $('#ctl00_phBody_ProductDetail_lblourPrice').text().trim();
    const imgSrc = $('#ctl00_phBody_ProductDetail_imgProduct').attr('src');
    const title = $('#ctl00_phBody_ProductDetail_lblTitle').text().trim();

    const bookDetailDiv = $('#bookdetail');
    const details = {};
    bookDetailDiv.find('li').each((i, elem) => {
      const key = $(elem).find('span.font-weight-bold').text().replace(':', '').trim();
      const value = $(elem).contents().not($(elem).find('span.font-weight-bold')).text().trim();
      details[key] = value;
    });

    const release = $('#ctl00_phBody_ProductDetail_lblRelease').text().replace(` | Released: `, '').trim();
    const aboutBookText = $('#aboutbook').text().replace('About the Book', '').trim();

    const authorDetailDiv = $('.authordetailtext');
    const authors = [];
    authorDetailDiv.find('label').each((i, elem) => {
      const text = $(elem).text().trim().replace(`By: `, '');
      if (text) {
        const labelId = $(elem).attr('id');
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

    const availability = $('#ctl00_phBody_ProductDetail_lblAvailable').text().trim();
    const isAvailable = availability !== 'Out of Stock';

    const bestsellerBooksArray = [];
    $('#bestsellerdetail .card.cardtest').each((i, elem) => {
      const book = {};
      const anchor = $(elem).find('a');
      const img = $(elem).find('img');
      book.name = anchor.attr('title');
      book.image = img.attr('src');
      book.link = anchor.attr('href');
      bestsellerBooksArray.push(book);
    });

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
    console.error('Error fetching and parsing HTML:', error);
    return { error: 'Failed to fetch data from Bookswagon' };
  }
};

export default fetchBookswagoSearchnData;
