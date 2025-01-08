const axios = require('axios');
const cheerio = require('cheerio');

export async function fetchBookDetails() {
    try {
        const { data } = await axios.get('https://global.bookwalker.jp/');
        const $ = cheerio.load(data);
        const ulDetails = [];

        $('ul.o-tile-list.swiper-wrapper').each((ulIndex, ulElement) => {
            const liElements = $(ulElement).find('li.o-tile.swiper-slide') // Fetch only the first 5 li elements
            const bookDetails = [];

            liElements.each((index, element) => {
                const bookInfo = $(element).find('.o-tile-book-info');
                const title = bookInfo.find('h2.a-tile-ttl a').attr('title');
                const link = bookInfo.find('h2.a-tile-ttl a').attr('href');
                const image = bookInfo.find('a.a-tile-thumb-img img').attr('data-srcset').split(' ')[0];
                const releaseDate = $(element).find('.o-tile-under-box .a-tile-release-date').text().trim();
                const price = $(element).find('.o-tile-under-box .a-tile-price').text().trim();
                const tags = [];

                bookInfo.find('ul.m-tile-tag-box li.m-tile-tag div').each((i, tagElement) => {
                    tags.push($(tagElement).text().trim());
                });

                bookDetails.push({
                    title,
                    link,
                    image,
                    releaseDate,
                    price,
                    tags
                });
            });

            ulDetails.push({
                ulIndex,
                books: bookDetails
            });
        });

        return { ulDetails };
    } catch (error) {
        console.error('Error fetching book details:', error);
        return { ulDetails: [] };
    }
}