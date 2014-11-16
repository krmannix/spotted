var constants = require('./controller-constants');

function PicData(pic_list, loc, a_i) {
	this.pic_list = pic_list;
	this.loc = loc;
	this.actInd = a_i;
	this.actInd.setVisible(true);
	this.addPicturesToList();
}

PicData.prototype.getPictures = function() {
	// This should be the GET REST Call
	return constants.localPictures;
}

PicData.prototype.addPicturesToList = function() {
	var pics = this.getPictures();
	var self = this;
	setTimeout(function(){
		self.pic_list.addPicturesToPicList(pics);
		self.actInd.setVisible(false);
	}, 3000);
	// var url = "";
	// var client = Ti.Network.createHTTPClient({
	//      onload : function(e) {
	//          var res = JSON.parse(this.responseText);
	//			this.actInd.setVisible(false);
	//          alert('success');
	//      },
	//      onerror : function(e) {
	//          Ti.API.debug(e.error);
	//			self.actInd.setVisible(false);
	//          alert('Error happened while trying to retrieve pictures.');
	//      },
	//      timeout : 5000  // in milliseconds
	//  });
	//  client.open("GET", url);
	//  client.send();
}

module.exports = PicData;