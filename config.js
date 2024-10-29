const topBarCenterText = `NQ0M - EM27hw`;
// Menu items
// Structure is as follows HTML Color code, Option, target URL, scaling 1=Original Size, side (optional, nothing is Left, "R" is Right)
// The values are [color code, menu text, target link, scale factor, side],
// add new lines following the structure for extra menu options. The comma at the end is important!
const aURL = [
  ["add10d", "BACK", "#", "1"],
  ["add10d", "BACK", "#", "1", "R"],
  ["ff9100", "Refresh", "#", "1"],
  ["0dd1a7", "Help", "#", "1"],
  ["2196F3", "CLUBLOG", "https://clublog.org/livestream/VA3HDL", "1.7"],
  [
    "2196F3",
    "CONTEST",
    "https://www.contestcalendar.com/fivewkcal.html",
    "1",
  ],
  ["2196F3", "DX CLUSTER", "https://dxcluster.ha8tks.hu/map/", "1"],
  [
    "2196F3",
    "LIGHTNING",
    "https://map.blitzortung.org/#3.87/36.5/-89.41",
    "1",
    "R",
  ],
  ["2196F3", "PISTAR", "http://pi-star.local/", "1.2"],
  [
    "2196F3",
    "RADAR",
    "https://weather.gc.ca/?layers=alert,radar&center=43.39961001,-78.53212031&zoom=6&alertTableFilterProv=ON",
    "1",
    "R"
  ],
  ["2196F3", "TIME.IS", "https://time.is/", "1", "R"],
  [
    "2196F3",
    "WEATHER",
    "https://openweathermap.org/weathermap?basemap=map&cities=true&layer=temperature&lat=44.0157&lon=-79.4591&zoom=5",
    "1",
    "R",
  ],
  [
    "2196F3",
    "WINDS",
    "https://earth.nullschool.net/#current/wind/surface/level/orthographic=-78.79,44.09,3000",
    "1",
    "R",
  ],
];

// Dashboard items
// Structure is Title, Image Source URL
// [Title, Image Source URL],
// the comma at the end is important!
// You can't add more items because there are only 12 placeholders on the dashboard
// but you can replace the titles and the images with anything you want.
const aIMG = [
  [
    "RADAR", "https://radar.weather.gov/ridge/standard/CONUS_loop.gif",
  ],
  [
    "LOCAL RADAR",
    "https://radar.weather.gov/ridge/standard/KICT_loop.gif",
  ],
  [
    "NOAA D-RAP",
    "https://services.swpc.noaa.gov/images/animations/d-rap/global/d-rap/latest.png",
  ],
  [
    "",
    "https://hamclock-static.nq0m.com/get_capture.bmp",
  ],
  [
    "SATELLITE US",
    "https://cdn.star.nesdis.noaa.gov/GOES16/ABI/CONUS/GEOCOLOR/GOES16-CONUS-GEOCOLOR-625x375.gif",
  ],
  [
    "LOCAL SAT",
    "https://cdn.star.nesdis.noaa.gov/GOES16/ABI/SECTOR/umv/GEOCOLOR/GOES16-UMV-GEOCOLOR-600x600.gif",
  ],
  [
    "LIGHTNING",
    "https://images.lightningmaps.org/blitzortung/america/index.php?animation=usa",
  ],
  [
    "LIGHTNING LOCAL",
    "https://www.blitzortung.org/en/Images/image_b_mn.png",
  ],
  ["GREY LINE", "https://www.timeanddate.com/scripts/sunmap.php"],
  [
    "K-39 Bridge",
    "https://kscam.carsprogram.org/KDOT_573004_IMAGE001.JPG",
  ],
  ["10M PROPAGATION", "https://www.tvcomm.co.uk/g7izu/Autosave/NA_ES_AutoSave.JPG"],
  ["",
  "https://www.hamqsl.com/solar101vhf.php",
  "https://www.hamqsl.com/solar100sc.php",
  "https://www.hamqsl.com/solarpich.php"],
];

// Image rotation intervals in milliseconds per tile - If the line below is commented, all tiles will be rotated every 30000 milliseconds (30s)
// const tileDelay = [11200,10000,11000,10100,10200,10500,10300,10600,10400,10700,10900,10800];