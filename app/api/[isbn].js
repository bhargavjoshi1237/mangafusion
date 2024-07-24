// pages/api/fetch-html.js
import axios from 'axios';
import cheerio from 'cheerio';

export default async function handler(req, res) {
  const { query: { url } } = req;

  try {
    // Fetch HTML content from the provided URL
    const response = await axios.get(url);
    const html = response.data;

    // Extract data from HTML using Cheerio
    const $ = cheerio.load(html);

    // Extracting the label content
    const label = $('#ctl00_phBody_ProductDetail_lblourPrice').text().trim();

    // Extracting book details
    const bookDetailDiv = $('#bookdetail');
    const details = {};
    bookDetailDiv.find('li').each((i, elem) => {
      const key = $(elem).find('span.font-weight-bold').text().replace(':', '').trim();
      const value = $(elem).contents().not($(elem).find('span.font-weight-bold')).text().trim();
      details[key] = value;
    });

    // Extracting release label
    const release = $('#ctl00_phBody_ProductDetail_lblRelease').text().replace(` | Released: `, '').trim();

    // Extracting paragraphs
    const aboutBookText = $('#aboutbook').text().replace('About the Book', '').trim();

    // Extracting author details
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

    // Checking availability
    const availability = $('#ctl00_phBody_ProductDetail_lblAvailable').text().trim();
    const isAvailable = availability !== 'Out of Stock';

    // Extracting bestseller books
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

    // Construct JSON response
    const jsonData = {
      labelContent: label,
      bookDetails: details,
      releaseLabel: release,
      authorDetails: authors,
      paragraphs: aboutBookText,
      isOutOfStock: !isAvailable,
      bestsellerBooks: bestsellerBooksArray,
    };

    // Return JSON response
    res.status(200).json(jsonData);
  } catch (error) {
    console.error('Error fetching URL:', error);
    res.status(500).json({ error: 'Failed to fetch URL' });
  }
}
