/*
  Hamdash - Configuration Management
  License: MIT
  Copyright (c) 2026 Pablo Sabbag, VA3HDL
*/

// ============================================================================
// DEFAULT CONFIGURATION
// ============================================================================

const defaults = {
  settingsSource: "localStorage",
  topBarCenterText: "CALLSIGN - Locator",
  layout_cols: 4,
  layout_rows: 3,
  aURL: [["2196F3", "Photos", "https://picsum.photos/", 1, "L"]],
  aImages: [
    ["Tile 1", ["https://picsum.photos/seed/picsum/200/300"], 30000],
    ["Tile 2", ["https://picsum.photos/seed/picsum/200/300"], 30000],
    ["Tile 3", ["https://picsum.photos/seed/picsum/200/300"], 30000],
    ["Tile 4", ["https://picsum.photos/seed/picsum/200/300"], 30000],
    ["Tile 5", ["https://picsum.photos/seed/picsum/200/300"], 30000],
    ["Tile 6", ["https://picsum.photos/seed/picsum/200/300"], 30000],
    ["Tile 7", ["https://picsum.photos/seed/picsum/200/300"], 30000],
    ["Tile 8", ["https://picsum.photos/seed/picsum/200/300"], 30000],
    ["Tile 9", ["https://picsum.photos/seed/picsum/200/300"], 30000],
    ["Tile 10", ["https://picsum.photos/seed/picsum/200/300"], 30000],
    ["Tile 11", ["https://picsum.photos/seed/picsum/200/300"], 30000],
    ["Tile 12", ["https://picsum.photos/seed/picsum/200/300"], 30000],
  ],
  aRSS: [
    ["https://www.amsat.org/feed/", 60],           // Example RSS feed
    ["https://daily.hamweekly.com/atom.xml", 60], // Example Atom feed
  ],
};

// Global settings object
let settings = JSON.parse(localStorage.getItem("hamdash_config")) || {
  ...defaults,
};

// ============================================================================
// SETTINGS INITIALIZATION
// ============================================================================

/**
 * Initialize settings page on DOMContentLoaded
 */
function initSettingsPage() {
  if (settings.settingsSource) {
    const radio = document.querySelector(
      `input[name="settingsSource"][value="${settings.settingsSource}"]`
    );
    if (radio) radio.checked = true;
  }

  // Load Initial Data
  const centerText = document.getElementById("CenterText");
  const layoutCols = document.getElementById("layout_cols");
  const layoutRows = document.getElementById("layout_rows");

  if (centerText) centerText.value = settings.topBarCenterText;
  if (layoutCols) layoutCols.value = settings.layout_cols;
  if (layoutRows) layoutRows.value = settings.layout_rows;

  updateMenuTable();
  updateFeedTable();
  adjustDashboardItems();

  // Setup event listeners
  setupSettingsEventListeners();
}

/**
 * Setup all settings page event listeners
 */
