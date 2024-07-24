// pages/api/search.js

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const {
      searchcrit1,
      onderwerp,
      binding,
      ebooks_yesno,
      sel_publisher,
      datefrom,
      datetill,
    } = req.body;

    const response = await fetch('https://abc.nl/api/advanced_search_results/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        searchcrit1,
        onderwerp,
        binding,
        ebooks_yesno,
        sel_publisher,
        datefrom,
        datetill,
      }),
    });

    const data = await response.json();
    res.status(200).json(data);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
