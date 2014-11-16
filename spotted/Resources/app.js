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

/* * * * * * * * * * * * * * * * * * * * *
 * 
 *  Initialize Views
 *
 * * * * * * * * * * * * * * * * * * * * */

 var pic_list = new PicList();
 var top_banner = new TopBanner();

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

 if (location.checkForGPS()) {
 	win.add(pic_list.getPicList());
 } else {

 }
 win.add(top_banner.getTopBanner());
 win.open();