function setupSettingsEventListeners() {
  // Save Configuration
  const saveBtn = document.getElementById("saveConfig");
  if (saveBtn) {
    saveBtn.onclick = () => {
      settings.settingsSource = document.querySelector(
        'input[name="settingsSource"]:checked'
      ).value;
      settings.topBarCenterText = document.getElementById("CenterText").value;
      settings.layout_cols = parseInt(
        document.getElementById("layout_cols").value,
        10
      );
      settings.layout_rows = parseInt(
        document.getElementById("layout_rows").value,
        10
      );

      // Update aURL from the table
      const menuTableRows = document.querySelectorAll("#menuTable tbody tr");
      settings.aURL = Array.from(menuTableRows).map(row => {
        const cells = row.querySelectorAll("td");
        return [
          cells[0].querySelector("input").value,
          cells[1].querySelector("input").value,
          cells[2].querySelector("input").value,
          parseInt(cells[3].querySelector("input").value, 10),
          cells[4].querySelector("input").value
        ];
      });

      // Update aRSS from the table
      const feedTableRows = document.querySelectorAll("#feedTable tbody tr");
      settings.aRSS = Array.from(feedTableRows).map(row => {
        const cells = row.querySelectorAll("td");
        return [
          cells[0].querySelector("input").value,              // Feed URL
          parseInt(cells[1].querySelector("input").value, 10) // Refresh Interval
        ];
      });

      localStorage.setItem("hamdash_config", JSON.stringify(settings));
      alert("Settings saved!");
      updateInputs();
      updateMenuTable();
      updateFeedTable();
      adjustDashboardItems();
    };
  }

  // Reset to Defaults
  const resetBtn = document.getElementById("resetConfig");
  if (resetBtn) {
    resetBtn.onclick = () => {
      localStorage.setItem("hamdash_config", JSON.stringify(defaults));
      alert("Settings reset to defaults!");
      settings = { ...defaults };
      updateInputs();
      updateMenuTable();
      updateFeedTable();
      adjustDashboardItems();
    };
  }

  // Delete Configuration from local storage
  const deleteBtn = document.getElementById("deleteConfig");
  if (deleteBtn) {
    deleteBtn.onclick = () => {
      window.localStorage.removeItem('hamdash_config');
      alert("Deleted local storage settings!");
      updateInputs();
      updateMenuTable();
      updateFeedTable();
      adjustDashboardItems();
    };
  }

  // Backup Configuration
  const backupBtn = document.getElementById("backupConfig");
  if (backupBtn) {
    backupBtn.onclick = () => {
      const dataStr =
        "data:text/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(settings));
      const downloadAnchorNode = document.createElement("a");
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute(
        "download",
        "hamdash_config_backup.json"
      );
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    };
  }

  // Restore Configuration
  const restoreBtn = document.getElementById("restoreConfig");
  if (restoreBtn) {
    restoreBtn.onclick = () => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "application/json";
      input.onchange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          settings = JSON.parse(e.target.result);
          alert("\nSettings restored from backup!\n\nRemember to Save Settings to Local Storage, Backup, or Export\n\nif you want to make changes permanent.");
          updateInputs();
          updateMenuTable();
          updateFeedTable();
          adjustDashboardItems();
        };
        reader.readAsText(file);
      };
      input.click();
    };
  }

  // Import config.js
  const importBtn = document.getElementById("importConfig");
  if (importBtn) {
    importBtn.onclick = () => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".js";
      input.onchange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          // Wrap the content in an IIFE to avoid polluting the global scope
          const configScript = `(function() {
              ${e.target.result}
              return {
                topBarCenterText,
                layout_cols,
                layout_rows,
                aURL,
                aIMG,
                aRSS,
                tileDelay
              };
            })()`;

          // Evaluate the IIFE and get the variables
          const config = eval(configScript);

          // Filter out sub-arrays from aURL containing "BACK" or "Refresh"
          const filteredAURL = config.aURL.filter(
            (item) =>
              !item.some(
                (subItem) =>
                  typeof subItem === "string" &&
                  (subItem.includes("BACK") ||
                    subItem.includes("Back") ||
                    subItem.includes("Refresh") ||
                    subItem.includes("Sources") ||
                    subItem.includes("Update") ||
                    subItem.includes("Help"))
              )
          );

          // Create a JSON structure from the variables
          settings = {
            topBarCenterText: config.topBarCenterText,
            layout_cols: config.layout_cols,
            layout_rows: config.layout_rows,
            aURL: filteredAURL,
            aImages: config.aIMG.map((item, index) => {
              // Arrange all items from second to last in a sub-array
              const [first, ...rest] = item;
              return [first, rest, config.tileDelay[index]];
            }),
            aRSS: config.aRSS,
            settingsSource: "localStorage",
          };
          alert("\nSettings imported from config.js!\n\nRemember to Save Settings to Local Storage, Backup, or Export\n\nif you want to make changes permanent.");
          updateInputs();
          updateMenuTable();
          updateFeedTable();
          adjustDashboardItems();
        };
        reader.readAsText(file);
      };
      input.click();
    };
  }

  // Export to config.js
  const exportBtn = document.getElementById("exportConfig");
  if (exportBtn) {
    exportBtn.onclick = () => {
      const configJSContent = `// CUT START
var disableSetup = false; // Manually set to true to disable setup page menu option
var topBarCenterText = "${settings.topBarCenterText}";

// Grid layout desired
var layout_cols = ${settings.layout_cols};
var layout_rows = ${settings.layout_rows};

// Menu items
// Structure is as follows: HTML Color code, Option, target URL, scaling 1=Original Size, side (optional, nothing is Left, "R" is Right)
// The values are [color code, menu text, target link, scale factor, side],
// add new lines following the structure for extra menu options. The comma at the end is important!
var aURL = ${JSON.stringify(settings.aURL, null, 2)};

// Feed items
// Structure is as follows: target URL
// The values are [target link]
var aRSS = ${JSON.stringify(settings.aRSS, null, 2)};

// Dashboard Tiles items
// Tile Structure is Title, Source URL
// To display a website on the tiles use "iframe|" keyword before the tile URL
// [Title, Source URL],
// the comma at the end is important!
var aIMG = ${JSON.stringify(settings.aImages.map(item => [item[0], ...item[1].flat()]), null, 2)};

// Image rotation intervals in milliseconds per tile - If the line below is commented, tiles will be rotated every 5000 milliseconds (5s)
var tileDelay = ${JSON.stringify(settings.aImages.map(item => item[2]), null, 2)};

// CUT END`;

      const dataStr = "data:text/javascript;charset=utf-8," + encodeURIComponent(configJSContent);
      const downloadAnchorNode = document.createElement("a");
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", "config.js");
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    };
  }

  // Add New Menu Item
  const addMenuBtn = document.getElementById("addMenuItem");
  if (addMenuBtn) {
    addMenuBtn.onclick = () => {
      settings.aURL.push(["", "", "", "", ""]);
      updateMenuTable();
    };
  }

  // Add New Feed Item
  const addFeedBtn = document.getElementById("addFeedItem");
  if (addFeedBtn) {
    addFeedBtn.onclick = () => {
      settings.aRSS.push([""]);
      updateFeedTable();
    };
  }

  // Update Dashboard Items When Layout Changes
  const layoutCols = document.getElementById("layout_cols");
  const layoutRows = document.getElementById("layout_rows");

  if (layoutCols) {
    layoutCols.addEventListener("change", () => {
      settings.layout_cols = parseInt(layoutCols.value, 10);
      adjustDashboardItems();
    });
  }

  if (layoutRows) {
    layoutRows.addEventListener("change", () => {
      settings.layout_rows = parseInt(layoutRows.value, 10);
      adjustDashboardItems();
    });
  }

  // Add onblur event listeners for live updates
  const centerText = document.getElementById("CenterText");
  if (centerText) {
    centerText.onblur = updateValue;
  }
  if (layoutCols) {
    layoutCols.onblur = updateValue;
  }
  if (layoutRows) {
    layoutRows.onblur = updateValue;
  }
}

