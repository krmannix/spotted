var constants = require('./view-constants');

function PicList() {
	this.pic_list_view = this.createPicList();
}

PicList.prototype.createPicList = function() {
	// Table views seem easier than lists in titanium
	return Ti.createTableView({
		top: constants.tableTop
	});
}

PicList.prototype.getPicList = function() {
	return this.pic_list_view;
}

PicList.prototype.addPicturesToPicList = function(pics) {
	// For now, we'll just generate these pics
}

module.exports = PicList;