/* * * * * * * * * * * * * * * * * * * * *
 * 
 *  Requires
 *
 * * * * * * * * * * * * * * * * * * * * */

var win = Titanium.UI.createWindow();

var PicList = require('views/pic_list');
var PicData = require('controllers/pic-data');

/* * * * * * * * * * * * * * * * * * * * *
 * 
 *  Initialize Views
 *
 * * * * * * * * * * * * * * * * * * * * */

 var pic_view = new PicList();


 /* * * * * * * * * * * * * * * * * * * * *
 * 
 *  Initialize Controllers
 *
 * * * * * * * * * * * * * * * * * * * * */

 var pic_data = new PicData(pic_view);

 /* * * * * * * * * * * * * * * * * * * * *
 * 
 *  Add views to window
 *
 * * * * * * * * * * * * * * * * * * * * */

 win.add(pic_view.getPicList());
 win.open();
