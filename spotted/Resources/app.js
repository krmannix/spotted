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
 var pic_data = new PicData(pic_list);
 var events = new Events(top_banner, pic_list, pic_data);

 /* * * * * * * * * * * * * * * * * * * * *
 * 
 *  Add views to window
 *
 * * * * * * * * * * * * * * * * * * * * */
Ti.API.info("Checking for gps: " + location.checkForGPS());
 //if (location.checkForGPS()) {
 if (false) {
 	win.add(pic_list.getPicList());
 } else {
 	win.add(no_geo.getView());
 }
 win.add(top_banner.getTopBanner());
 win.open();
