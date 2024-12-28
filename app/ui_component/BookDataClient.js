"use client";
import { useEffect, useState } from 'react';

function extractBookName(title) {
  const nameRegex = /(.+), Vol\. \d+/;
  const match = title.match(nameRegex);
  return match ? match[1].trim() : null;
}

async function fetchAndFindBookByVolume(searchTerm, targetType, targetTitle) {
  try {
      // 1. Fetch autocomplete data
      const autocompleteUrl = `https://global.bookwalker.jp/louis-api/autocomplete/?category=&term=${searchTerm}`;
      const autocompleteResponse = await fetch(autocompleteUrl);
      if (!autocompleteResponse.ok) {
          throw new Error(`HTTP error! status: ${autocompleteResponse.status}`);
      }
      const autocompleteData = await autocompleteResponse.json();

      // 2. Find the item with the specified type in label
      const targetItem = autocompleteData.find(item => item.label && item.label.toLowerCase().includes(targetType.toLowerCase()));
      if (!targetItem) {
          console.log(`No item found with type '${targetType}' in label.`);
          return null;
      }
      if (targetItem.type !== 1) {
           console.log(`Item found but type is not 1.`);
          return null;
       }

      const typeId = targetItem.typeId;

      // 3. Fetch series page HTML
      const seriesUrl = `https://global.bookwalker.jp/series/${typeId}/`;
      const seriesResponse = await fetch(seriesUrl);
      if (!seriesResponse.ok) {
          throw new Error(`HTTP error! status: ${seriesResponse.status}`);
      }
      const seriesHtml = await seriesResponse.text();

      // 4. Parse HTML
      const parser = new DOMParser();
      const doc = parser.parseFromString(seriesHtml, 'text/html');

      // 5. Extract data from the ul with class o-tile-list
      const tileList = doc.querySelector("ul.o-tile-list");
      if (!tileList) {
          console.log("Could not find ul.o-tile-list");
          return null;
      }

      const bookData = [];
      const listItems = tileList.querySelectorAll('li.o-tile');

      listItems.forEach(listItem => {
          const imageElement = listItem.querySelector('img.lazy');
          const imageUrl = imageElement ? imageElement.dataset.srcset.split(',')[1].trim().split(' ')[0] : null;
          const tagElements = listItem.querySelectorAll('ul.m-tile-tag-box li.m-tile-tag div');
          const tags = Array.from(tagElements).map(tag => tag.textContent.trim());
          const titleElement = listItem.querySelector('h2.a-tile-ttl a');
          const title = titleElement ? titleElement.textContent.trim() : null;
          const priceElement = listItem.querySelector('div.a-tile-price');
          const price = priceElement ? priceElement.textContent.trim() : null;

          bookData.push({
              image: imageUrl,
              tags: tags,
              title: title,
              price: price,
          });
      });

      function extractVolumeNumber(title) {
          const volumeRegex = /Vol\. (\d+)/i;
          const match = title.match(volumeRegex);
          return match ? parseInt(match[1], 10) : null;
      }

      const targetVolume = extractVolumeNumber(targetTitle);
      if(targetVolume == null){
        console.log("Could not extract volume number.")
        return null
      }

      function findMatchingBookByVolume(bookData, targetVolume) {
          if (!bookData || bookData.length === 0) {
              return null;
          }

          const matchingBook = bookData.find(book => {
              const bookVolume = extractVolumeNumber(book.title);
              return bookVolume === targetVolume;
          });

          return matchingBook || null;
      }

     const matchingBook = findMatchingBookByVolume(bookData, targetVolume);


      if (matchingBook) {
          console.log("Found the matching book:", matchingBook);
          return matchingBook
      } else {
          console.log("No book matching the target volume was found.");
          return null;
      }

  } catch (error) {
      console.error('Error fetching or processing data:', error);
      return null;
  }}
  export default function BookDataClient({datax}) {
  const [bookwalkers, setBookwalkers] = useState(null);
  
  useEffect(() => {
      async function fetchData() {
          if (datax && datax.title) {
            const result = await fetchAndFindBookByVolume(extractBookName(datax.title), "manga", datax.title);
            setBookwalkers(result);
            }
         }
      fetchData();
     }, [datax]);
  return <p className="fon text-4xl -mt-2">{JSON.stringify(bookwalkers)} </p>;}