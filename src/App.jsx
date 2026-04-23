import React, { useState } from 'react';
import NewsSection from './components/NewsSection';
import SearchSection from './components/SearchSection';
import { searchDocuments } from './azure/searchClient';

export default function App() {
  const [emiten, setEmiten] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!emiten.trim()) return;
    
    console.log('Searching for:', emiten);

    try {
      const data = await searchDocuments(emiten);
      setResults(data);
    } catch (error) {
      console.error('Search error:', error);
      setResults([{
        file: 'Error',
        snippet: 'Gagal terhubung ke Azure. Pastikan API Key dikonfigurasi dengan benar.',
        page: 0,
      }]);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>SiSaham</h1>
        <p>Pencarian Data Emiten IHSG</p>
      </header>

      <NewsSection />

      <SearchSection
        emiten={emiten}
        setEmiten={setEmiten}
        onSearch={handleSearch}
        results={results}
      />
    </div>
  );
}