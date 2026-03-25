// src/cineby/extractor.js
function extractStreams(html) {
  const streams = [];
  
  // Look for m3u8 URLs from Cloudflare Workers
  const patterns = [
    /https?:\/\/[a-zA-Z0-9\-]+\.workers\.dev\/video\.m3u8\?q=[A-Za-z0-9]+/gi,
    /https?:\/\/[^"'\s]+\.workers\.dev\/[^"'\s]+\.m3u8/gi
  ];
  
  for (const pattern of patterns) {
    const matches = html.match(pattern);
    if (matches) {
      for (const url of matches) {
        if (url && !streams.some(s => s.url === url)) {
          streams.push({
            name: 'Cineby',
            title: 'HD Stream',
            url: url,
            quality: 'HD',
            headers: {
              'Referer': 'https://www.cineby.gd/',
              'Origin': 'https://www.cineby.gd',
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
          });
        }
      }
    }
  }
  
  return streams;
}

module.exports = { extractStreams };
