var constants = require('./view-constants');

function PicList() {
	this.pic_list_view = this.createPicList();
	this.current_pics = [];
}

PicList.prototype.createPicList = function() {
	// Table views seem easier than lists in titanium
	return Ti.UI.createTableView({
		top: constants.tableTop,
		backgroundColor: constants.secondaryColor
	});
}

PicList.prototype.getPicList = function() {
	return this.pic_list_view;
}

PicList.prototype.addPicturesToPicList = function(pics) {
	// For now, we'll just generate these pics
	for (var i = 0; i < pics.length; i++) {
		var row = Ti.UI.createTableViewRow({
			className:'user_pics',
			selectedBackgroundColor: 'white',
			rowIndex: this.current_pics.length + i
		});
		var pic = Ti.UI.createImageView({
			image: pics[i],
			width: constants.deviceWidth*0.9,
			height: 'auto',
			top: constants.imageTop
		});
		row.add(pic);
		this.current_pics.push(row);
		this.pic_list_view.appendRow(row);
	}
}

module.exports = PicList;