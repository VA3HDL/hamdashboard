# Ham Dashboard (hamdashboard)

Live demo: [Hamdash Demo](https://va3hdl.github.io/hamdash/)

This repository provides a simple, browser-based ham radio dashboard that displays images, maps, web pages, and feeds in a configurable grid. It is lightweight, easy to host, and suitable for use on a local computer, Raspberry Pi, or a static host such as GitHub Pages or Cloudflare Pages.

Quick demo videos:
- Original presentation: [YouTube - VA3HDL presentation](https://www.youtube.com/watch?v=sIdqMQTGNSc)
- Spanish overview: [YouTube - VA3HDL en español](https://www.youtube.com/watch?v=IBMxELofKVA)

## User-submitted public dashboards
These live dashboards were shared by members of the ham community:

- [BCAT N4TDX](https://qsl.net/n/n5ng/BCAT/) — Steve N5NG (Brevard County ARES)
  - Steve's config files (as .txt): <https://qsl.net/n5ng/config.txt> and <https://qsl.net/n5ng/HAM/config.txt>
- [FFX DEMS](https://kq4dne.github.io/WeatherDash/WeatherDash.html) — Sandy KQ4DNE
- [FFX ARES](https://kq4dne.github.io/hamdash/hamdash.html) — Sandy KQ4DNE
- [WA4MED](https://dashboard.wa4med.us/hamdash.html) — Matthew WA4MED
- [PY3TX](https://dashboard.py3tx.com/) — South America
- [VE7CAS](https://hamradio.smecher.bc.ca/) — Vancouver, BC
- [G0IKV](https://g0ikv.qsy.to/) — Southport, England
- [OK1SLM](https://www.qsl.net/ok1slm/) — Prague
- [VK3VSN](https://www.vicscan.com/hamdash/) — Melbourne, Australia
- [K6BCW](https://elihickox.com/radio/hamdashboard/hamdash.html) — San Francisco Bay Area
- [KN6PTQ](https://kn6ptq.com/) — San Francisco Bay Area
- [W2SZ](https://dashboard.w2sz.org/) — NE US
- [N2YQT](https://dashboard.tourge.net/) — NE US
- [KC2VWR](https://baef57ae.ham-desktop.pages.dev/) — NE US
- [KD2YFY](https://dash.kd2yfy.net/) — NE US
- [KD4VRD](https://hamdashboard-8fn.pages.dev/) — North Carolina
- [KD5PQJ](https://kd5pqj.com/dash/index.html) — Texas
- [N5GAH](http://n5gah.com/) — Texas
- [KJ7YYI](https://kj7yyi.net/ham-dash/) — Arizona
- [NQ0M](https://hamdash.nq0m.com/#) — Kansas
- [W3RDW](https://dashboard.w3rdw.radio/) — Ohio
- [W4QAL](https://w4qal.net/dashboard/index.html) — West Florida

## Quick start

1. Download the following files from this repository into a single folder: `hamdash.html`, `config.js`, and `wheelzoom.js`.
2. Open `hamdash.html` in your browser.
3. Use the right-side menu and select "Setup" to open the settings UI and configure your dashboard.
4. Alternatively, edit `config.js` in a text editor to set sources, menus, and layout.
5. Load configuration from the browser (Local Storage) or from `config.js`, then save your settings.

**Notes**
- For hosted (server) installations, store settings in `config.js` so the server serves the same configuration to all visitors.
- For personal use or testing, Local Storage keeps changes specific to your browser session.
- Now is possible to use a pure Json file format for the configuration load on hosted environments
- For file:// access (non-hosted usage) a newer JsonP-style format is available for the configuration load

## Settings UI

The settings UI provides buttons to manage configurations and backups:

<img src="https://github.com/VA3HDL/hamdashboard/blob/main/examples/settings_buttons.png?raw=true" width="800">

- Save Settings to Local Storage — Save current page settings in the browser.
- Reset to Defaults — Restore sample settings for testing.
- Backup Settings to JSON file — Download a JSON file with your settings.
- Restore Settings from JSON file — Load settings from a JSON backup.
- Import from `config.js` — Load settings defined in a `config.js` file (recommended for servers).
- Export to `config.js` — Export current settings in `config.js` format for hosting.

## Public dashboards and safety

The "Setup" UI cannot modify the server-side `config.js` file. When a visitor switches a public dashboard to Local Storage, the change affects only that visitor's browser. To hide the **Setup** option or **Load Cfg** option on public installations, add the following lines to your `config.js`:

```
const disableSetup = true;
const disableLdCfg = true;
```

## Video guides

- [Configuration instructions — Jason KM4ACK](https://youtu.be/9ZZXg60tN-o)
- [Raspberry Pi setup — Andreas M0FXB](https://www.youtube.com/watch?v=Km_vOCvCMFM)
- [Live stream — Frank KG6NLW](https://www.youtube.com/watch?v=rJHCpNHDbC0&t=140s)
- [Live stream — KM9G](https://www.youtube.com/watch?v=ohlHaSsf6B8=400s)
- [Ham Dashboard on Inovato Quadra — Peter KJ5AJB](https://www.youtube.com/watch?v=u07Oz-YSrQY)
- [French review — Jean-Benard F5SVP](https://www.youtube.com/watch?v=o9Dl9A5hqQI)
- [Spanish instructions — Jose EA8EE](https://www.youtube.com/watch?v=3CnsfB3zNuM)

## Docker

Michael Stevens maintains a Docker image: [michaelsteven/hamdashboard](https://registry.hub.docker.com/r/michaelsteven/hamdashboard)

## How to use

- Double-click an image to view full-screen; double-click again to close.
- Right-click an image to cycle to the next image (if multiple images are assigned to a tile).
- Tiles refresh independently (default refresh behavior: every 5 minutes for most sources).
- Tiles with iFrames: double click to unlock the tile and interact with the content

## Pi-Star iFrame embedding (fix)

If a remote site sets the `X-Frame-Options` header it may prevent embedding via iframes. On Pi-Star you can temporarily switch to read/write, edit the nginx security config, and restart nginx:

```bash
rpi-rw
sudo nano /etc/nginx/default.d/security.conf
# comment out: add_header X-Frame-Options  "SAMEORIGIN";

sudo systemctl restart nginx.service
```

This screenshot shows Pi-Star settings:

<img src="https://github.com/VA3HDL/hamdashboard/blob/main/examples/pistar.png?raw=true" width="400">

## iFrame tips

If the source server forbids embedding and you cannot change its headers, options are limited. A local proxy that strips the header can work but adds complexity. Use the online tool to test a URL before adding it to a tile: [iFrame Tester online](https://iframetester.com/)

## Changelog highlights (most recent)

See the chronological entries below for full details. Notable recent changes:

- 2026.01.24 — Added 10 features:
  1. JSON & JSONP Configuration Support (example .json and JsonP .js files added to the repo)
  2. Dynamic Date Placeholders
  3. Rotating Tile **Titles** - Requested by multiple users, see example in all 3 config files
  4. Smart Mixed-Media Interactivity (for tiles mixing images, videos, iFrames)
  5. Enhanced Full-Screen Navigation
  6. Setup UI Improvements
  7. Enhanced Breadcrumb Navigation to provide always a return path to previous configs
  8. PREVIOUS Menu Button
  9. Enhanced Config File Detection to support various file formats
  10. File Picker Integration to load different dashboards on the fly

- 2026.01.22 — Added directives to load images and iframes with colors inverted. Full details on the release notes.
- 2026.01.17 — Ability to load any config files via the menu.
- 2025.11.12 — Switch between multiple config files (e.g., `satellite.js`) via the menu.
- 2025.04.02 — RSS feed refresh times configurable; feed ticker added.
- 2025.03.29 — Scrolling RSS ticker and clickable feed items.
- 2025.01.24 — Settings merged into `hamdash.html`; realtime variable changes enabled.

## Upgrade notes

- For simpler sintax you can now use Json or JsonP files for config files
- Read the specific upgrade notes in the changelog below before replacing `config.js`
- To use multiple config files, add a menu entry in `config.js` such as:

```
var aURL = [  
  ["f3de21ff", "SATS", "satellite.js"],
  ["f3de21ff", "WX", "weather.js", "1", "R"]
];
```
**Rotating Tile Titles Usage:**

Pass an array as the first element of a tile configuration.
```javascript
// Example in config.js
[
  ["Radar CONUS", "Radar Local"], 
  "https://radar.com/map1.gif", 
  "https://radar.com/map2.gif"
]
```
## Example images

<img src="https://github.com/VA3HDL/hamdashboard/blob/main/examples/satellite.png?raw=true" width="600">
<img src="https://github.com/VA3HDL/hamdashboard/blob/main/examples/config.png?raw=true" width="600">

Grid examples

<img src="https://github.com/VA3HDL/hamdashboard/blob/main/examples/2x2.png?raw=true" width="200">
<img src="https://github.com/VA3HDL/hamdashboard/blob/main/examples/3x3.png?raw=true" width="200">
<img src="https://github.com/VA3HDL/hamdashboard/blob/main/examples/4x4.png?raw=true" width="200">
<img src="https://github.com/VA3HDL/hamdashboard/blob/main/examples/5x3.png?raw=true" width="200">

## More notes and history

The repository includes a detailed changelog documenting fixes, features, and upgrade instructions dating back through 2024. Please review the changelog entries below before performing upgrades.

[Releases & Change logs](https://github.com/VA3HDL/hamdashboard/releases)

## Host with Cloudflare Pages (free)

Tutorial contributed by Robert W3RDW:
[How to host your dashboard with Cloudflare Pages, free](https://w3rdw.radio/posts/hamdashboard/)

## Sample dashboards submitted by users

![VA3HDL Sample Dashboard](https://github.com/VA3HDL/hamdashboard/blob/main/examples/dashboard_sample.png?raw=true)

![N4NBC Sample Dashboard](https://github.com/VA3HDL/hamdashboard/blob/main/examples/N4NBC-sample.jpg?raw=true)

![KM4ACK Sample Dashboard](https://github.com/VA3HDL/hamdashboard/blob/main/examples/KM4ACK-sample.png?raw=true)

![TI3GB Sample Dashboard](https://github.com/VA3HDL/hamdashboard/blob/main/examples/TI3GB-sample.png?raw=true)

![N5NG Sample Dashboard](https://github.com/VA3HDL/hamdashboard/blob/main/examples/N5NG-sample.png?raw=true)

![VK3MLT Sample Dashboard](https://github.com/VA3HDL/hamdashboard/blob/main/examples/VK3MLT-sample.png?raw=true)

![VK5TUX Sample Dashboard](examples/VK5TUX_Sample_VA3HDL_Ham_Radio_Dashboard.png?raw=true)

![VK5TUX Sample Dashboard Sources](examples/VK5TUX_Sample_VA3HDL_Ham_Radio_Dashboard_Sources.png?raw=true)

![N4TDX Sample Dashboard](https://github.com/VA3HDL/hamdashboard/blob/main/examples/N4TDX-sample.png?raw=true)

![WG5EEK Sample Dashboard](https://github.com/VA3HDL/hamdashboard/blob/main/examples/WG5EEK-sample.jpg?raw=true)

![KJ5FMX Sample Dashboard](https://github.com/VA3HDL/hamdashboard/blob/main/examples/KJ5FMX-sample.jpg?raw=true)

![N0RMJ Sample Dashboard](https://github.com/VA3HDL/hamdashboard/blob/main/examples/N0RMJ-sample.jpg?raw=true)

![N5GAH Sample Dashboard](https://github.com/VA3HDL/hamdashboard/blob/main/examples/N5GAH-sample.jpg?raw=true)

![OES MarTech Sample Dashboard](https://github.com/VA3HDL/hamdashboard/blob/main/examples/OESmartech.jpg?raw=true)

![TheSky Sample Dashboard](https://github.com/VA3HDL/hamdashboard/blob/main/examples/TheSky.jpg?raw=true)

![KJ7T Sample Dashboard](https://github.com/VA3HDL/hamdashboard/blob/main/examples/KJ7T-sample.png?raw=true)

![K4HNH Sample Dashboard](https://github.com/VA3HDL/hamdashboard/blob/main/examples/K4HNH-sample.jpg?raw=true)

![CT1ETE Sample Dashboard](https://github.com/VA3HDL/hamdashboard/blob/main/examples/CT1ETE-sample.jpg?raw=true)

![VK3FS Sample Dashboard](https://github.com/VA3HDL/hamdashboard/blob/main/examples/VK3FS-sample.png?raw=true)

![W5EAK Sample Dashboard](https://github.com/VA3HDL/hamdashboard/blob/main/examples/W5EAK-sample.jpg?raw=true)

![WI5L Sample Dashboard](https://github.com/VA3HDL/hamdashboard/blob/main/examples/WI5L-sample.jpg?raw=true)

![WX9WTF Sample Dashboard](https://github.com/VA3HDL/hamdashboard/blob/main/examples/WX9WTF-sample.jpg?raw=true)

### Dual menu example

![Dual side Menu Sample Dashboard](https://github.com/VA3HDL/hamdashboard/blob/main/examples/DualMenu.png?raw=true)

### Sources display example

![Sources display example](https://github.com/VA3HDL/hamdashboard/blob/main/examples/sources.png?raw=true)
