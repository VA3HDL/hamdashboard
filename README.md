# README.md

Original VA3HDL [YouTube - Presentation video](https://www.youtube.com/watch?v=sIdqMQTGNSc)

VA3HDL en español [YouTube - Video en español](https://www.youtube.com/watch?v=IBMxELofKVA)

[Hamdash Demo](https://va3hdl.github.io/hamdash/) -- Test it here before download

## User submitted live Dashboards

[BCAT N4TDX](https://qsl.net/n/n5ng/BCAT/) -- by Steve N5NG, in use by the Brevard County (Florida) ARES Team

- Links for Steve's weather and hamradio config.js as .txt files:
  - <https://qsl.net/n5ng/config.txt>
  - <https://qsl.net/n5ng/HAM/config.txt>

[FFX DEMS](https://kq4dne.github.io/WeatherDash/WeatherDash.html) -- by Sandy KQ4DNE for Emergency Management Weather

[FFX ARES](https://kq4dne.github.io/hamdash/hamdash.html) -- by Sandy KQ4DNE for ARES

[WA4MED](https://dashboard.wa4med.us/hamdash.html) -- by Matthew WA4MED

[PY3TX](https://dashboard.py3tx.com/) -- South America

[VE7CAS](https://hamradio.smecher.bc.ca/) -- Vancouver, BC

[G0IKV](https://g0ikv.qsy.to/) -- Southport, England by David G0IKV

[OK1SLM](https://www.qsl.net/ok1slm/) -- Prague, EU

[VK3VSN](https://www.vicscan.com/hamdash/) -- Melbourne, Australia by Brett VK3VSN

[K6BCW](https://elihickox.com/radio/hamdashboard/hamdash.html) -- San Francisco bay area

[KN6PTQ](https://kn6ptq.com/) -- San Francisco Bay Area

[W2SZ](https://dashboard.w2sz.org/) -- NE US by Brian W2SZ

[N2YQT](https://dashboard.tourge.net/) -- NE US by Ryan N2YQT

[KC2VWR](https://baef57ae.ham-desktop.pages.dev/) -- NE US

[KD2YFY](https://dash.kd2yfy.net/) -- NE US

[KD4VRD](https://hamdashboard-8fn.pages.dev/) -- North Carolina

[KD5PQJ](https://kd5pqj.com/dash/index.html) -- Texas

[N5GAH](http://n5gah.com/) -- Texas

[KJ7YYI](https://kj7yyi.net/ham-dash/) -- Arizona

[NQ0M](https://hamdash.nq0m.com/#) -- Kansas

[W3RDW](https://dashboard.w3rdw.radio/) -- Ohio

[W4QAL](https://w4qal.net/dashboard/index.html) -- SE US - West Florida

### Quick Setup Instructions

1. Just download the files from the Github repository (hamdash.html, config.js, and wheelzoom.js) and keep them together on the same folder.
2. Open hamdash.html with any browser of your preference.
3. Use the right menu "Setup" option to load the settings page to configure your dashboard.
4. Alternatively with any text editor (like Notepad) you can change the source images (can be more than one per box) or the menu options from the config.js file.
5. Select to load your configuration from browser's Local Storage or config.js file, and save the settings.
6. For server based hosted installs is recommended to use the settings stored in the config.js file. (More details below)

#### Settings Buttons

<img src="https://github.com/VA3HDL/hamdashboard/blob/main/examples/settings_buttons.png?raw=true" width="800">

##### Save Settings to Local Storage

Save the settings on the page to the Local Storage of the current browser in use

##### Reset to Defaults

Reset all settings' values to sample default values for testing

##### Backup Settings to JSON file

Save all settings values to a JSON file that can be downloaded and imported on a different browser or installation

##### Restore Settings from JSON file

Load all settings values from a JSON file saved with the previous button

##### Import from config.js file

Load all settings values from a config.js file format (config.js file is the recommended format for server installations)

##### Export to config.js file

Save all settings values to a config.js file format (config.js file is the recommended format for server installations)

#### Public facing dashboards

The "Setup" link from the right hand side menu do no have any possibility to make changes to the config.js file hosted on the server or even hosted locally.
If someone using a public dashboard access the "Setup" settings page and change it to Local Storage, will be affecting only him/herself specifically as the Local Storage refer to that user's browser in particular.
Is perfectly safe and no harm can be done.

However, I have added for users that have public access dashboards, a new option on the config.js file that removes the "Setup" option from the menu.

        const disableSetup = true;

### YouTube coverage

[YouTube - Configuration instructions contributed by Jason KM4ACK](https://youtu.be/9ZZXg60tN-o)

[YouTube - Raspberry Pi instructions contributed by Andreas M0FXB](https://www.youtube.com/watch?v=Km_vOCvCMFM)

[YouTube - Live Stream with Ham Radio Wilderness Frank KG6NLW](https://www.youtube.com/watch?v=rJHCpNHDbC0&t=140s)

[YouTube - Live Stream with Temporarily Offline Ham Radio KM9G](https://www.youtube.com/watch?v=ohlHaSsf6B8=400s)

[YouTube - Ham Dashboard on Inovato Quadra by Peter KJ5AJB](https://www.youtube.com/watch?v=u07Oz-YSrQY)

[YouTube - French review and instructions by Jean-Benard F5SVP](https://www.youtube.com/watch?v=o9Dl9A5hqQI)

[YouTube - Repaso e instrucciones en Español con Jose EA8EE](https://www.youtube.com/watch?v=3CnsfB3zNuM)

### Docker

[Docker version](https://registry.hub.docker.com/r/michaelsteven/hamdashboard) by Michael Stevens

### Quick Help

- Double click on an image to expand to full screen.
- Double click again to close full screen view.
- Right click on an image to display the next one. (In the latest version is possible to add multiple images per box.)
- The content refreshes automatically every 5 minutes.

Is that easy!

73 de Pablo, VA3HDL

### Fix for Pi-Star iFrame embedding issues

This error can occur if the server has certain security measures in place, such as the x-frame-options header, which prevents its content from being embedded on other websites using iframes.

1. Login via ssh to the pi-star then run this command to switch to Read/Write mode:

        rpi-rw

2. Edit the file nginx security.conf file:

        sudo nano /etc/nginx/default.d/security.conf

3. comment the line below with a "#" in front, like this:

        # add_header X-Frame-Options  "SAMEORIGIN";

4. Run this command to switch back to Read Only mode:

        rpi-ro

5. Now you can either reboot your Pi-Star, or just restart the nginx service:

        sudo systemctl restart nginx.service

<img src="https://github.com/VA3HDL/hamdashboard/blob/main/examples/pistar.png?raw=true" width="400">

### More on iFrame embedding

There is very little that can be done on the client side if the source site does not allow embedding the site inside another page (like the dashboard!) specially if the user can't change the server settings (most cases.)

As a workaround for these issues, I've tested running a local proxy on my computer to strip out the x-frame-options header coming from the source server and it worked well on some cases. But setting up a proxy adds another layer of complexity to the setup.

Use this online tool to test any URL to see if it can be displayed in an iframe before adding it to the dashboard -> [iFrame Tester online](https://iframetester.com/)

## Updates

If you want to upgrade to the latest version, please make sure your read the Changelog below (do not overwrite your config.js file.)

Check the updated demos too!

### 2025.11.12 Changelog

- Added ability to switch the dashboard using different config files (Feature suggested by Bryan VE3OYN)
- Now you can flip between various configurations by selecting them from the menu options

#### Upgrade notes

If you are upgrading and want to use the new feature... 

1. Create a new config file with a different name, lets say "satellite.js"
2. Add the new config file name to the menues (on the original config.js file) including the js extension like this:

        on config.js add...

        var aURL = [
                ["f3de21ff", "satellite.js"],

<img src="https://github.com/VA3HDL/hamdashboard/blob/main/examples/satellite.png?raw=true" width="600">


3. Make sure you also include the original config.js menu option on the new config file so you can switch back to your original dashboard

        on satellite.js add...

        var aURL = [
                ["f3de21ff", "config.js"],  

<img src="https://github.com/VA3HDL/hamdashboard/blob/main/examples/config.png?raw=true" width="600">

4. Now when you click on satellite.js menu option the dashboard will switch to the example on the screen capture above

### 2025.04.02 Changelog

- Added ability to customize RSS feeds refresh times.
- Added scrolling pause on mouse-over to the ticker, for easy ready and click on links.
- Incorporated feed name and last feed update timestamp at the beginning of each feed items.

#### Upgrade notes

If you are upgrading, you must add the RSS feeds variable to your config.js file.
If you don't wish to use the RSS functionality, then add an empty array like this:

        var aRSS = [];

If you want to show some feeds, then add them to your config.js file like this:

        // RSS feed items
        // Structure is [feed URL, refresh interval in minutes]
        var aRSS = [
          ["https://www.amsat.org/feed/", 60],           // Example RSS feed, refresh every 60 minutes
          ["https://daily.hamweekly.com/atom.xml", 120], // Example Atom feed, refresh every 120 minutes
          ];

If you are using local storage instead of config.js file to save your settings, then you can directly add the RSS feeds using the setup page.

### 2025.03.29 Changelog

- Added scrolling RSS feed ticker at the bottom section of the dashboard.
- Feed ticker displayed information is clickable and links will open on a new tab/window.
- Incorporated some cosmetic tweaks to make the content to look nicer and more accessible.

#### Upgrade notes

If you are upgrading, you must add the RSS feeds variable to your config.js file.
If you don't wish to use the RSS functionality, then add an empty array like this:

        var aRSS = [];

If you want to show some feeds, then add them to your config.js file like this:

        var aRSS = [
          ["https://www.amsat.org/feed/"],          // Example RSS feed
          ["https://daily.hamweekly.com/atom.xml"], // Example Atom feed
          ];

If you are using local storage instead of config.js file to save your settings, then you can directly add the RSS feeds using the setup page.

### 2025.01.26 Changelog

- Fixed a bug with the "Export to config.js file" button that was saving the "default" values instead of saving the current settings displayed on the page.
- Thanks to Dave WB5NHL for reporting this issue to me.

### 2025.01.24 Changelog

- Merged the settings.html page into the main hamdash.html page for maintenance and upgrade simplification
- Added a color picker for the menu items background
- Replaced all CONST declarations on the config.js file with VAR declarations to allow these variables to be changed in realtime via Setup page
- Fixed issue with Back menu option that refreshed the entire page
- Unloaded the page iFrame when is not visible (these are the pages loaded by the side menu options)

#### Upgrade notes

Delete the file settings.html if you have one. This file is no longer needed. Settings are now part of hamdash.html file.
Exporting the configuration to JSON file is strongly recommended if you are using Browser Local Storage to save your configuration as a backup.

### 2025.01.21 Changelog

- Added ability to export settings to config.js file
- Bug fix: Delete button for Menu items don't work
- Moved Setup Page buttons to the top and made them always visible for easy access
- Added tooltips to the Setup Page (settings.html)

### 2025.01.20 Changelog

- Added a "Setup" page to configure the dashboard directly from the browser
- Added the "Setup" option to the menu to loads the settings page
- Ability to choose the option to load the configuration from: config.js file or Local Storage
- Use config.js as default if present for backwards compatibility
- Ability to import existing config.js file into Local Storage
- Ability to export settings from Local Storage to backup Json file
- Ability to import settings from backup Json file into Local Storage
- Ability to hide the "Setup" option from the menu by adding "const disableSetup = true;" on the config.js file

#### Upgrade notes

Remove these lines from your config.js file to avoid duplicated menu entries (these entries are now hardcoded)

        ["add10d", "BACK", "#", "1"],
        ["add10d", "BACK", "#", "1", "R"],
        ["ff9100", "Refresh", "#", "1"],
        ["0dd1a7", "Help", "#", "1"],

Make sure you also download (in addition to hamdash.html) the new file settings.html that provides the new setup page option

#### Upgrade notes for public facing dashboards

The "Setup" link from the right hand side menu do no have any possibility to make changes to the config.js file hosted on the server or even hosted locally.
If someone using a public dashboard access the "Setup" settings page and change it to Local Storage, will be affecting only him/herself specifically as the Local Storage refer to that user's browser in particular.
Is perfectly safe and no harm can be done.

However, I have added for users that have public access dashboards, a new option on the config.js file that removes the "Setup" option from the menu.

        const disableSetup = true;

Add the above line to the config.js and rename the settings.html page to anything that you only know and is hard to guess.

#### New Settings page sample

<img src="https://github.com/VA3HDL/hamdashboard/blob/main/examples/settings.png?raw=true" width="800">

### 2024.11.13 Changelog

- Added capability to customize the grid size (any combination of number of columns and number of rows for the dashboard tiles.) See examples and usage below.
- Usage: Add these lines to your config.js file and replace "4" and "3" with the number of columns and rows that you desire

        // Grid layout
        var layout_cols = 4;
        var layout_rows = 3;

- Ensure the total number of tiles match your sources and your rotation/refresh delays specified in the config.js file
- Removed "VA3HDL" from the page title.
- Grid size examples:

--> 2x2:

<img src="https://github.com/VA3HDL/hamdashboard/blob/main/examples/2x2.png?raw=true" width="200">

--> 3x3:

<img src="https://github.com/VA3HDL/hamdashboard/blob/main/examples/3x3.png?raw=true" width="200">

--> 4x4:

<img src="https://github.com/VA3HDL/hamdashboard/blob/main/examples/4x4.png?raw=true" width="200">

--> 5x3:

<img src="https://github.com/VA3HDL/hamdashboard/blob/main/examples/5x3.png?raw=true" width="200">

### 2024.10.16 Changelog

- Added website capability to tiles using "iframe|" keyword before the tile URL. Check the updated config.js file for usage examples. The tiles can contain any website that supports embedding using iFrame, including live YouTube videos!

### 2024.07.24 Changelog

- Added "Discussions" to GitHub options for users to share their menu and image sources and anything else interesting -- <https://github.com/VA3HDL/hamdashboard/discussions>

### 2024.07.06 Changelog

- Add version check and minor fixes.

### 2024.07.05 Changelog

- Removed 5 minutes page autorefresh. Now all tiles refresh separatelly (at same or different intervals.) So there is no longer needed refresh the entire page.

### 2024.07.04 Changelog

- Full screen images will rotate with mouse right click (when there is more than one image on the selected tile)
- Added the ability to set individual image rotation at different intervals per tile adding a line like this at the end of the config.js file:

        const tileDelay = [5000,4000,3000,2000,1000,6000,7000,8000,9000,8500,7500,6500];

### 2024.06.12 Changelog

- Added menu option (right side menu) to display on screen the various sources for images and menu options to facilitate sharing URL sources in our user community

### 2024.06.08 Changelog

- Added support to play videos (along with the images.) Some modernized sites provide .mp4 videos instead of animated GIFS.

### 2024.06.05 Changelog

- Added image loading error handling
- Added workaround to prevent images being cached on the browser and not getting updated

### 2024.05.27 Changelog

- Moved the configuration parts of the JavaScript code to its own file "config.js" so it is easy to upgrade after updates to the main code. Suggested by Lou KI5FTY.
- Improved menu usability

### 2024.05.25 Changelog

- Removed dependencies to local installed fonts. Fonts now are loaded from Google Fonts directly to ensure consistency.
- Ability to add multiple images per position. Images are rotated automatically every 30 seconds.
- Autorefresh is now paused automatically when switching to a website (from menu) or when an image is zoomed-in to full screen
- Moved configuration variables to the top of the script and added extra commentary to ease the initial setup
- Added menu to the right of the page. Now the left menu has ham radio links and right menu has weather links

## Host your dashboard with Cloudflare Pages, free

Tutorial contributed by Robert W3RDW

[How to host your dashboard with Cloudflare Pages, free](https://w3rdw.radio/posts/hamdashboard/)

## Samples

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
