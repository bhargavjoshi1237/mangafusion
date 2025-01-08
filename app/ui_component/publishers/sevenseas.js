import axios from 'axios';
import cheerio from 'cheerio';

export const fetchBookswagonSearchData = async (publisher) => {
  try {
    const startTime = Date.now();

    // Step 1: Initial GET request to fetch HTML data
    const response = await axios.get('https://www.bookswagon.com/publisher/' + publisher);
    const html = response.data;
    const $ = cheerio.load(html);

    const books = [];

    $('.list-view-books').each((index, element) => {
      const book = {};
      const bookElement = $(element);

      book.name = bookElement.find('.title a').text().trim().replace("(comic)", " ").replace("(light novel)", "(LN)");
      book.authors = bookElement.find('.author-publisher a').map((i, el) => $(el).text().trim()).get();
      book.publisher = bookElement.find('.author-publisher:contains("Publisher:") a').text().trim();
      book.rating = bookElement.find('.avergageratingslider').val();
      book.reviews = bookElement.find('.allreviewcount').text().replace(/[()]/g, '').trim();
      book.price = {
        list: bookElement.find('.price .list').text().trim(),
        sell: bookElement.find('.price .sell').text().trim()
      };
      book.edition = bookElement.find('.available-stock').text().trim();
      book.shippingInfo = bookElement.find('.shipping-info').text().trim();

      // Extract binding, releaseDate, and language from the table
      const attributes = bookElement.find('table .attributes-head').closest('tr');
      book.binding = attributes.filter(':contains("Binding:")').find('.attributes-title').text().trim();
      book.releaseDate = attributes.filter(':contains("Release:")').find('.attributes-title').text().trim();
      book.language = attributes.filter(':contains("Language:")').find('.attributes-title').text().trim();

      // Extract URL and ISBN number
      book.url = bookElement.find('.title a').attr('href');
      book.isbn = book.url.split('/').pop();

      // Extract and convert image source URL
      const imageUrl = bookElement.find('.cover img').attr('src');
      book.image = imageUrl.replace('/mainimages/', '/images200/');

      books.push(book);
    });

    // Step 2: POST request to fetch additional data
    const postResponse = await axios.post(
      'https://www.bookswagon.com/ajax.aspx/GetSearchResult',
      {
        searchTerm: publisher,
        ID_Search: 0,
        next_item_index: 1,
        filter: 'filter',
        ID_ProductType: 1
      },
      {
        headers: {
          'accept': 'application/json, text/javascript, */*; q=0.01',
          'content-type': 'application/json; charset=UTF-8',
          'x-requested-with': 'XMLHttpRequest',
          'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        }
      }
    );

    const postHtml = postResponse.data.d; // Extract HTML content from the API response
    const $$ = cheerio.load(postHtml);

    $$('.list-view-books').each((index, element) => {
      const book = {};
      const bookElement = $$(element);

      book.name = bookElement.find('.title a').text().trim().replace("(comic)", " ").replace("(light novel)", "(LN)");
      book.authors = bookElement.find('.author-publisher a').map((i, el) => $$(el).text().trim()).get();
      book.publisher = bookElement.find('.author-publisher:contains("Publisher:") a').text().trim();
      book.rating = bookElement.find('.avergageratingslider').val();
      book.reviews = bookElement.find('.allreviewcount').text().replace(/[()]/g, '').trim();
      book.price = {
        list: bookElement.find('.price .list').text().trim(),
        sell: bookElement.find('.price .sell').text().trim()
      };
      book.edition = bookElement.find('.available-stock').text().trim();
      book.shippingInfo = bookElement.find('.shipping-info').text().trim();

      // Extract binding, releaseDate, and language from the table
      const attributes = bookElement.find('table .attributes-head').closest('tr');
      book.binding = attributes.filter(':contains("Binding:")').find('.attributes-title').text().trim();
      book.releaseDate = attributes.filter(':contains("Release:")').find('.attributes-title').text().trim();
      book.language = attributes.filter(':contains("Language:")').find('.attributes-title').text().trim();

      // Extract URL and ISBN number
      book.url = bookElement.find('.title a').attr('href');
      book.isbn = book.url.split('/').pop();

      // Extract and convert image source URL
      const imageUrl = bookElement.find('.cover img').attr('src');
      book.image = imageUrl.replace('/mainimages/', '/images200/');

      books.push(book);
    });

    const endTime = Date.now();
    const timeTaken = endTime - startTime;

    return { books, timeTaken };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { books: [], timeTaken: 0 };
  }
};
