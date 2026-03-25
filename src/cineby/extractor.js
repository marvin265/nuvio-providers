// src/cineby/extractor.js
function extractStreams(html) {
  var streams = [];
  
  var patterns = [
    /https?:\/\/[a-zA-Z0-9\-]+\.workers\.dev\/video\.m3u8\?q=[A-Za-z0-9]+/gi,
    /https?:\/\/[^"'\s]+\.workers\.dev\/[^"'\s]+\.m3u8/gi
  ];
  
  for (var p = 0; p < patterns.length; p++) {
    var matches = html.match(patterns[p]);
    if (matches) {
      for (var i = 0; i < matches.length; i++) {
        var url = matches[i];
        if (url) {
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
  
  // Remove duplicates
  var unique = [];
  var seen = {};
  for (var i = 0; i < streams.length; i++) {
    if (!seen[streams[i].url]) {
      seen[streams[i].url] = true;
      unique.push(streams[i]);
    }
  }
  
  return unique;
}

module.exports = { extractStreams };
