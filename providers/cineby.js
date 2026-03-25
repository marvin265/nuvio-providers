/**
 * cineby - Built from src/cineby/
 * Generated: 2026-03-25T22:04:04.912Z
 */
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// src/cineby/http.js
var require_http = __commonJS({
  "src/cineby/http.js"(exports2, module2) {
    function fetchPage(url) {
      console.log("[Cineby] Fetching:", url);
      return fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          "Referer": "https://www.cineby.gd/",
          "Origin": "https://www.cineby.gd"
        }
      }).then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        return response.text();
      });
    }
    module2.exports = { fetchPage };
  }
});

// src/cineby/extractor.js
var require_extractor = __commonJS({
  "src/cineby/extractor.js"(exports2, module2) {
    function extractStreams(html) {
      const streams = [];
      const patterns = [
        /https?:\/\/[a-zA-Z0-9\-]+\.workers\.dev\/video\.m3u8\?q=[A-Za-z0-9]+/gi,
        /https?:\/\/[^"'\s]+\.workers\.dev\/[^"'\s]+\.m3u8/gi
      ];
      for (const pattern of patterns) {
        const matches = html.match(pattern);
        if (matches) {
          for (const url of matches) {
            if (url && !streams.some((s) => s.url === url)) {
              streams.push({
                name: "Cineby",
                title: "HD Stream",
                url,
                quality: "HD",
                headers: {
                  "Referer": "https://www.cineby.gd/",
                  "Origin": "https://www.cineby.gd",
                  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
                }
              });
            }
          }
        }
      }
      return streams;
    }
    module2.exports = { extractStreams };
  }
});

// src/cineby/index.js
var http = require_http();
var extractor = require_extractor();
function getStreams(tmdbId, mediaType, season, episode) {
  console.log(`[Cineby] Fetching ${mediaType} ${tmdbId}`);
  let url;
  if (mediaType === "movie") {
    url = `https://www.cineby.gd/movie/${tmdbId}`;
  } else {
    url = `https://www.cineby.gd/tv/${tmdbId}`;
    if (season && episode) {
      url = `${url}/${season}/${episode}`;
    }
  }
  return http.fetchPage(url).then((html) => extractor.extractStreams(html)).catch((error) => {
    console.error("[Cineby] Error:", error.message);
    return [];
  });
}
module.exports = { getStreams };
