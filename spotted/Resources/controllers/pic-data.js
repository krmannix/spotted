var constants = require('./controller-constants');

function PicData(pic_list, loc) {
	this.pic_list = pic_list;
	this.loc = loc;
	this.addPicturesToList(this.getPictures());
}

PicData.prototype.getPictures = function() {
	return constants.localPictures;
}

PicData.prototype.addPicturesToList = function(pics) {
	var url = "";
	var client = Ti.Network.createHTTPClient({
	     onload : function(e) {
	         var res = JSON.parse(this.responseText);
	         alert('success');
	     },
	     onerror : function(e) {
	         Ti.API.debug(e.error);
	         alert('Error happened while trying to retrieve pictures.');
	     },
	     timeout : 5000  // in milliseconds
	 });
	 client.open("GET", url);
	 client.send();
	this.pic_list.addPicturesToPicList(pics);
}

module.exports = PicData;