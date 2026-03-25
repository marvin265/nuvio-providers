// src/cineby/http.js
function fetchPage(url) {
  console.log('[Cineby] Fetching:', url);
  
  return fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Referer': 'https://www.cineby.gd/',
      'Origin': 'https://www.cineby.gd'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return response.text();
  });
}

module.exports = { fetchPage };