// ============================================================================
// TABLE MANAGEMENT
// ============================================================================

/**
 * Update dashboard items to match the current layout
 */
function adjustDashboardItems() {
  const totalItems = settings.layout_cols * settings.layout_rows;
  const currentItems = settings.aImages.length;

  if (currentItems < totalItems) {
    // Add new placeholders if there are fewer items than needed
    for (let i = currentItems; i < totalItems; i++) {
      settings.aImages.push(["", [""], 5000]); // Default title, image array, and rotation interval
    }
  } else if (currentItems > totalItems) {
    // Remove excess items
    settings.aImages.splice(totalItems);
  }

  updateTable("dashboardTable", settings.aImages, [
    "Tile Title",
    "Tile URLs",
    "URL Rotation Interval (ms)",
  ]);
}

/**
 * Update the menu items table
 */
function updateMenuTable() {
  updateTable("menuTable", settings.aURL, [
    "Color",
    "Text",
    "URL",
    "Scale",
    "Side",
  ]);
}

/**
 * Update the feed items table
 */
function updateFeedTable() {
  updateTable("feedTable", settings.aRSS, [
    "Feed URL",
    "Refresh Interval (minutes)",
  ]);
}

/**
 * Update a table with data
 * @param {string} tableId - The ID of the table
 * @param {Array} data - The data to display
 * @param {Array} columns - The column headers
 */
