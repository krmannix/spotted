/* * * * * * * * * * * * * * * * * * * * *
 * 
 *  Requires
 *
 * * * * * * * * * * * * * * * * * * * * */

var win = Titanium.UI.createWindow();

var PicList = require('views/pic-list');
var PicData = require('controllers/pic-data');
var TopBanner = require('views/top-banner');
var Events = require('controllers/events');
var Loc = require('controllers/location');
var NoGeo = require('views/no-geo-view');
var Camera = require('controllers/camera')

/* * * * * * * * * * * * * * * * * * * * *
 * 
 *  Initialize Views
 *
 * * * * * * * * * * * * * * * * * * * * */

 var pic_list = new PicList();
 var top_banner = new TopBanner();
 var no_geo = new NoGeo();

 /* * * * * * * * * * * * * * * * * * * * *
 * 
 *  Initialize Controllers
 *
 * * * * * * * * * * * * * * * * * * * * */

 var location = new Loc();
 var camera = new Camera(location);
 var pic_data = new PicData(pic_list, location);
 var events = new Events(top_banner, pic_list, pic_data, camera);
 Ti.API.info(location.getLocation());

 /* * * * * * * * * * * * * * * * * * * * *
 * 
 *  Add views to window
 *
 * * * * * * * * * * * * * * * * * * * * */

 if (location.checkForGPS()) {
 	win.add(pic_list.getPicList());
 } else {
 	win.add(no_geo.getView());
 }
 win.add(top_banner.getTopBanner());
 win.open();
