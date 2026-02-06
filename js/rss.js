/*
  Hamdash - RSS Feed Handling
  License: MIT
  Copyright (c) 2026 Pablo Sabbag, VA3HDL
*/

// ============================================================================
// RSS STATE
// ============================================================================

// Store interval IDs to prevent duplicates
let rssIntervals = [];
let activeFetches = new Map(); // Track active fetch promises per feed URL
// Track proxy success/failure rates per feed
let proxyHealth = {};

// ============================================================================
// RSS FETCHING
// ============================================================================

/**
 * Fetch and display RSS feeds from all configured sources
 */
function fetchAndDisplayRss() {
  // Clear any existing intervals first
  rssIntervals.forEach(intervalId => clearInterval(intervalId));
  rssIntervals = [];

  // List of CORS proxies to try (in order of preference)
  const corsProxies = [
    {
      name: 'allorigins',
      url: (feedUrl) => `https://api.allorigins.win/raw?url=${encodeURIComponent(feedUrl)}`
    },
    {
      name: 'corsproxy',
      url: (feedUrl) => `https://corsproxy.io/?url=${encodeURIComponent(feedUrl)}`
    },
    {
      name: 'codetabs',
      url: (feedUrl) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(feedUrl)}`
    },
    {
      name: 'thingproxy',
      url: (feedUrl) => `https://thingproxy.freeboard.io/fetch/${feedUrl}`
    }
  ];

  const rssTickerContent = document.getElementById("rss-ticker-content");
  if (!rssTickerContent) {
    console.error("RSS ticker content element not found");
    return;
  }

  const feedContents = new Array(window.aRSS.length).fill("");
  let loadedFeeds = 0;

  console.log("Fetching RSS feeds...");

  window.aRSS.forEach(([rssUrl, interval], index) => {
    const fetchFeed = async (retryCount = 0, maxRetries = 1) => {
      // Prevent multiple simultaneous fetches of the same feed
      if (activeFetches.has(rssUrl)) {
        console.log(`⏸️ Fetch already in progress for ${rssUrl}, skipping...`);
        return;
      }

      console.log(`📡 Fetching feed: ${rssUrl}${retryCount > 0 ? ` (retry ${retryCount})` : ''}`);

      // Initialize proxy health tracking for this feed if needed
      if (!proxyHealth[rssUrl]) {
        proxyHealth[rssUrl] = {};
        corsProxies.forEach(proxy => {
          proxyHealth[rssUrl][proxy.name] = { successes: 0, failures: 0 };
        });
      }

      // Sort proxies by success rate for this specific feed
      const sortedProxies = [...corsProxies].sort((a, b) => {
        const healthA = proxyHealth[rssUrl][a.name];
        const healthB = proxyHealth[rssUrl][b.name];
        const rateA = healthA.successes / (healthA.successes + healthA.failures + 1);
        const rateB = healthB.successes / (healthB.successes + healthB.failures + 1);
        return rateB - rateA;
      });

      // Create the fetch promise and store it
      const fetchPromise = (async () => {
        try {
          // Try all proxies in parallel (race to success)
          const proxyPromises = sortedProxies.map(async (proxy) => {
            const proxyUrl = proxy.url(rssUrl);

            try {
              const controller = new AbortController();
              const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

              const response = await fetch(proxyUrl, {
                signal: controller.signal,
                cache: 'no-cache',
                headers: {
                  'Accept': 'application/rss+xml, application/xml, text/xml, application/atom+xml'
                }
              });
              clearTimeout(timeoutId);

              if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
              }

              const data = await response.text();

              // Check if we actually got XML (not an HTML error page)
              const trimmedData = data.trim();
              if (!trimmedData.startsWith('<?xml') &&
                  !trimmedData.startsWith('<rss') &&
                  !trimmedData.startsWith('<feed') &&
                  !trimmedData.includes('<rss') &&
                  !trimmedData.includes('<feed')) {
                throw new Error('Response is not XML');
              }

              const parser = new DOMParser();
              const xmlDoc = parser.parseFromString(data, "text/xml");

              // Check for XML parsing errors
              const parserError = xmlDoc.querySelector('parsererror');
              if (parserError) {
                throw new Error('XML parsing error');
              }

              // Automatically detect whether the feed uses "item" or "entry" tags
              let itmTag = "item"; // Default to RSS
              if (xmlDoc.querySelector("entry")) {
                itmTag = "entry"; // Switch to Atom if "entry" is found
              }

              const feedTitle = xmlDoc.querySelector("channel > title, feed > title")?.textContent || "Unknown Feed";
              const lastUpdated = xmlDoc.querySelector("channel > lastBuildDate, feed > updated")?.textContent || "Unknown Time";

              const items = xmlDoc.querySelectorAll(itmTag);

              if (items.length === 0) {
                throw new Error('No items found in feed');
              }

              // Success! Update proxy health
              proxyHealth[rssUrl][proxy.name].successes++;

              console.log(`✅ Loaded ${items.length} items from ${rssUrl} (${proxy.name})`);

              let feedText = `<span style="font-size: 0.9em; color: #aaa;"> ${feedTitle} - Last Updated: ${lastUpdated} </span> - `;

              items.forEach((item) => {
                const title = item.querySelector("title")?.textContent || "No title";

                // Handle both <link href="..."> and <link>...</link>
                const linkElement = item.querySelector("link");
                let link = "";
                if (linkElement) {
                  if (linkElement.getAttribute("href")) {
                    link = linkElement.getAttribute("href");
                  } else {
                    link = linkElement.textContent.trim();
                  }
                }

                feedText += `<a href="${link}" target="_blank" style="margin-right: 50px;">${title}</a>`;
              });

              // Return the successful result
              return { index, feedText, proxy: proxy.name };

            } catch (error) {
              // Update proxy health on failure
              proxyHealth[rssUrl][proxy.name].failures++;
              // Only log significant errors
              if (!error.message.includes('aborted') && !error.message.includes('Failed to fetch')) {
                console.warn(`❌ ${proxy.name} failed for ${rssUrl}: ${error.message}`);
              }
              throw error; // Re-throw to be caught by Promise.any
            }
          });

          // Wait for the first successful proxy (race condition)
          const result = await Promise.any(proxyPromises);

          // Update the content for this feed (only once!)
          feedContents[index] = result.feedText;
          loadedFeeds++;

          // Combine all feeds and update the ticker content
          const displayContent = feedContents.filter(f => f).join("") ||
            `<span style="color: #aaa;">Loading feeds... (${loadedFeeds}/${window.aRSS.length})</span>`;
          rssTickerContent.innerHTML = displayContent;

          // Update the ticker speed
          updateTickerSpeed();

          return result;

        } catch (error) {
          // All proxies failed
          console.error(`🚫 All proxies failed for ${rssUrl}`);

          // Try retry if we haven't exceeded max retries
          if (retryCount < maxRetries) {
            const retryDelay = (retryCount + 1) * 3000; // 3s, 6s
            console.log(`⏳ Retrying ${rssUrl} in ${retryDelay/1000} seconds...`);

            // Remove from active fetches before retry
            activeFetches.delete(rssUrl);

            await new Promise(resolve => setTimeout(resolve, retryDelay));
            return fetchFeed(retryCount + 1, maxRetries);
          } else {
            // Final failure
            console.error(`💀 Giving up on ${rssUrl} after ${maxRetries + 1} attempts`);
            const domain = rssUrl.split('/')[2];
            feedContents[index] = `<span style="color: #f88; margin-right: 50px;">⚠️ ${domain} unavailable</span>`;
            rssTickerContent.innerHTML = feedContents.filter(f => f).join("") ||
              '<span style="color: #f88;">Some feeds failed to load. Check console for details.</span>';
            throw error;
          }
        } finally {
          // Always remove from active fetches when done (success or failure)
          activeFetches.delete(rssUrl);
        }
      })();

      // Store the active fetch promise
      activeFetches.set(rssUrl, fetchPromise);

      // Wait for it to complete
      return fetchPromise;
    };

    // Fetch the feed immediately
    fetchFeed().catch(err => {
      console.error(`Failed to initialize feed ${rssUrl}:`, err);
    });

    // Set up periodic refresh based on the interval (in minutes)
    if (interval && interval > 0) {
      const intervalId = setInterval(() => {
        fetchFeed().catch(err => {
          console.error(`Failed to refresh feed ${rssUrl}:`, err);
        });
      }, interval * 60 * 1000);
      rssIntervals.push(intervalId);
    }
  });
}

/**
 * Initialize RSS ticker with pause/resume functionality
 */
function initRssticker() {
  if (typeof window.aRSS !== "undefined" && window.aRSS.length > 0) {
    // Dynamically create the RSS ticker div
    const rssTicker = document.createElement("div");
    rssTicker.id = "rss-ticker";
    rssTicker.className = "rss-ticker";

    const rssTickerContent = document.createElement("div");
    rssTickerContent.id = "rss-ticker-content";
    rssTickerContent.className = "rss-ticker-content";

    rssTicker.appendChild(rssTickerContent);
    document.body.appendChild(rssTicker); // Add the ticker to the body

    // Call the function to fetch and display RSS feeds
    fetchAndDisplayRss();

    // Add event listeners for pause and resume functionality
    rssTickerContent.addEventListener("mouseenter", () => {
      rssTickerContent.style.animationPlayState = "paused";
    });

    rssTickerContent.addEventListener("mouseleave", () => {
      rssTickerContent.style.animationPlayState = "running";
    });
  }
}
