import axios from 'axios';
import { URLSearchParams } from 'url';

async function fetchISBNData(name) {
  try {
    // Search criteria
    const searchcrit1 = name;
    const ebooks_yesno = "no";
    
    const binding = "paperback";
    const onderwerp = "manga";
    // Fetch data from ABC API
    const response = await axios.post('https://abc.nl/api/advanced_search_results/search', new URLSearchParams({
      searchcrit1,
      onderwerp,
      binding,
      ebooks_yesno
    }));
    let items = response.data.items;
    const uniqueItems = [];
    const isbnSet = new Set();

    for (const item of items) {
      if (!isbnSet.has(item.isbn)) {
        isbnSet.add(item.isbn);
        uniqueItems.push(item);
      }
    }

    uniqueItems.sort((a, b) => a.pubdate_sort.localeCompare(b.pubdate_sort));

    return uniqueItems.map(item => {
      const updatedCover = item.cover.slice(0, -3) + '300';
      return {
        cover: `https://abc.nl${updatedCover}`,
        title: item.title,
        slug: item.slug,
        isbn: item.isbn,
        valuta: item.valuta,
        publisher: item.publisher,
        price: item.price,
        pubdate: item.pubdate,
        pubdate_sort: item.pubdate_sort,
        author: item.author,
        favorite: item.favorite,
        binding: item.binding,
        coreTitle: item.coreTitle,
        info: item.info
      };
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to fetch data');
  }
}

export default fetchISBNData;
