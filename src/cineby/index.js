// src/cineby/index.js
var http = require('./http.js');
var extractor = require('./extractor.js');

function getStreams(tmdbId, mediaType, season, episode) {
  console.log('[Cineby] Fetching ' + mediaType + ' ' + tmdbId);
  
  var url = 'https://www.cineby.gd/' + mediaType + '/' + tmdbId;
  if (mediaType === 'tv' && season && episode) {
    url = 'https://www.cineby.gd/tv/' + tmdbId + '/' + season + '/' + episode;
  }
  
  return http.fetchPage(url)
    .then(function(html) {
      return extractor.extractStreams(html);
    })
    .catch(function(error) {
      console.error('[Cineby] Error:', error.message);
      return [];
    });
}

module.exports = { getStreams };
