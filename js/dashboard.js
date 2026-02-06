/*
  Hamdash - Dashboard Core Functions
  License: MIT
  Copyright (c) 2026 Pablo Sabbag, VA3HDL
*/

// ============================================================================
// ROTATION TIMERS
// ============================================================================

/**
 * Start rotation timers for tiles
 */
function setRot() {
  if (typeof window.tileDelay === "undefined") {
    // If no individual tile rotation is defined then default is 30s or 30000ms
    window.aInt[0] = setInterval(() => slide(), 30000);
  } else {
    window.tileDelay.forEach(function (tile, i) {
      if (tile > 0) {
        window.aInt[i] = setInterval(() => slide(i), tile);
      }
    });
  }
}

/**
 * Stop rotation timers
 */
function rotStop() {
  if (typeof window.tileDelay === "undefined") {
    clearTimeout(window.aInt[0]);
  } else {
    window.tileDelay.forEach(function (tile, i) {
      clearTimeout(window.aInt[i]);
    });
  }
}

// ============================================================================
// IMAGE ZOOM
// ============================================================================

/**
 * Toggle zoom view for images
 * @param {Event} event - The triggering event
 */
function larger(event) {
  var targetElement = event.target || event.srcElement;

  if (window.largeShow == 1) {
    // Start refreshes
    setRot();
    window.largeShow = 0;
    document.getElementById("imgZoom").style.zIndex = -2;
  } else {
    // Stop refreshes
    window.stop();
    rotStop();
    window.largeShow = 1;

    // Extract index more robustly (handles ClickOverlayN or ImageN)
    const idMatch = targetElement.id.match(/\d+/);
    if (!idMatch) {
      console.warn("Could not find index for zoom", targetElement.id);
      return;
    }
    window.largeIdx = +idMatch[0];

    const zoomContainer = document.getElementById("imgZoom");
    const largeImg = document.getElementById("ImageLarge");

    zoomContainer.style.zIndex = 3;

    // Find the source from the actual tile image
    const sourceImg = document.getElementById("Image" + window.largeIdx);
    if (sourceImg) {
      // WHEELZOOM COMPATIBILITY:
      // If wheelzoom is active, sourceImg.src is a transparent placeholder.
      // The real image is in style.backgroundImage
      let realSrc = sourceImg.src;
      if (sourceImg.style.backgroundImage) {
        realSrc = sourceImg.style.backgroundImage.replace(/^url\(["']?/, "").replace(/["']?\)$/, "");
      }

      largeImg.src = realSrc;
    }
  }
}

// ============================================================================
// IMAGE ROTATION
// ============================================================================

/**
 * Manually rotate images on right-click
 * @param {Event} event - The triggering event
 */
function rotate(event) {
  event.preventDefault();
  var targetElement = event.target || event.srcElement;
  let i;
  if (window.largeShow == 1) {
    i = window.largeIdx;
  } else {
    i = +targetElement.id.match(/\d+/)[0];
  }
  imgRot(i);
}

/**
 * Rotate to the next image in a tile
 * @param {number} i - The tile index
 */
function imgRot(i) {
  if (window.aIMG[i].length > 2) {
    ++window.aIdx[i];
    if (window.aIdx[i] > window.aIMG[i].length - 1) {
      window.aIdx[i] = 1;
    }
  }

  // ROTATING TITLE LOGIC
  const titleDiv = document.getElementById("Title" + i);
  if (titleDiv && Array.isArray(window.aIMG[i][0])) {
    titleDiv.innerHTML = window.aIMG[i][0][window.aIdx[i] - 1] || "";
  }

  // Conditional overlay visibility (Lock/Unlock based on content type)
  const currentItem = window.aIMG[i][window.aIdx[i]];
  const overlay = document.getElementById('ClickOverlay' + i);
  if (overlay) {
    if (isVideo(currentItem) || isFrame(currentItem)) {
      overlay.style.display = 'block';
    } else {
      overlay.style.display = 'none';
    }
  }

  const vid = document.getElementById("Video" + i);
  const img = document.getElementById("Image" + i);
  const ifr = document.getElementById("iFrame" + i);

  const isImg = !isVideo(window.aIMG[i][window.aIdx[i]]) && !isFrame(window.aIMG[i][window.aIdx[i]]);
  const url = getImgURL(window.aIMG[i][window.aIdx[i]]);

  if (isVideo(window.aIMG[i][window.aIdx[i]])) {
    // Is video
    vid.src = url;
    vid.classList.remove("hidden");
    // Hide others
    img.classList.add("hidden");
    ifr.classList.add("hidden");
  } else if (isFrame(window.aIMG[i][window.aIdx[i]])) {
    // Is iFrame
    var src = window.aIMG[i][window.aIdx[i]];
    var newSrc = [];
    if (isDarkFrame(src)) {
      newSrc = src.split("iframedark|");
      ifr.style.filter = "invert(1) hue-rotate(180deg)";
    } else {
      newSrc = src.split("iframe|");
      ifr.style.filter = "none";
    }
    ifr.classList.remove("hidden");
    // Handle optional scale parameter: prefix|URL|SCALE
    var content = newSrc[1];
    var contentParts = content.split("|");
    ifr.src = contentParts[0];
    if (contentParts[1]) {
      ifr.style.transform = "scale(" + contentParts[1] + ")";
    }
    ifr.style.zIndex = 0;
    // Hide others
    vid.classList.add("hidden");
    img.classList.add("hidden");
  } else {
    // Is image
    var src = window.aIMG[i][window.aIdx[i]];
    if (isInvert(src)) {
      img.style.filter = "invert(1)";
      src = src.replace("invert|", "");
    } else {
      img.style.filter = "none";
    }
    img.src = getImgURL(src);
    img.classList.remove("hidden");
    // Hide others
    vid.classList.add("hidden");
    ifr.classList.add("hidden");
  }

  // FULL SCREEN ROTATION SUPPORT
  if (window.largeShow == 1 && i == window.largeIdx) {
    const largeImg = document.getElementById("ImageLarge");
    if (largeImg) {
      if (isImg) {
        largeImg.src = url;
      } else {
        // If we rotate into a non-image content, close the zoom view
        larger(event);
      }
    }
  }
}

/**
 * Automatically rotate images
 * @param {number} i - Optional tile index, if undefined rotates all
 */
function slide(i) {
  // check all tiles or one tile
  if (typeof i === "undefined") {
    // get the locations with multiple images
    window.aIMG.forEach(function (innerArray, i) {
      imgRot(i);
    });
  } else {
    // Only one tile as per timeout call
    imgRot(i);
  }
}

// ============================================================================
// TOP BAR
// ============================================================================

/**
 * Update the time on the top bar
 */
function updateTopBar() {
  const now = new Date();
  const localDate = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const localTime = now.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  });

  const utcDate = now.toISOString().slice(0, 10);
  const utcTime = now.toISOString().slice(11, 19) + " UTC";

  const topBarLeft = document.getElementById("topBarLeft");
  if (topBarLeft) topBarLeft.textContent = `${localDate} - ${localTime}`;

  const topBarCenter = document.getElementById("topBarCenter");
  if (topBarCenter) topBarCenter.textContent = window.topBarCenterText;

  const topBarRight = document.getElementById("topBarRight");
  if (topBarRight) topBarRight.textContent = `${utcDate} ${utcTime}`;
}

// Update every second
setInterval(updateTopBar, 1000);

// ============================================================================
// DASHBOARD INITIALIZATION
// ============================================================================

/**
 * Main dashboard initialization function
 */
function start() {
  // Configurable grid layout logic. Defaults to standard 4 columns by 3 rows
  var layout_cols = typeof window.layout_cols === "undefined" ? 4 : window.layout_cols;
  var layout_rows = typeof window.layout_rows === "undefined" ? 3 : window.layout_rows;
  var layout_grid = "auto ".repeat(layout_cols);
  var layout_width = 99.6 / layout_cols + "vw";
  var layout_height = 93 / layout_rows + "vh";
  var iTiles = layout_cols * layout_rows;

  document.documentElement.style.setProperty("--main-layout", layout_grid);
  document.documentElement.style.setProperty("--main-width", layout_width);
  document.documentElement.style.setProperty("--main-height", layout_height);

  const currentSettingsSource = document.getElementById("currentSettingsSource");
  if (currentSettingsSource) {
    currentSettingsSource.innerHTML = window.curSettingsSrc;
  }

  // Default variables initialization
  window.largeShow = 0;
  window.aIdx = [];
  window.aInt = [];
  for (var i = 1; i <= iTiles; i++) {
    window.aIdx.push(1);
    window.aInt.push(null);
  }

  if (!(window.aIMG.length == window.tileDelay.length && window.aIMG.length == iTiles)) {
    var msg = "\nError detected on config.js file!\n\n";
    msg += "The number of tile sources (" + window.aIMG.length + " in aIMG) and\n";
    msg += "the tile delay (" + window.tileDelay.length + " in tileDelay) arrays should match\n";
    msg += "the number of items each one contains and\n";
    msg += "the number of tiles used on the layout specified (" + iTiles + ").";
    alert(msg);
  }

  // Build menus
  buildMenus();

  // Build dashboard tiles
  buildDashboardTiles();

  // Initialize wheelzoom for all images
  if (typeof wheelzoom !== 'undefined') {
    wheelzoom(document.querySelectorAll("img"));
  }

  // Handle window resize
  window.addEventListener("resize", function () {
    "use strict";
    window.location.reload();
  });

  // Initialize RSS ticker
  initRssticker();

  // Start rotation timers
  setRot();
}

/**
 * Build the menu items
 */
function buildMenus() {
  var parentDivL = document.getElementById("myMenuL");
  var parentDivR = document.getElementById("myMenuR");

  if (!parentDivL || !parentDivR) return;

  // Prepend the Load Cfg option to the right side menu
  if (typeof window.disableLdCfg === "undefined" || !window.disableLdCfg) {
    window.aURL.unshift(
      ["FF0000", "Load Cfg", "", "1", "R"]
    );
  }

  // Prepend the default options to the menu
  window.aURL.unshift(
    ["add10d", "BACK", "", "1", "L"],
    ["0dd1a7", "Help", "", "1", "L"],
    ["add10d", "BACK", "", "1", "R"],
    ["ff9100", "Refresh", "?_=" + Date.now()],
  );

  // Append the Setup and Sources option to the right side menu
  if (typeof window.disableSetup === "undefined" || !window.disableSetup) {
    window.aURL.push(
      ["ff9100", "Setup", "", "1", "R"]
    );
  }

  window.aURL.push(
    ["0dd1a7", "Sources", "", "1", "R"]
  );

  // Append the Update option to the right side menu if needed
  if (typeof bUpdate !== 'undefined' && bUpdate) {
    window.aURL.push(["FF0000", "Update", "", "1", "R"]);
  }

  // Create menu items
  window.aURL.forEach(function (innerArray, index) {
    const title = String(innerArray[1] || '').trim();
    const link = String(innerArray[2] || '').trim();
    const titleLower = title.toLowerCase();
    const linkLower = link.toLowerCase();
    const coreNames = ['back', 'refresh', 'load cfg', 'help', 'setup', 'sources', 'update'];

    // Create a new div element
    var newDiv = document.createElement("div");
    var color = innerArray[0].replace("#", "");

    let type = 'user';
    if (coreNames.includes(titleLower))
      type = 'core';
    else if (titleLower.includes('.js') || linkLower.includes('.js'))
      type = 'config';

    newDiv.innerHTML = `<a href="#" class="menu-link menu-${type}" style="background-color:#${color};" onclick="MenuOpt(${index})">${innerArray[1]}</a>`;

    if (innerArray[4] == "R") {
      // Set some properties for the new div
      newDiv.id = "mySidenavR";
      newDiv.className = "sidenavR";
      parentDivR.appendChild(newDiv);
    } else {
      // Set some properties for the new div
      newDiv.id = "mySidenavL";
      newDiv.className = "sidenav";
      parentDivL.appendChild(newDiv);
    }
  });
}

/**
 * Build dashboard tiles
 */
function buildDashboardTiles() {
  var parentDiv = document.getElementById("dash");
  if (!parentDiv) return;

  // Create tiles
  window.aIMG.forEach(function (innerArray, index) {
    // Create a new div element
    var newDiv = document.createElement("div");
    newDiv.className = "image-container";
    newDiv.id = `box${index}`;

    // Add video placeholder containers
    const video = document.createElement("video");
    video.id = `Video${index}`;
    video.classList.add("media", "hidden");
    video.controls = true;
    video.muted = true;
    video.autoplay = true;
    video.loop = true;
    const source = document.createElement("source");

    // Create a new img element
    var newImg = document.createElement("img");
    newImg.id = `Image${index}`;
    newImg.classList.add("hidden");
    newImg.oncontextmenu = rotate;
    newImg.ondblclick = larger;

    // append newIframes iFrameNN
    var newFrame = document.createElement("iframe");
    newFrame.className = "iframe-tile";
    newFrame.id = `iFrame${index}`;
    newFrame.classList.add("hidden");

    // CLICK OVERLAY (Fix for missing right-click on video/iframe)
    var clickOverlay = document.createElement("div");
    clickOverlay.className = "click-overlay";
    clickOverlay.id = `ClickOverlay${index}`;
    clickOverlay.oncontextmenu = rotate;

    // Initial visibility
    const initialItem = innerArray[1];
    if (isVideo(initialItem) || isFrame(initialItem)) {
      clickOverlay.style.display = 'block';
    } else {
      clickOverlay.style.display = 'none';
    }

    clickOverlay.ondblclick = function (event) {
      const currentItem = window.aIMG[index][window.aIdx[index]];
      if (isVideo(currentItem) || isFrame(currentItem)) {
        // If it's a video or iframe, UNLOCK it instead of zooming
        console.log(`Unlocking tile ${index} for interaction`);
        this.style.display = 'none';
      } else {
        // If it's an image, trigger the standard zoom
        larger(event);
      }
    };

    // Initialize content based on type
    if (isVideo(innerArray[1])) {
      // Is a video
      video.classList.remove("hidden");
      source.src = innerArray[1];
      source.type = getVideoType(innerArray[1]);
      video.appendChild(source);
    } else if (isFrame(innerArray[1])) {
      // Is iFrame
      newFrame.classList.remove("hidden");
      var src = innerArray[1];
      var newSrc = [];
      if (isDarkFrame(src)) {
        newSrc = src.split("iframedark|");
        newFrame.style.filter = "invert(1) hue-rotate(180deg)";
      } else {
        newSrc = src.split("iframe|");
        newFrame.style.filter = "none";
      }
      var content = newSrc[1];
      var contentParts = content.split("|");
      newFrame.src = contentParts[0];
      if (contentParts[1]) {
        newFrame.style.transform = "scale(" + contentParts[1] + ")";
      }
      newFrame.style.zIndex = 0;
    } else {
      // Is an image
      newImg.classList.remove("hidden");
      var src = innerArray[1];
      if (isInvert(src)) {
        newImg.style.filter = "invert(1)";
        src = src.replace("invert|", "");
      } else {
        newImg.style.filter = "none";
      }
      newImg.src = getImgURL(src);
      newImg.onerror = function () {
        var text = "Failed to load image";
        console.log(text, this.src);
        if (this.src.includes("?")) {
          // Retry without passing variables first to see if fixes the error
          console.log("Trying without caching prevention");
          newImg.src = this.src.split("?")[0];
        } else {
          var el = `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="330">
              <g>
                <text style="font-size:34px; line-height:1.25; white-space:pre; fill:#ffaa00; fill-opacity:1; stroke:#ffaa00; stroke-opacity:1;">
                  <tspan x="100" y="150">${text}</tspan>
                  </text>
                  </g>
                  </svg>`;
          newImg.src = "data:image/svg+xml;base64," + window.btoa(el);
        }
      };
    }

    // Append elements to container
    newDiv.appendChild(video);
    newDiv.appendChild(newImg);
    newDiv.appendChild(newFrame);
    newDiv.appendChild(clickOverlay);
    parentDiv.appendChild(newDiv);

    // Create title element
    var newTtl = document.createElement("div");
    newTtl.className = "image-title";
    newTtl.id = `Title${index}`;

    let initialTitle = "";
    if (Array.isArray(innerArray[0])) {
      initialTitle = innerArray[0][0] || "";
    } else {
      initialTitle = innerArray[0];
    }

    if (initialTitle.length > 0 || Array.isArray(innerArray[0])) {
      newTtl.innerHTML = initialTitle;
      newDiv.appendChild(newTtl);
    }
  });
}

// Run update check on load
checkForUpdates();
