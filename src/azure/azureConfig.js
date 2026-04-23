export const AZURE_CONFIG = {
  serviceUrl: import.meta.env.VITE_AZURE_SEARCH_URL || '',
  indexName: import.meta.env.VITE_AZURE_INDEX_NAME || 'laporan-keuangan',
};

export const SEARCH_API_VERSION = '2023-11-01';