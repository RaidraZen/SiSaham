import { AZURE_CONFIG, SEARCH_API_VERSION } from './azureConfig';

const API_KEY = import.meta.env.VITE_AZURE_API_KEY;

const FIELD_MAP = {
  'ROA': 'roa',
  'ROE': 'roe',
  'PBV': 'pbv',
  'PE': 'pe',
  'NPM': 'npm',
};

function checkApiKey() {
  if (!API_KEY) {
    console.warn('VITE_AZURE_API_KEY tidak ditemukan di .env');
    return false;
  }
  return true;
}

export async function searchDocuments(query, keyword = '') {
  if (!checkApiKey()) {
    return [{
      file: 'Konfigurasi',
      snippet: 'API Key belum dikonfigurasi.',
      page: 0,
    }];
  }

  const url = `${AZURE_CONFIG.serviceUrl}/indexes/${AZURE_CONFIG.indexName}/docs/search?api-version=${SEARCH_API_VERSION}`;

  const isEmitterOnly = !keyword || keyword === 'default';
  
  let searchBody = {
    search: query,
    top: 10,
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': API_KEY,
    },
    body: JSON.stringify(searchBody),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Search failed: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.value.map((doc) => ({
    file: doc.source_file,
    snippet: doc.content,
    page: doc.page_number,
    title: doc.title,
  }));
}