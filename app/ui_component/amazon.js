import puppeteer from 'puppeteer';
import cheerio from 'cheerio';

async function fetchAmazonData(isbn) {
  try {
    const url = `https://www.amazon.in/s?k=${isbn} Paperback`;

    // Launch Puppeteer in headless mode
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Set a random user agent
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

    // Go to the URL
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Wait for the page to load
    await page.waitForFunction(
      'window.performance.timing.loadEventEnd - window.performance.timing.navigationStart >= 500'
    );

    // Get the HTML content
    const pageSourceHTML = await page.content();

    // Close the browser
    await browser.close();

    // Load the HTML into Cheerio
    const $ = cheerio.load(pageSourceHTML);

    // Extract the price elements
    const prices = [];
    $('.a-price-whole').each((index, element) => {
      prices.push('₹' + $(element).text().trim());
    });

    // Extract the links with target="_blank"
    const externalLinks = [];
    $('a[target="_blank"]').each((index, element) => {
      externalLinks.push('https://www.amazon.in/' + $(element).attr('href'));
    });

    // Prepare the response
    return {
      price: prices[0] || 'N/A', // Default to 'N/A' if no price found
      externalLink: externalLinks[0] || 'N/A' // Default to 'N/A' if no link found
    };
  } catch (error) {
    console.error('Error fetching Amazon page:', error);
    throw new Error('Failed to fetch Amazon page');
  }
}

export default fetchAmazonData;
