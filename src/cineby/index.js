// src/cineby/index.js
const http = require('./http.js');
const extractor = require('./extractor.js');

function getStreams(tmdbId, mediaType, season, episode) {
  console.log(`[Cineby] Fetching ${mediaType} ${tmdbId}`);
  
  // Build the URL
  let url;
  if (mediaType === 'movie') {
    url = `https://www.cineby.gd/movie/${tmdbId}`;
  } else {
    url = `https://www.cineby.gd/tv/${tmdbId}`;
    if (season && episode) {
      url = `${url}/${season}/${episode}`;
    }
  }
  
  return http.fetchPage(url)
    .then(html => extractor.extractStreams(html))
    .catch(error => {
      console.error('[Cineby] Error:', error.message);
      return [];
    });
}

module.exports = { getStreams };
