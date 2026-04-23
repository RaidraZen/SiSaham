import React from 'react';

function formatIndonesianNumber(value, suffix = 'M') {
  const cleaned = value.replace(/[.,]/g, '');
  const num = parseFloat(cleaned);
  if (isNaN(num)) return value;
  
  const formatted = num.toLocaleString('id-ID', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  
  return suffix ? `${formatted}${suffix}` : formatted;
}

function parseContent(content) {
  const items = [];
  
  const patterns = [
    { label: 'Assets', key: 'assets', pattern: /Assets\s*([0-9,\.\-]+)M/i, isM: true },
    { label: 'Liabilities', key: 'liabilities', pattern: /Liabilities\s*([0-9,\.\-]+)M/i, isM: true },
    { label: 'Equity', key: 'equity', pattern: /Equity\s*([0-9,\.\-]+)M/i, isM: true },
    { label: 'Sales', key: 'sales', pattern: /Sales\s*([0-9,\.\-]+)M/i, isM: true },
    { label: 'EBT', key: 'ebt', pattern: /EBT\s*([0-9,\.\-]+)M/i, isM: true },
    { label: 'Profit', key: 'profit', pattern: /Profit\s*([0-9,\.\-]+)M/i, isM: true },
    { label: 'EPS', key: 'eps', pattern: /EPS\s*([0-9,\.\-]+)/i, isM: false },
    { label: 'Book Value', key: 'bv', pattern: /Book Value\s*([0-9,\.\-]+)/i, isM: false },
    { label: 'P/E', key: 'pe', pattern: /P\/E\s*([0-9,\.\-]+)x/i, isM: false },
    { label: 'PBV', key: 'pbv', pattern: /Price to BV\s*([0-9,\.\-]+)x/i, isM: false },
    { label: 'D/E', key: 'de', pattern: /D\/E\s*([0-9,\.\-]+)/i, isM: false },
    { label: 'ROA', key: 'roa', pattern: /ROA\s*([0-9,\.\-]+)%/i, isM: false },
    { label: 'ROE', key: 'roe', pattern: /ROE\s*([0-9,\.\-]+)%/i, isM: false },
    { label: 'NPM', key: 'npm', pattern: /NPM\s*([0-9,\.\-]+)%/i, isM: false },
  ];

  patterns.forEach(({ label, key, pattern, isM }) => {
    const match = content.match(pattern);
    if (match) {
      const rawValue = match[1];
      const formattedValue = formatIndonesianNumber(rawValue, isM ? ' M' : '');
      items.push({ label, key, value: formattedValue });
    }
  });

  return items;
}

export default function SearchSection({
  emiten,
  setEmiten,
  onSearch,
  results,
}) {
  return (
    <div className="section">
      <div className="section-title">Cari Data Emiten</div>
      <div className="search-form">
        <div>
          <label>Kode Emiten (contoh: BBCA, BBRI, BBNI)</label>
          <input
            type="text"
            placeholder="Masukkan kode emiten..."
            value={emiten}
            onChange={(e) => setEmiten(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === 'Enter' && onSearch()}
          />
        </div>

        <button onClick={onSearch} disabled={!emiten.trim()}>
          Cari Data
        </button>
      </div>

      {results.length > 0 && (
        <div className="results">
          <div className="section-title">Hasil Pencarian</div>
          {results.map((result, idx) => {
            const dataItems = parseContent(result.snippet);
            return (
              <div key={idx} className="result-item">
                <div className="file">{result.file}</div>
                <div className="snippet">{result.title}</div>
                <div className="data-grid">
                  {dataItems.map((item, i) => (
                    <div key={i} className={`data-item ${item.key}`}>
                      <div className="data-label">{item.label}</div>
                      <div className={`data-value ${['ROA','ROE','NPM','PBV','PE'].includes(item.label) ? 'highlight' : ''}`}>
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="page">Data Laporan Keuangan - {result.page > 0 ? 'IDX' : ''}</div>
              </div>
            );
          })}
        </div>
      )}

      {results.length === 0 && emiten.trim() && (
        <div className="no-results">
          Ketik tombol "Cari Data" untuk mencari
        </div>
      )}
    </div>
  );
}