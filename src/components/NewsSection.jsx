import React, { useState, useEffect } from 'react';
import { getMarketNews } from '../news/rssClient';

export default function NewsSection() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadNews() {
      try {
        const data = await getMarketNews();
        setNews(data);
      } catch (err) {
        console.error('News load error:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadNews();
  }, []);

  const handleNewsClick = (link) => {
    if (link) {
      window.open(link, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="section">
        <div className="section-title">Berita Terbaru</div>
        <div className="news-loading">
          <div className="loading-spinner"></div>
          <span>Memuat berita...</span>
        </div>
      </div>
    );
  }

  if (error || news.length === 0) {
    return (
      <div className="section">
        <div className="section-title">Berita Terbaru</div>
        <div className="news-error">
          Gagal memuat berita. Cek koneksi internet.
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="section-title">Berita Terbaru</div>
      <div className="news-list">
        {news.map((item) => (
          <div 
            key={item.id} 
            className={`news-item ${item.isEmiten ? 'emiten-highlight' : ''}`}
            onClick={() => handleNewsClick(item.link)}
          >
            <span className={`macro-tag ${item.category === 'makro' ? 'makro' : ''} ${item.isEmiten ? 'emiten-tag' : ''}`}>
              {item.isEmiten ? 'EMITEN' : item.category === 'makro' ? 'MAKRO' : 'BERITA'}
            </span>
            <div className="news-title">{item.title}</div>
            <div className="news-meta">
              {item.source} • {item.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}