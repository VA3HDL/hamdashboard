const topBarCenterText = `VA3HDL - FN04ga`;
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
  ["RADAR", "https://radar.weather.gov/ridge/standard/CONUS_loop.gif"],
  [
    "LOCAL RADAR",
    "https://radar.weather.gov/ridge/standard/KNQA_loop.gif",
  ],
  [
    "NOAA D-RAP",
    "https://services.swpc.noaa.gov/images/animations/d-rap/global/d-rap/latest.png",
  ],
  [
    "ISS & RS-44 POSITION",
    "https://www.heavens-above.com/orbitdisplay.aspx?icon=iss&width=600&height=300&mode=M&satid=25544",
    "https://www.heavens-above.com/orbitdisplay.aspx?icon=default&width=600&height=300&mode=M&satid=44909",
  ],
  [
    "SATELLITE CAN",
    "https://cdn.star.nesdis.noaa.gov/GOES16/GLM/SECTOR/can/EXTENT3/GOES16-CAN-EXTENT3-1125x560.gif",
  ],
  [
    "SATELLITE CGL",
    "https://cdn.star.nesdis.noaa.gov/GOES16/GLM/SECTOR/cgl/EXTENT3/GOES16-CGL-EXTENT3-600x600.gif",
  ],
  [
    "LIGHTNING",
    "https://images.lightningmaps.org/blitzortung/america/index.php?animation=usa",
  ],
  [
    "LIGHTNING LOCAL",
    "https://www.blitzortung.org/en/Images/image_b_ny.png",
  ],
  ["GREY LINE", "https://www.timeanddate.com/scripts/sunmap.php?iso=now"],
  [
    "SW BROADCAST",
    "https://www.short-wave.info/php/transmitter-site-map.php?mobile=false&lat=52.67|-21.96|-15.53|-9.42|-17.76|-17.53|46.34|50.73|42.81|39.75|50.89|29.60|6.23|39.40|-15.53|43.51|46.34|-21.96|34.38|44.15|39.36|46.34|39.91|39.91|46.34|27.46|24.88|27.46|36.28|39.36|42.04|36.28|36.21|12.69|18.22|24.17|42.04|29.60|-15.73|-7.90|36.21|12.69|36.21|29.15|30.65|-21.96|33.50|-38.83|36.28|36.21|27.46&lon=9.75|27.60|28.00|160.05|168.36|146.05|-67.83|4.39|23.19|116.81|-113.85|55.79|-10.70|32.86|28.00|-79.63|-67.83|27.64|108.61|86.90|75.72|-67.83|-76.58|-76.58|-67.83|-80.93|102.50|-80.93|-86.10|75.72|12.32|-86.10|-86.89|-8.02|-63.02|54.25|12.32|55.79|46.45|-14.38|-86.89|-8.02|-86.89|47.77|-87.09|27.64|-86.47|176.42|-86.10|-86.89|-80.93&freq=3975|4930|4965|5020|5040|5055|5130|5780|5900|5985|6030|6040|6050|6050|6065|6070|6160|6195|7285|7295|7415|7490|9265|9265|9330|9395|9440|9455|9475|9600|9705|9930|9980|11640|11775|11810|11870|11880|11965|12095|12160|13630|13845|15540|15555|15580|15610|15720|15810|15825|17790&az=ND|20|ND|ND|ND|ND|245|ND|126|257|ND|313|ND|310|315|ND|245|350|317|270|308|245|242|242|245|355|283|285|50|308|206|180|90|111|320|90|210|211|295|27|85|111|90|310|5|350|85|35|40|46|160",
  ],
  ["10M PROPAGATION", "https://www.tvcomm.co.uk/g7izu/Autosave/NA_ES_AutoSave.JPG"],
  ["HF PROPAGATION",
  "https://www.hamqsl.com/solar101vhf.php",
  "https://www.hamqsl.com/solar100sc.php",
  "https://www.hamqsl.com/solarpich.php"],
];

// Image rotation intervals in milliseconds per tile - If the line below is commented, all tiles will be rotated every 30000 milliseconds (30s)
const tileDelay = [11200,10000,11000,10100,10200,10500,10300,10600,10400,10700,10900,10800];
