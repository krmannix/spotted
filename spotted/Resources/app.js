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
var Camera = require('controllers/camera');
var Paint = require('controllers/paint_controller');

/* * * * * * * * * * * * * * * * * * * * *
 * 
 *  Initialize Views
 *
 * * * * * * * * * * * * * * * * * * * * */

 var pic_list = new PicList();
 var top_banner = new TopBanner();
 var no_geo = new NoGeo();
 var paint = new Paint();

 var pic_list_actInd = pic_list.getListActivityInd();

 /* * * * * * * * * * * * * * * * * * * * *
 * 
 *  Initialize Controllers
 *
 * * * * * * * * * * * * * * * * * * * * */

 var location = new Loc(pic_list, no_geo);
 var camera = new Camera(location);
 var pic_data = new PicData(pic_list, location, pic_list_actInd);
 var events = new Events(top_banner, pic_list, pic_data, camera, location, paint);

 /* * * * * * * * * * * * * * * * * * * * *
 * 
 *  Add views to window
 *
 * * * * * * * * * * * * * * * * * * * * */

 // win.add(pic_list.getPicList());
 // win.add(pic_list_actInd);
 // win.add(no_geo.getView());
 // win.add(top_banner.getTopBanner());
 win.add(paint.getPaintView());
 win.open();
