var constants = require('./controller-constants');

function PicData(pic_list, loc, a_i) {
	this.pic_list = pic_list;
	this.loc = loc;
	this.actInd = a_i;
	this.actInd.setVisible(true);
	this.loc.getLocation('', this.addPicturesToList, this);
}

PicData.prototype.getPictures = function() {
	// This should be the GET REST Call
	return constants.localPictures;
}

PicData.prototype.addPicturesToList = function(x, obj, pic_data) {
	var self, url;
	if (pic_data) self = pic_data;
	else self = this;
	if (JSON.stringify(obj) !== '{}') url = "http://spottd.herokuapp.com/images/all?lat="+obj.lat+"&lng="+obj.lng;
	else url = "http://spottd.herokuapp.com/images/all";
	var client = Ti.Network.createHTTPClient({
	     onload : function(e) {
	         var res = JSON.parse(this.responseText);
			 self.actInd.setVisible(false);
	         self.pic_list.addPicturesToPicList(res);
	     },
	     onerror : function(e) {
	         Ti.API.debug(e.error);
			 self.actInd.setVisible(false);
	         alert('Error happened while trying to retrieve pictures.');
	     },
	     timeout : 5000  // in milliseconds
	 });
	 client.open("GET", url);
	 client.send();
}

module.exports = PicData;