/*
  Hamdash - Navigation & Config Loading
  License: MIT
  Copyright (c) 2026 Pablo Sabbag, VA3HDL
*/

// ============================================================================
// HELP & VERSION INFO
// ============================================================================

var help = "Double click on an image to expand to full screen.\n";
help += "Double click again to close full screen view.\n";
help += "Right click on an image to display the next one.\n";
help += "Images rotates every 30 seconds automatically by default.\n";

const currentVersion = "v2026.01.30";
let bUpdate = false;

/**
 * Get the latest version from GitHub
 * @returns {Promise<string>} The latest version tag
 */
async function getLatestVersion() {
  try {
    const response = await fetch(
      "https://api.github.com/repos/VA3HDL/hamdashboard/releases/latest"
    );
    const data = await response.json();
    return data.tag_name;
  } catch (error) {
    console.error("Error fetching the latest version:", error);
    return currentVersion; // Fallback to the current version if there's an error
  }
}

/**
 * Check if a new version is available
 * @returns {boolean} True if a new version is available
 */
function isNewVersionAvailable(currentVersion, latestVersion) {
  return currentVersion !== latestVersion;
}

/**
 * Check for updates and set the bUpdate flag
 */
async function checkForUpdates() {
  const latestVersion = await getLatestVersion();
  if (isNewVersionAvailable(currentVersion, latestVersion)) {
    bUpdate = true;
  }
}

// ============================================================================
// BREADCRUMB NAVIGATION SYSTEM
// ============================================================================

/**
 * Parse and validate the breadcrumb parameter from the current URL
 * @returns {Array<string>} Array of config filenames in the breadcrumb trail
 */
function getCurrentBreadcrumb() {
  const urlParams = new URLSearchParams(window.location.search);
  const breadcrumbParam = urlParams.get('breadcrumb');

  if (!breadcrumbParam) return [];

  // Handle both encoded (%2B) and unencoded (+) separators
  // URLSearchParams automatically decodes %2B to +, so we can split on +
  const configs = breadcrumbParam.split('+').map(c => c.trim()).filter(c => c);

  // Validate config files (must end with .js or .json)
  const validated = configs.filter(config => {
    const valid = config.toLowerCase().endsWith('.js') || config.toLowerCase().endsWith('.json');
    if (!valid) {
      console.warn(`Breadcrumb: Skipping invalid config entry: ${config}`);
    }
    return valid;
  });

  return validated;
}

/**
 * Build a navigation URL with proper breadcrumb tracking
 * @param {string} targetConfig - The config file to navigate to
 * @returns {string} Constructed URL with breadcrumb parameter
 */
function buildNavigationUrl(targetConfig) {
  const urlParams = new URLSearchParams(window.location.search);
  const currentConfig = urlParams.get('config') || 'config.js';

  // Get current breadcrumb trail
  let breadcrumb = getCurrentBreadcrumb();

  // Determine if current config is root
  const isCurrentRoot = (currentConfig === 'config.js' || currentConfig === 'config.json');
  const isTargetRoot = (targetConfig === 'config.js' || targetConfig === 'config.json');

  // If navigating to root, clear breadcrumb
  if (isTargetRoot) {
    return window.location.pathname + '?config=' + encodeURIComponent(targetConfig);
  }

  // Add current config to breadcrumb if not already root
  if (!isCurrentRoot) {
    // Prevent duplicate entries
    if (!breadcrumb.includes(currentConfig)) {
      breadcrumb.push(currentConfig);
    }
  } else {
    // If current is root, start fresh breadcrumb from root
    breadcrumb = [currentConfig];
  }

  // Limit breadcrumb depth to 10 items
  if (breadcrumb.length > 10) {
    breadcrumb = breadcrumb.slice(-10);
  }

  // Build URL with breadcrumb parameter
  const breadcrumbStr = breadcrumb.join('+');
  return window.location.pathname +
    '?breadcrumb=' + encodeURIComponent(breadcrumbStr) +
    '&config=' + encodeURIComponent(targetConfig);
}

/**
 * Build URL for navigating back to previous config in breadcrumb trail
 * @returns {string} URL for back navigation
 */
