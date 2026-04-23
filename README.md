# 📈 SiSaham
Intelligent Research Assistant for IHSG Retail Investors. SiSaham adalah Chrome Extension yang mendigitalisasi riset investasi dengan menyederhanakan akses data fundamental emiten dan berita pasar modal Indonesia secara real-time.

## ✨ Fitur Utama
    Instant Issuer Screening: Ekstraksi data keuangan (Aset, Ekuitas, PBV, dll.) langsung dari laporan keuangan resmi IDX menggunakan Azure AI Search.
    Real-time Market News: Integrasi 6 berita terkini dari RSS Feed CNBC Indonesia untuk pemantauan sentimen pasar.
    Proactive Pre-Market Alert: Notifikasi otomatis 1 jam sebelum pembukaan pasar IHSG (08:00 WIB) untuk persiapan trading plan.
    Azure-Powered Storage: Manajemen dokumen laporan keuangan yang aman melalui Azure Blob Storage.

## 🛠️ Tech Stack
Frontend: React 18, Vite, @crxjs/vite-plugin
AI & Cloud: Microsoft Azure AI Search, Azure Blob Storage
Automation: Chrome Alarms & Notifications API, RSS Parser

## 💻 Panduan Instalasi Lokal
1. Konfigurasi Azure
Unggah dokumen laporan keuangan ke Azure Blob Storage. Hubungkan Blob Storage sebagai data source di Azure AI Search dan buat index.

2. Setup Environment
Salin file .env.example menjadi .env dan isi kredensial berikut:

Code snippet
VITE_AZURE_SEARCH_ENDPOINT=https://your-resource.search.windows.net
VITE_AZURE_SEARCH_KEY=your-api-key
VITE_AZURE_SEARCH_INDEX=your-index-name

3. Build Project
Bash
### Install dependencies
npm install

### Build extension
npm run build

## 🚀 Cara Menjalankan
1. Buka Google Chrome dan akses chrome://extensions/.
2. Aktifkan Developer Mode di pojok kanan atas.
3. Klik Load unpacked.
4. Pilih folder dist hasil proses build.
5. Ikon SiSaham siap digunakan pada toolbar browser.