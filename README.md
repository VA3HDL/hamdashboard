Original VA3HDL [YouTube - Presentation video](https://www.youtube.com/watch?v=sIdqMQTGNSc)

### User submitted live Dashboards:

[Hamdash Demo](https://va3hdl.github.io/hamdash/)  -- Test it here before download

[BCAT N4TDX](https://www.n4tdx.org/dashboard/dashboard.html)  -- by Steve N5NG, in use by the Brevard County (Florida) ARES Team

[FFX DEMS](https://kq4dne.github.io/WeatherDash/WeatherDash.html)  -- by Sandy KQ4DNE for Emergency Management Weather

[FFX ARES](https://kq4dne.github.io/hamdash/hamdash.html)  -- by Sandy KQ4DNE for ARES

[WA4MED](https://dashboard.wa4med.us/hamdash.html)  -- by Matthew WA4MED

[W2SZ](https://dashboard.w2sz.org/)  -- by Brian W2SZ

[N2YQT](https://dashboard.tourge.net/)  -- by Ryan N2YQT

### Instructions:
1. Just download the files from the Github repository (hamdash.html, config.js, and wheelzoom.js) and keep them together on the same folder.
2. Open hamdash.html with any browser of your preference and you done.
3. With any text editor (like Notepad) you can change the source images (can be more than one per box) or the menu options from the config.js file.

### YouTube coverage:
[YouTube - Configuration instructions contributed by Jason KM4ACK](https://youtu.be/9ZZXg60tN-o)

[YouTube - Raspberry Pi instructions contributed by Andreas M0FXB](https://www.youtube.com/watch?v=Km_vOCvCMFM)

[YouTube - Live Stream with Ham Radio Wilderness Frank KG6NLW](https://www.youtube.com/watch?v=rJHCpNHDbC0&t=140s)

[YouTube - Live Stream with Temporarily Offline Ham Radio KM9G](https://www.youtube.com/watch?v=ohlHaSsf6B8=400s)

[YouTube - Ham Dashboard on Inovato Quadra by Peter KJ5AJB](https://www.youtube.com/watch?v=u07Oz-YSrQY)

[YouTube - French review and instructions by Jean-Benard F5SVP](https://www.youtube.com/watch?v=o9Dl9A5hqQI)

[YouTube - Repaso e instrucciones en Español con Jose EA8EE](https://www.youtube.com/watch?v=3CnsfB3zNuM)

### Docker:
[Docker version](https://registry.hub.docker.com/r/michaelsteven/hamdashboard)  -- by Michael Stevens

### Quick Help:
* Double click on an image to expand to full screen.
* Double click again to close full screen view.
* Right click on an image to display the next one. (In the latest version is possible to add multiple images per box.)
* The content refreshes automatically every 5 minutes.

Is that easy!

73 de Pablo, VA3HDL

### Fix for Pi-Star iFrame embedding issues:
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

### More on iFrame embedding:
There is very little that can be done on the client side if the source site does not allow embedding the site inside another page (like the dashboard!) specially if the user  can't change the server settings (most cases.)

As a workaround for these issues, I've tested running a local proxy on my computer to strip out the x-frame-options header coming from the source server and it worked well on some cases. But setting up a proxy adds another layer of complexity to the setup.

## Updates

If you want to upgrade to the latest version, the only file you need to update is hamdash.html (do not overwrite your config.js file.)

Check updated demo!

### 2024.07.24 Changelog:

- Added "Discussions" to GitHub options for users to share their menu and image sources and anything else interesting -- https://github.com/VA3HDL/hamdashboard/discussions

### 2024.07.06 Changelog:

- Add version check and minor fixes.

### 2024.07.05 Changelog:

- Removed 5 minutes page autorefresh. Now all tiles refresh separatelly (at same or different intervals.) So there is no longer needed refresh the entire page.

### 2024.07.04 Changelog:

- Full screen images will rotate with mouse right click (when there is more than one image on the selected tile)
- Added the ability to set individual image rotation at different intervals per tile adding a line like this at the end of the config.js file:

        const tileDelay = [5000,4000,3000,2000,1000,6000,7000,8000,9000,8500,7500,6500];

### 2024.06.12 Changelog:

- Added menu option (right side menu) to display on screen the various sources for images and menu options to facilitate sharing URL sources in our user community

### 2024.06.08 Changelog:

- Added support to play videos (along with the images.) Some modernized sites provide .mp4 videos instead of animated GIFS.

### 2024.06.05 Changelog:

- Added image loading error handling
- Added workaround to prevent images being cached on the browser and not getting updated

### 2024.05.27 Changelog:

- Moved the configuration parts of the JavaScript code to its own file "config.js" so it is easy to upgrade after updates to the main code. Suggested by Lou KI5FTY.
- Improved menu usability

### 2024.05.25 Changelog:

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

### Dual menu example:
![Dual side Menu Sample Dashboard](https://github.com/VA3HDL/hamdashboard/blob/main/examples/DualMenu.png?raw=true)

### Sources display example:
![Sources display example](https://github.com/VA3HDL/hamdashboard/blob/main/examples/sources.png?raw=true)