function buildPreviousUrl() {
  const breadcrumb = getCurrentBreadcrumb();

  if (breadcrumb.length === 0) {
    // No breadcrumb, go to default root
    return window.location.pathname + '?config=config.js';
  }

  // Get the last config from breadcrumb (the one to navigate to)
  const previousConfig = breadcrumb[breadcrumb.length - 1];

  // Remove the last item to create truncated breadcrumb
  const truncatedBreadcrumb = breadcrumb.slice(0, -1);

  if (truncatedBreadcrumb.length === 0) {
    // Going back to root, no breadcrumb needed
    return window.location.pathname + '?config=' + encodeURIComponent(previousConfig);
  }

  // Build URL with truncated breadcrumb
  const breadcrumbStr = truncatedBreadcrumb.join('+');
  return window.location.pathname +
    '?breadcrumb=' + encodeURIComponent(breadcrumbStr) +
    '&config=' + encodeURIComponent(previousConfig);
}

/**
 * Ensure the PREVIOUS menu item exists when there's breadcrumb history
 * @param {Object} settings - The settings object to modify
 */
function ensureBackMenuItem(settings) {
  // Get current breadcrumb trail
  const breadcrumb = getCurrentBreadcrumb();

  // Only add PREVIOUS menu item if we have breadcrumb history
  if (breadcrumb.length === 0) {
    // No breadcrumb history, no PREVIOUS menu needed
    return;
  }

  // Initialize aURL if not exists
  if (!settings.aURL) {
    settings.aURL = [];
  }

  // Check if PREVIOUS menu item already exists
  const hasPrevious = settings.aURL.some(item => {
    if (!Array.isArray(item)) return false;
    const title = String(item[1] || '').toLowerCase();
    return title === 'previous' || title === 'prev';
  });

  if (hasPrevious) {
    // Already has PREVIOUS menu item, skip
    return;
  }

  // Get the previous config filename (last item in breadcrumb)
  const previousConfig = breadcrumb[breadcrumb.length - 1];

  // Add PREVIOUS menu item with color #212ff3
  // Store just the config filename, MenuOpt() will handle the navigation
  console.log(`Adding PREVIOUS menu item for breadcrumb navigation (back to: ${previousConfig})`);
  settings.aURL.unshift(["212ff3", "PREVIOUS", previousConfig, "1", "R"]);
}

// ============================================================================
// CONFIG LOADING
// ============================================================================

/**
 * Load a JavaScript config file
 * @param {string} url - The URL of the config file
 * @param {Function} fallback - Fallback function if loading fails
 */
function loadScriptConfig(url, fallback) {
  const script = document.createElement("script");
  script.src = url;
  script.onload = async () => {
    console.log(`${url} loaded successfully (script)`);

    // CHECK FOR NEW JSONP-STYLE CONFIG
    if (window.hamdashConfig) {
      console.log("Found window.hamdashConfig (JSONP)");
      window.curSettingsSrc = `${url} (Data Object)`;
      const settings = window.hamdashConfig;

      // Ensure navigation
      ensureBackMenuItem(settings);

      processConfig(settings);
      // Clear it so it doesn't pollute subsequent loads
      window.hamdashConfig = undefined;
      return;
    }

    // wait for config to finish any async work (Legacy JS logic support)
    if (window.configReady && typeof window.configReady.then === "function") {
      try { await window.configReady; } catch (e) { console.warn("configReady rejected:", e); }
    }

    // Legacy: config.js likely set window variables directly
    window.curSettingsSrc = `${url} (Legacy JS)`;

    // We still want to ensure back menu item even for legacy JS files if possible
    // But for legacy, we have to inspect the global window.aURL
    if (window.aURL) {
      // Re-wrap in a temporary object to use our helper
      const tempSettings = { aURL: window.aURL };
      ensureBackMenuItem(tempSettings);
      window.aURL = tempSettings.aURL;
    }

    start();
  };
  script.onerror = (error) => {
    console.error(`Failed to load ${url}:`, error);
    if (fallback) {
      console.log("Attempting fallback...");
      fallback();
    } else {
      minimalConfiguration();
    }
  };
  document.head.appendChild(script);
}

