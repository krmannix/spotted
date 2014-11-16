var constants = require('./controller-constants');

function PicData(pic_list, loc, a_i) {
	this.pic_list = pic_list;
	this.loc = loc;
	this.actInd = a_i;
	this.addPicturesToList(this.getPictures());
}

PicData.prototype.getPictures = function() {
	return constants.localPictures;
}

PicData.prototype.addPicturesToList = function(pics) {
	var self = this;
	self.actInd.setVisible(true);
	setTimeout(function(){
		self.pic_list.addPicturesToPicList(pics);
		self.actInd.setVisible(false);
	}, 3000);
	// var url = "";
	// var client = Ti.Network.createHTTPClient({
	//      onload : function(e) {
	//          var res = JSON.parse(this.responseText);
	//          alert('success');
	//			this.actInd.setVisible(false);
	//      },
	//      onerror : function(e) {
	//          Ti.API.debug(e.error);
	//          alert('Error happened while trying to retrieve pictures.');
	//      },
	//      timeout : 5000  // in milliseconds
	//  });
	//  client.open("GET", url);
	//  client.send();
}

module.exports = PicData;