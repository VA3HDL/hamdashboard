/*
  Hamdash - Menu Options Handling
  License: MIT
  Copyright (c) 2026 Pablo Sabbag, VA3HDL
*/

/**
 * Handle menu option clicks
 * Shows embedded websites, handles navigation, and manages special menu actions
 * @param {number} num - The menu item index
 */
function MenuOpt(num) {
  window.stop();
  rotStop();

  // If the menu title or URL is a config filename (e.g. "satellite.js" or "traffic.json"), reload with breadcrumb tracking
  const title = String(window.aURL[num][1] || "");
  const link = String(window.aURL[num][2] || "");
  const menuText = title;

  // Special handling for PREVIOUS button - use buildPreviousUrl() to truncate breadcrumb
  if (menuText.toUpperCase() === "PREVIOUS" || menuText.toUpperCase() === "PREV") {
    const previousUrl = buildPreviousUrl();
    window.location.href = previousUrl;
    return;
  }

  // Check if this is a config file navigation (.js or .json)
  const isConfigFile = title.toLowerCase().endsWith(".js") ||
    title.toLowerCase().endsWith(".json") ||
    link.toLowerCase().endsWith(".js") ||
    link.toLowerCase().endsWith(".json");

  if (isConfigFile) {
    // Prefer the explicit URL if it contains the filename, otherwise use the title
    const filename = (link.toLowerCase().endsWith(".js") || link.toLowerCase().endsWith(".json")) ? link : title;

    // Use buildNavigationUrl for breadcrumb-aware navigation
    const newUrl = buildNavigationUrl(filename);
    window.location.href = newUrl;
    return;
  }

  if (menuText.toLowerCase() == "refresh") {
    location.reload();
    setRot();
  } else if (menuText.toLowerCase() == "load cfg") {
    // open file picker and reload page with ?config=<filename>
    openConfigFileDialog();
    return;
  } else if (menuText.toLowerCase() == "help") {
    alert(help);
  } else if (menuText.toLowerCase() == "setup") {
    // Configure visualization
    const fullScreen = document.getElementById("FullScreen");
    const fixedSection = document.getElementById("fixedSection");
    const settingsPage = document.getElementById("settingsPage");
    const iFrameContainer = document.getElementById("iFrameContainer");

    if (fullScreen) fullScreen.style.display = "none";
    if (fixedSection) fixedSection.style.display = "block";
    if (settingsPage) settingsPage.style.display = "block";
    if (iFrameContainer) {
      iFrameContainer.style.zIndex = 1;
      iFrameContainer.style.backgroundColor = "black";
    }

    if (window.curSettingsSrc === "local") {
      const radio = document.querySelector(`input[name="settingsSource"][value="localStorage"]`);
      if (radio) radio.checked = true;
    } else if (window.curSettingsSrc && window.curSettingsSrc.includes("config.js")) {
      const radio = document.querySelector(`input[name="settingsSource"][value="file"]`);
      if (radio) radio.checked = true;
    }

    if (typeof window.settings === 'undefined') {
      window.settings = {};
    }
    window.settings.topBarCenterText = window.topBarCenterText;
    window.settings.layout_cols = window.layout_cols;
    window.settings.layout_rows = window.layout_rows;

    const centerText = document.getElementById("CenterText");
    const layoutCols = document.getElementById("layout_cols");
    const layoutRows = document.getElementById("layout_rows");

    if (centerText) centerText.value = window.settings.topBarCenterText;
    if (layoutCols) layoutCols.value = window.settings.layout_cols;
    if (layoutRows) layoutRows.value = window.settings.layout_rows;

    // Filter out default menu items
    const filteredAURL = window.aURL.filter(
      (item) =>
        !item.some(
          (subItem) =>
            typeof subItem === "string" &&
            (subItem.includes("BACK") ||
              subItem.includes("Back") ||
              subItem.includes("Refresh") ||
              subItem.includes("Setup") ||
              subItem.includes("Sources") ||
              subItem.includes("Update") ||
              subItem.includes("Help"))
        )
    );
    window.settings.aURL = filteredAURL;
    window.settings.aImages = window.aIMG.map((item, index) => {
      const [first, ...rest] = item;
      return [first, rest, window.tileDelay[index]];
    });
    window.settings.aRSS = window.aRSS;

    // Update the visualization on the Setup page
    if (typeof updateMenuTable === 'function') updateMenuTable();
    if (typeof updateFeedTable === 'function') updateFeedTable();
    if (typeof adjustDashboardItems === 'function') adjustDashboardItems();
  } else if (menuText.toLowerCase() == "sources") {
    const array1 = document.getElementById("array1");
    const array2 = document.getElementById("array2");
    const array3 = document.getElementById("array3");
    const array4 = document.getElementById("array4");
    const overlay = document.getElementById("overlay");

    if (array1) array1.innerHTML = "<br>" + formatArray(window.aURL) + "<br><br>";
    if (array2) array2.innerHTML = "<br>" + formatArray(window.aIMG) + "<br><br>";
    if (array3) array3.innerHTML = "<br>" + formatArray(window.aRSS) + "<br><br>";
    if (array4) {
      array4.innerHTML = `<br>Copyright (c) 2026 Pablo Sabbag, VA3HDL | Open Source License: MIT<br>
        <br>Dashboard codebase version: ${currentVersion}<br><br>`;
    }
    if (overlay) overlay.style.display = "block";
  } else if (menuText.toLowerCase() == "update") {
    window.open("https://github.com/VA3HDL/hamdashboard/releases/", "_blank").focus();
  } else if (menuText.toLowerCase() == "back") {
    const fullScreen = document.getElementById("FullScreen");
    const settingsPage = document.getElementById("settingsPage");
    const iFrameContainer = document.getElementById("iFrameContainer");

    if (fullScreen) {
      fullScreen.src = "about:blank";
      fullScreen.style.display = "none";
    }
    if (iFrameContainer) {
      iFrameContainer.style.zIndex = -2;
      iFrameContainer.style.backgroundColor = "black";
    }
    if (settingsPage) settingsPage.style.display = "none";
    setRot();
  } else {
    const iFrameContainer = document.getElementById("iFrameContainer");
    const fullScreen = document.getElementById("FullScreen");

    if (iFrameContainer) iFrameContainer.style.zIndex = 1;
    if (fullScreen) fullScreen.style.display = "block";

    var src = window.aURL[num][2];
    if (isDark(src)) {
      fullScreen.style.filter = "invert(1) hue-rotate(180deg)";
      src = src.replace("dark|", "");
    } else {
      fullScreen.style.filter = "none";
    }
    fullScreen.src = src;
    fullScreen.style.transform = "scale(" + window.aURL[num][3] + ")";
  }
}

/**
 * Hide the overlay (sources display)
 */
function hideOverlay() {
  const overlay = document.getElementById("overlay");
  if (overlay) overlay.style.display = "none";
}
