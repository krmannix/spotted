var constants = require('./view-constants');

function PicList() {
	this.labelLastUpdated = this.createLabelLastUpdated();
	this.labelStatus = this.createLabelStatus();
	this.border = this.createBorder();
	this.actInd = this.createActInd();
	this.imageArrow = this.createImageArrow();
	this.table_header = this.createTableHeader();
	this.list_actInd = this.createListActivityInd();
	this.pic_list_view = this.createPicList();
	this.current_pics = [];
}

/* * * * * * * * * * * * * * * * * * * * *
 * 
 *  Creators
 *
 * * * * * * * * * * * * * * * * * * * * */

PicList.prototype.createPicList = function() {
	// Table views seem easier than lists in titanium
	return Ti.UI.createTableView({
		top: constants.tableTop,
		selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
		backgroundColor: constants.secondaryColor,
		headerPullView: this.table_header
	});
}

PicList.prototype.createListActivityInd = function() {
	return Ti.UI.createActivityIndicator({
	    width:100, height:100, top: constants.tableTop + 10, visible: false
	});
}

PicList.prototype.createTableHeader = function() {


	var t = Ti.UI.createView({
	    backgroundColor:'#e2e7ed',
	    width:320, height:60
	});
	t.add(this.border);
	t.add(this.imageArrow);
	t.add(this.labelStatus);
	t.add(this.labelLastUpdated);
	t.add(this.actInd);
	return t;
}

PicList.prototype.createLabelLastUpdated = function() {
	var date = new Date();	
	return Ti.UI.createLabel({
	    color:'#576c89',
	    font:{fontSize:12},
	    text:'Last Updated: ' + date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes(),
	    textAlign:'center',
	    left:55, bottom:15,
	    width:200
	});
}

PicList.prototype.createLabelStatus = function() {
	return Ti.UI.createLabel({
	    color:'#576c89',
	    font:{fontSize:13, fontWeight:'bold'},
	    text:'Pull down to refresh...',
	    textAlign:'center',
	    left:55, bottom:30,
	    width:200
	});
}

PicList.prototype.createBorder = function() {
	return Ti.UI.createView({
	    backgroundColor:'#576c89',
	    bottom:0,
	    height:2
	});
}

PicList.prototype.createImageArrow = function() {
	return Ti.UI.createImageView({
	    image:'/images/whiteArrow.png',
	    left:20, bottom:10,
	    width:23, height:60
	});
}

PicList.prototype.createActInd = function() {
	return Ti.UI.createActivityIndicator({
	    left:20, bottom:13,
	    width:30, height:30
	});
}

PicList.prototype.createPictureRow = function(pic, i) {

	var row = Ti.UI.createTableViewRow({
			className:'user_pics',
			selectedBackgroundColor: 'white',
			rowIndex: this.current_pics.length + i,
			backgroundColor: (i%2 == 0) ? constants.secondaryColor : constants.tertiaryColor
	});

	var picture = Ti.UI.createImageView({
		image: pic.s3Url,
		width: constants.imageWidth,
		height: 'auto',
		top: constants.imageTop/2,
		bottom: constants.imageTop/2
	});

	var timestamp_row = Ti.UI.createView({
		width: constants.imageWidth,
		height: constants.timeStampHeight,
		top: constants.imageTop/2,
		backgroundColor: (i%2 == 0) ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'
	});
	
	var date = new Date(pic.createdAt);
	var hours = (date.getHours() == 0) ? 1 : date.getHours();
	var mins = (date.getMinutes() > 9) ? date.getMinutes() : '0' + date.getMinutes();
	var am_or_pm = (hours > 12) ? ' am' : ' pm';

	var timestamp = Ti.UI.createLabel({
		top: constants.timeStampTextTop/2,
		color: 'white',
		width: 'auto',
		text: hours%13 + ':' + mins + am_or_pm,
		font: {fontFamily: 'Helvetica', fontSize: 11}
	});

	// Must be in this order
	row.add(picture);
	row.add(timestamp_row);
	row.add(timestamp);


	return row;
}

/* * * * * * * * * * * * * * * * * * * * *
 * 
 *  Getters
 *
 * * * * * * * * * * * * * * * * * * * * */

PicList.prototype.getPicList = function() {
	return this.pic_list_view;
}

PicList.prototype.getImageArrow = function() {
	return this.imageArrow;
}

PicList.prototype.getActInd = function() {
	return this.actInd;
}

PicList.prototype.getLabelStatus = function() {
	return this.labelStatus;
}

PicList.prototype.getLabelLastUpdated = function() {
	return this.labelLastUpdated;
}

PicList.prototype.getListActivityInd = function() {
	return this.list_actInd;
}

/* * * * * * * * * * * * * * * * * * * * *
 * 
 *  Headers
 *
 * * * * * * * * * * * * * * * * * * * * */

PicList.prototype.addPicturesToPicList = function(pics) {
	// For now, we'll just generate these pics
	this.current_pics = [];
	for (var i = 0; i < pics.length; i++) {
		var row = this.createPictureRow(pics[i], i);
		this.current_pics.push(row);
	}
	this.pic_list_view.setData([]);
	this.pic_list_view.setData(this.current_pics);
}





module.exports = PicList;