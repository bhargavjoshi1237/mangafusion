import axios from 'axios';

export default async function fetchBookswagonData(name) {
  try {
    

    // Search criteria
    const searchcrit1 = name;
    const ebooks_yesno = "no";
    const subject = "manga";
    const binding = "paperback";

    // Fetch data from ABC API
    const response = await axios.post('https://abc.nl/api/advanced_search_results/search', new URLSearchParams({
      searchcrit1,
      subject,
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

    const processedItems = uniqueItems.map(item => {
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
    return {processedItems};
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