function updateTable(tableId, data, columns) {
  const tbody = document.querySelector(`#${tableId} tbody`);
  if (!tbody) return;

  tbody.innerHTML = "";
  data.forEach((item, index) => {
    const row = document.createElement("tr");
    columns.forEach((col, colIndex) => {
      const cell = document.createElement("td");
      if (tableId == "menuTable" && colIndex == 0) {                        // Color column for Menu options
        const colorInput = document.createElement("input");
        colorInput.type = "color";
        colorInput.value = "#" + item[colIndex].replace("#", "");
        colorInput.onchange = (e) => (item[colIndex] = e.target.value);
        cell.appendChild(colorInput);
      } else {
        if (Array.isArray(item[colIndex])) {
          // Handle array of image URLs
          const container = document.createElement("div");
          item[colIndex].forEach((url, urlIndex) => {
            const textarea = document.createElement("input");
            textarea.type =
              getColumnHeaderTitle(tableId, colIndex) === ""
                ? "number"
                : "text";
            textarea.value = url;
            textarea.onchange = (e) =>
              (item[colIndex][urlIndex] = e.target.value);
            container.appendChild(textarea);
            const removeBtn = document.createElement("button");
            removeBtn.textContent = "Remove URL";
            removeBtn.onclick = () => {
              item[colIndex].splice(urlIndex, 1);
              updateTable(tableId, data, columns);
            };
            container.appendChild(document.createElement("br"));
            container.appendChild(removeBtn);
            container.appendChild(document.createElement("br"));
          });
          const addBtn = document.createElement("button");
          addBtn.textContent = "Add URL";
          addBtn.onclick = () => {
            item[colIndex].push("");
            updateTable(tableId, data, columns);
          };
          container.appendChild(addBtn);
          cell.appendChild(container);
        } else {
          const input = document.createElement("input");
          switch (getColumnHeaderTitle(tableId, colIndex)) {
            case "Scale":
              input.type = "number";
              break;
            case "URL Rotation Interval (ms)":
              input.type = "number";
              break;
            default:
              input.type = "text";
          }
          input.value = item[colIndex];
          input.onchange = (e) =>
          (item[colIndex] =
            colIndex === 2 && tableId === "dashboardTable"
              ? parseInt(e.target.value, 10)
              : e.target.value);

          // ADD CONVERT TO ARRAY BUTTON FOR TITLES
          if (tableId === "dashboardTable" && colIndex === 0 && !Array.isArray(item[colIndex])) {
            const convertBtn = document.createElement("button");
            convertBtn.textContent = "Convert to Array";
            convertBtn.style.fontSize = "10px";
            convertBtn.style.height = "18px";
            convertBtn.onclick = () => {
              item[colIndex] = [item[colIndex]];
              updateTable(tableId, data, columns);
            };
            cell.appendChild(document.createElement("br"));
            cell.appendChild(convertBtn);
          }

          cell.appendChild(input);
        }
      }
      row.appendChild(cell);
    });

    const actionsCell = document.createElement("td");
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => {
      data.splice(index, 1);
      updateTable(tableId, data, columns);
      adjustDashboardItems();
    };
    actionsCell.appendChild(deleteBtn);
    row.appendChild(actionsCell);

    tbody.appendChild(row);
  });
}

// ============================================================================
// INPUT UPDATES
// ============================================================================

/**
 * Update input fields with current settings
 */
