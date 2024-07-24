"use client"
// pages/search.js

import { useState } from 'react';

export default function Search() {
  const [results, setResults] = useState(null);
  const [searchTerm, setSearchTerm] = useState('Classroom Of The elite');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    
    const searchcrit1 = searchTerm
    // const sel_publisher =" "    const datefrom =" "    const datetill =" "    const  onderwerp = "all"    const binding =" " 
    const ebooks_yesno = "no"
    const subject = "all subjects"
   
    setLoading(true);
    const response = await fetch('https://abc.nl/api/advanced_search_results/search', {
      method: 'POST',
      body: new URLSearchParams({
        searchcrit1,
        subject,
        ebooks_yesno
      }),
    });

    const data = await response.json();
    setResults(data);
    setLoading(false);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>
      {results && (
        <div>
          <p>Found {results.count}</p>
          <p>Criteria: {results.criteria}</p>
          <p>Execution Time: {results['execution-time']}</p>
          <p className='font-xs'>{JSON.stringify(results)}</p>
        </div>
      )}
    </div>
  );
}
