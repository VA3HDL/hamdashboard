/*
  Hamdash - Utility Functions
  License: MIT
  Copyright (c) 2026 Pablo Sabbag, VA3HDL
*/

// ============================================================================
// TABLE UTILITIES
// ============================================================================

/**
 * Get the title of a column header from a table
 * @param {string} tableId - The ID of the table
 * @param {number} columnNumber - The column number (0-indexed)
 * @returns {string|null} The column header title or null if not found
 */
function getColumnHeaderTitle(tableId, columnNumber) {
  const table = document.getElementById(tableId);
  if (!table) {
    console.error(`Table with id ${tableId} not found.`);
    return null;
  }

  const headers = table.querySelectorAll("thead th");
  if (columnNumber < 0 || columnNumber >= headers.length) {
    console.error(`Invalid column number ${columnNumber}.`);
    return null;
  }

  return headers[columnNumber].textContent;
}

// ============================================================================
// DATE PLACEHOLDER UTILITIES
// ============================================================================

/**
 * Replace date placeholders in an object or string
 * @param {string|object|Array} obj - The object to process
 * @returns {string|object|Array} The object with replaced dates
 */
function replaceDatePlaceholders(obj) {
  const now = new Date();
  const YYYYMMDD = now.toISOString().slice(0, 10).replace(/-/g, '');
  const DATE_ISO = now.toISOString().slice(0, 10);

  if (typeof obj === 'string') {
    return obj.replace(/{{YYYYMMDD}}/g, YYYYMMDD).replace(/{{DATE_ISO}}/g, DATE_ISO);
  } else if (Array.isArray(obj)) {
    return obj.map(replaceDatePlaceholders);
  } else if (typeof obj === 'object' && obj !== null) {
    Object.keys(obj).forEach(key => {
      obj[key] = replaceDatePlaceholders(obj[key]);
    });
    return obj;
  }
  return obj;
}

// ============================================================================
// VIDEO/MEDIA TYPE DETECTION
// ============================================================================

const videoExtensions = [".mp4", ".webm", ".ogg", ".ogv"];

/**
 * Check if a source is a video file
 * @param {string} src - The source URL
 * @returns {boolean} True if the source is a video
 */
function isVideo(src) {
  return videoExtensions.some((ext) => src.includes(ext));
}

/**
 * Get the MIME type of a video file
 * @param {string} src - The source URL
 * @returns {string} The MIME type
 */
function getVideoType(src) {
  if (src.includes(".mp4")) return "video/mp4";
  if (src.includes(".webm")) return "video/webm";
  if (src.includes(".ogg") || src.includes(".ogv")) return "video/ogg";
  return "";
}

/**
 * Check if a source is an iframe
 * @param {string} src - The source URL
 * @returns {boolean} True if the source is an iframe
 */
function isFrame(src) {
  return src.includes("iframe|") || src.includes("iframedark|");
}

/**
 * Check if a source is a dark-themed iframe
 * @param {string} src - The source URL
 * @returns {boolean} True if the source is a dark iframe
 */
function isDarkFrame(src) {
  return src.includes("iframedark|");
}

/**
 * Check if a source has dark mode
 * @param {string} src - The source URL
 * @returns {boolean} True if the source has dark mode
 */
function isDark(src) {
  return src.includes("dark|");
}

/**
 * Check if a source should be inverted
 * @param {string} src - The source URL
 * @returns {boolean} True if the source should be inverted
 */
function isInvert(src) {
  return src.includes("invert|");
}

// ============================================================================
// IMAGE URL UTILITIES
// ============================================================================

/**
 * Get an image URL with cache prevention
 * @param {string} url - The image URL
 * @returns {string} The URL with cache prevention parameter
 */
function getImgURL(url) {
  return url.includes("?") ? url : url + "?_=" + Date.now();
}

// ============================================================================
// ARRAY FORMATTING UTILITIES
// ============================================================================

/**
 * Format an array with HTML line breaks (old format)
 * @param {Array} arr - The array to format
 * @returns {string} The formatted string
 */
function oldformatArray(arr) {
  return arr.join("<br>");
}

/**
 * Format an array for display
 * @param {Array} arr - The array to format
 * @returns {string} The formatted string
 */
function formatArray(arr) {
  return arr
    .map((innerArray) =>
      innerArray
        .map((item) => (typeof item === "string" ? `"${item}"` : item))
        .join(", ")
    )
    .join("<br>");
}

// ============================================================================
// RSS TICKER UTILITIES
// ============================================================================

/**
 * Update the RSS ticker speed based on content width
 */
function updateTickerSpeed() {
  const rssTickerContent = document.querySelector(".rss-ticker-content");
  if (rssTickerContent) {
    // Calculate the width of the content and the container
    const contentWidth = rssTickerContent.scrollWidth;
    const containerWidth = rssTickerContent.parentElement.offsetWidth;

    // Define a base speed (e.g., 180px per second)
    const baseSpeed = 180; // pixels per second

    // Calculate the duration based on the content width
    const duration = (contentWidth + containerWidth) / baseSpeed;

    // Update the CSS variable for the animation duration
    rssTickerContent.style.setProperty("--ticker-duration", `${duration}s`);
  }
}