function updateInputs() {
  if (settings.settingsSource) {
    const radio = document.querySelector(
      `input[name="settingsSource"][value="${settings.settingsSource}"]`
    );
    if (radio) radio.checked = true;
  }

  const centerText = document.getElementById("CenterText");
  const layoutCols = document.getElementById("layout_cols");
  const layoutRows = document.getElementById("layout_rows");

  if (centerText) centerText.value = settings.topBarCenterText;
  if (layoutCols) layoutCols.value = settings.layout_cols;
  if (layoutRows) layoutRows.value = settings.layout_rows;
}

/**
 * Update the display text variables
 */
function updateValue() {
  const centerText = document.getElementById('CenterText');
  const layoutCols = document.getElementById('layout_cols');
  const layoutRows = document.getElementById('layout_rows');

  if (centerText && layoutCols && layoutRows) {
    window.topBarCenterText = centerText.value;
    window.layout_cols = layoutCols.value;
    window.layout_rows = layoutRows.value;

    const topBarCenter = document.getElementById('topBarCenter');
    if (topBarCenter) topBarCenter.textContent = window.topBarCenterText;
  }
}

// ============================================================================
// MINIMAL CONFIGURATION
// ============================================================================

/**
 * Set up minimal configuration when no config is available
 */
function minimalConfiguration() {
  // Default settings
  window.disableSetup = false;
  window.curSettingsSrc = "None";
  window.topBarCenterText = "Use 'Setup' to configure your Ham Radio Dashboard";
  window.layout_cols = 0;
  window.layout_rows = 0;
  window.aURL = [];
  window.aIMG = [];
  window.aRSS = [];
  window.tileDelay = [];
  start();
}

// ============================================================================
// PROCESS CONFIG
// ============================================================================

/**
 * Process configuration and set window variables
 * @param {Object} configSettings - The settings to process
 */
function processConfig(configSettings) {
  // Handle dynamic placeholders
  configSettings = replaceDatePlaceholders(configSettings);

  // Copy settings to window variables
  window.settingsSource = configSettings.settingsSource || "file";

  if (configSettings.disableSetup !== undefined) window.disableSetup = configSettings.disableSetup;
  if (configSettings.topBarCenterText) window.topBarCenterText = configSettings.topBarCenterText;
  if (configSettings.layout_cols) window.layout_cols = configSettings.layout_cols;
  if (configSettings.layout_rows) window.layout_rows = configSettings.layout_rows;
  if (configSettings.aURL) window.aURL = configSettings.aURL;
  if (configSettings.aRSS) window.aRSS = configSettings.aRSS;

  // Handle aIMG (supports both nested [Title, [Urls], Delay] and flat [Title, Url1, Url2...] formats)
  if (configSettings.aIMG) {
    window.aIMG = [];
    window.tileDelay = [];

    JSON.parse(JSON.stringify(configSettings.aIMG)).forEach((subArray) => {
      // subArray is [Title, [Urls], Delay]

      // Extract delay
      let delay = 30000;
      if (subArray.length >= 3) {
        delay = subArray[2];
      }
      window.tileDelay.push(delay);

      // Extract URLs and flatten
      // The main logic expects aIMG as [Title, Url1, Url2...]
      let flattened = [subArray[0]]; // Title
      if (Array.isArray(subArray[1])) {
        flattened.push(...subArray[1]);
      } else {
        flattened.push(subArray[1]);
      }
      window.aIMG.push(flattened);
    });
  } else if (configSettings.aImages) {
    // Fallback for old aImages (internal format)
    window.aIMG = [];
    window.tileDelay = [];

    JSON.parse(JSON.stringify(configSettings.aImages)).forEach((subArray) => {
      // subArray is [Title, [Urls], Delay]

      // Extract delay
      let delay = 30000;
      if (subArray.length >= 3) {
        delay = subArray[2];
      }
      window.tileDelay.push(delay);

      // Extract URLs and flatten
      let flattened = [subArray[0]]; // Title
      if (Array.isArray(subArray[1])) {
        flattened.push(...subArray[1]);
      } else {
        flattened.push(subArray[1]);
      }
      window.aIMG.push(flattened);
    });
  }

  start();
}

// Initialize settings page when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSettingsPage);
} else {
  initSettingsPage();
}
