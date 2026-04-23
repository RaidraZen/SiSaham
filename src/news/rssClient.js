const API_KEY = process.env.VITE_AZURE_API_KEY;
const RSS_URL = 'https://www.cnbcindonesia.com/market/rss';

const STOCK_CODES = [
  'BBCA', 'BBRI', 'BMRI', 'BNI', 'BTN',
  'TLKM', 'EXCL', 'ISAT', 'NETV', 'FREN',
  'UNVR', 'GGRM', 'HMSP', 'ICBP', 'INDF', 'MYOR', 'DLTA', 'ROTI', 'KLBF', 'MERK',
  'ADRO', 'BYAN', 'BUMI', 'PTBA', 'ANTM', 'INCO', 'MDKA', 'GOTO', 'BUKA',
  'ASII', 'GMFI', 'AISI', 'ASGR',
  'PGAS', 'PERT', 'EXSP',
  'SSMS', 'CPIN', 'JPFA', 'AALI', 'LSIP',
  'SMGR', 'INTP', 'INCF', 'TKIM',
  'TLKM', 'MITI',
];

function isEmitenNews(title) {
  const upperTitle = title.toUpperCase();
  return STOCK_CODES.some(code => upperTitle.includes(code));
}

async function fetchRSS(url) {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Accept': 'application/rss+xml, application/xml, text/xml',
    },
  });

  if (!response.ok) {
    throw new Error(`RSS fetch failed: ${response.status}`);
  }

  const xml = await response.text();
  return parseRSS(xml);
}

function parseRSS(xml) {
  const items = [];
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, 'text/xml');
  const entries = doc.querySelectorAll('item');

  entries.forEach((entry, idx) => {
    if (idx >= 6) return;

    const title = entry.querySelector('title')?.textContent?.trim() || '';
    const link = entry.querySelector('link')?.textContent?.trim() || '';
    const pubDate = entry.querySelector('pubDate')?.textContent?.trim() || '';
    const description = entry.querySelector('description')?.textContent?.trim() || '';
    const category = entry.querySelector('category')?.textContent?.trim() || 'market';

    const titleForCheck = stripHTML(title);
    const isEmiten = isEmitenNews(titleForCheck);

    const categoryLower = category.toLowerCase();
    let isMakro = false;
    if (categoryLower.includes('makro') || categoryLower.includes('ekonomi') || 
        categoryLower.includes('suku bunga') || categoryLower.includes('ihsg') ||
        categoryLower.includes('bi rate')) {
      isMakro = true;
    }

    const timeAgo = formatTimeAgo(pubDate);

    items.push({
      id: idx,
      title: titleForCheck,
      link: link,
      time: timeAgo,
      description: stripHTML(description),
      category: isMakro ? 'makro' : 'emiten',
      isEmiten: isEmiten,
      source: 'CNBC',
    });
  });

  return items;
}

function stripHTML(html) {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

function formatTimeAgo(dateString) {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} menit lalu`;
    if (diffHours < 24) return `${diffHours} jam lalu`;
    if (diffDays < 7) return `${diffDays} hari lalu`;
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
  } catch {
    return dateString;
  }
}

export async function getMarketNews() {
  try {
    return await fetchRSS(RSS_URL);
  } catch (error) {
    console.error('RSS fetch error:', error);
    return [];
  }
}