/**
 * Load a JSON config file
 * @param {string} url - The URL of the config file
 * @param {Function} fallback - Fallback function if loading fails
 */
async function loadJsonConfig(url, fallback) {
  const isFileProtocol = window.location.protocol === "file:";
  if (isFileProtocol) {
    console.warn(`Loading JSON config ${url} via file:// protocol might fail due to CORS.`);
  }

  try {
    const response = await fetch(url + "?_=" + Date.now());
    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }
    const settings = await response.json();
    console.log(`${url} loaded successfully`);
    window.curSettingsSrc = `${url} (JSON)`;

    ensureBackMenuItem(settings);
    processConfig(settings);
  } catch (e) {
    console.error(`Failed to load ${url}:`, e);
    if (fallback) {
      console.log("Attempting fallback from JSON load...");
      fallback(e);
    } else {
      minimalConfiguration();
    }
  }
}

/**
 * Load configuration based on URL parameters or defaults
 */
async function loadConfig() {
  const urlParams = new URLSearchParams(window.location.search);
  let configParam = urlParams.get("config");

  // Smart config parameter cleaning: handle double-encoded URLs
  if (configParam) {
    // Check for double encoding (e.g., %253D instead of %3D)
    if (configParam.includes('%25')) {
      console.warn('Detected double-encoded URL, attempting to clean...');
      try {
        configParam = decodeURIComponent(configParam);
      } catch (e) {
        console.error('Failed to decode config parameter:', e);
      }
    }

    // Extract just the filename if it contains URL parameters or encoding issues
    // This handles cases like "config.js?breadcrumb=..." being passed as the config param
    if (configParam.includes('?')) {
      const parts = configParam.split('?');
      configParam = parts[0];
      console.warn(`Config parameter contained URL params, extracted: ${configParam}`);
    }
  }

  // Case 1: user specified a file
  if (configParam) {
    const isJson = configParam.toLowerCase().endsWith(".json");
    if (isJson) {
      loadJsonConfig(configParam, () => minimalConfiguration());
    } else {
      loadScriptConfig(configParam, () => minimalConfiguration());
    }
    return;
  }

  // Case 2: Default loading chain
  // Try config.js -> config.json -> Minimal
  console.log("No config specified, attempting default chain: config.js -> config.json");

  loadScriptConfig("config.js", () => {
    console.log("config.js failed, falling back to config.json");
    loadJsonConfig("config.json", () => {
      console.log("config.json failed, falling back to minimal");
      minimalConfiguration();
    });
  });
}

/**
 * Open OS file picker and reload page with the selected filename as ?config=<filename>
 */
function openConfigFileDialog() {
  let input = document.getElementById('configFileInput');
  if (!input) {
    input = document.createElement('input');
    input.type = 'file';
    input.accept = '.js,text/javascript,.json,application/json';
    input.id = 'configFileInput';
    input.style.display = 'none';
    input.addEventListener('change', (ev) => {
      const file = ev.target.files && ev.target.files[0];
      if (!file) return;
      const filename = file.name;
      // Use buildNavigationUrl to maintain breadcrumb chain
      const newUrl = buildNavigationUrl(filename);
      window.location.href = newUrl;
    });
    document.body.appendChild(input);
  }
  input.click();
}

/**
 * Main initialization function
 * Checks localStorage and loads appropriate configuration
 */
async function main() {
  try {
    // Check if settings exist in localStorage
    const settings = localStorage.getItem('hamdash_config');
    if (settings) {
      // console.log('Settings found in localStorage:', settings);
      console.log('Settings found in localStorage');
      // Parse the settings JSON string
      const parsedSettings = JSON.parse(settings);
      window.settingsSource = parsedSettings.settingsSource;

      if (window.settingsSource === 'localStorage') {
        console.log('Loading settings from localStorage');
        window.curSettingsSrc = "Browser Local Storage";
        processConfig(parsedSettings);
      } else {
        console.log('Settings found in localStorage but loading from file');
        loadConfig();
      }
    } else {
      console.log('No settings found in localStorage');
      loadConfig();
    }
  } catch (error) {
    console.error('Failed to load configuration:', error);
    loadConfig();
  }
}
