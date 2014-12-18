var Paint = require('ti.paint');
var constants = require('./view-constants');

function PaintView(tag_view) {
	this.tag_view = tag_view;
	this.colorButtons = this.createColorButtons(constants.paintColors);
	this.submitButton = this.createSubmitButton();
	this.textStartButton = this.createTextStartButton();
	this.textInputBox = this.createTextInputBox();
	this.loadingView = this.createLoadingView();
	this.cancelButton = this.createCancelButton();
	this.eraseButton = this.createEraseButton();
	this.eraseBackground = this.createEraseBackground();
	this.refreshButton = this.createRefreshButton();
	this.canvas = this.createCanvas();
	this.paintView = this.createPaintView();
	this.org_pic;
}

/* * * * * * * * * * * * * * * * * * * * *
 * 
 *  ACTIONS
 *
 * * * * * * * * * * * * * * * * * * * * */

PaintView.prototype.changeStrokeColor = function(color) {
	this.canvas.strokeColor = color;
}

/* * * * * * * * * * * * * * * * * * * * *
 * 
 *  CREATES
 *
 * * * * * * * * * * * * * * * * * * * * */

PaintView.prototype.createPaintView = function() {
	var pv = Ti.UI.createView({
		top:0, right:0, bottom:0, left:0, backgroundColor: 'black', visible: false
	});
	pv.add(this.canvas);
	pv.add(this.submitButton);
	pv.add(this.cancelButton);
	pv.add(this.eraseBackground);
	pv.add(this.eraseButton);
	pv.add(this.refreshButton);
	// pv.add(this.textStartButton);
	// pv.add(this.textInputBox);
	for (var i = 0; i < this.colorButtons.length; i++) {
		pv.add(this.colorButtons[i]);
	}
	pv.add(this.tag_view);
	pv.add(this.loadingView);
	// Add text button
	return pv;
}

PaintView.prototype.createCancelButton = function() {
	var cb = Ti.UI.createImageView({
		height: constants.switchCameraButtonHeight,
		left: constants.cameraSpaceFromSide,
		bottom: constants.paintCancelButtonBottom,
		image: 'images/cancel.png'
	});
	return cb;
}

PaintView.prototype.createEraseButton = function() {
	var eb = Ti.UI.createImageView({
		height: constants.switchCameraButtonHeight,
		bottom: constants.paintCancelButtonBottom,
		image: 'images/erase.png',
		visible: false
	});
	return eb;
}

PaintView.prototype.createEraseBackground = function() {
	var ebg = Ti.UI.createView({
		height: constants.switchCameraButtonHeight + constants.eraseBackgroundBuffer,
		width: constants.switchCameraButtonHeight,
		bottom: constants.paintCancelButtonBottom - (constants.eraseBackgroundBuffer/2),
		borderRadius: constants.switchCameraButtonHeight/2,
		backgroundColor: 'rgba(255, 251, 204, .4)',
		visible: false
	});
	return ebg;
}

PaintView.prototype.createRefreshButton = function() {
	var rb = Ti.UI.createImageView({
		height: constants.switchCameraButtonHeight,
		bottom: constants.paintCancelButtonBottom,
		image: 'images/refresh.png'
	});
	return rb;
}

PaintView.prototype.createColorButton = function(color, x_distance) {
	return Ti.UI.createView({
		backgroundColor: color,
		left: x_distance,
		bottom: constants.paintBottomBuffer,
		width: constants.paintColorButtonSize,
		height: constants.paintColorButtonSize,
		borderRadius: constants.paintColorButtonSize/2
	});
}

PaintView.prototype.createCanvas = function() {
	return Paint.createPaintView({
	    top:0, right:0, bottom:0, left:0,
	    // strokeWidth (float), strokeColor (string), strokeAlpha (int, 0-255)
	    strokeColor:'#0f0', strokeAlpha:255, strokeWidth:10,
	    eraseMode:false
	});
}

PaintView.prototype.createColorButtons = function(colors) {
	var bs = [];
	for (var i = 0; i < colors.length; i++) {
		bs.push(this.createColorButton(colors[i], constants.paintColorButtonInitialLeft + 
											 constants.paintColorButtonLeftMultiplier*i))
	}
	return bs;
}

PaintView.prototype.createSubmitButton = function() {
	var v = Ti.UI.createView({
		backgroundColor: constants.submitButtonBackgroundColor,
		height: constants.submitButtonHeight,
		borderRadius: constants.paintColorButtonSize/4,
		width: constants.submitButtonWidth,
		bottom: constants.submitButtonBottom,
		right: constants.submitButtonInitialRight,
		borderWidth: constants.submitButtonBorderWidth,
		borderColor: constants.submitButtonBorderColor
	});

	var s = Ti.UI.createLabel({
		text: constants.submitButtonText,
		color: constants.submitButtonTextColor,
		font:{fontSize: 14, fontFamily: 'Helvetica Neue'}
	});

	v.add(s);
	return v;
}

PaintView.prototype.createTextStartButton = function() {
	return Ti.UI.createImageView({
		image: 'images/tempT.png',
		height: constants.submitButtonHeight,
		bottom: constants.paintBottomBuffer,
		right: constants.submitButtonInitialRight + constants.submitButtonWidth + 10
	});
}

PaintView.prototype.createTextInputBox = function() {
	return Ti.UI.createTextField({
	backgroundColor: '#FFF',
		color: '#000',
		opacity: constants.textInputOpacity,
		font: {fontSize:16, fontFamily: constants.labelFontFamily},
		top: constants.textInputBottomClosed, 
		left: 0,
		height: constants.textInputHeight,
		width: Titanium.Platform.displayCaps.platformWidth,
		paddingLeft: constants.paintColorButtonInitialLeft,
		paddingRight: constants.submitButtonInitialRight
	});
}

PaintView.prototype.createLoadingView = function() {
	var style;
	if (Ti.Platform.name === 'iPhone OS'){
	  style = Ti.UI.iPhone.ActivityIndicatorStyle.DARK;
	} else {
	  style = Ti.UI.ActivityIndicatorStyle.DARK;
	}
	var loading = Ti.UI.createActivityIndicator({
  	    color: 'white',
	    font: {fontFamily:'Helvetica Neue', fontSize:29, fontWeight:'bold'},
	    top:'auto',
	    left:'auto',
	    height:300,
		width:300
	});
	loading.show();
	var loadingView = Ti.UI.createView({
		top: 0, left: 0, right: 0, bottom: 0,
		backgroundColor: '#333',
		opacity: '0.7',
		visible: false
	});

	loadingView.add(loading);
	return loadingView;
}

PaintView.prototype.setPaintImage = function(pic) {
	this.org_pic = pic;
	var i = Ti.UI.createImageView({
		image: pic,
		height: 'auto',
		width: 'auto'
	});
	//Ti.API.info(i.toImage().height + " " + i.size.height + " " + (i.size.height / (Titanium.Platform.displayCaps.dpi / 160)));
	this.canvas.height = constants.deviceHeight*constants.canvasHeightMultiplier;
	this.canvas.setImage(pic);
}

PaintView.prototype.refreshImage = function() {
	this.canvas.setImage(this.org_pic);
}

PaintView.prototype.showPaintView = function() {
	this.paintView.setVisible(true);
	Ti.Media.hideCamera();
}

/* * * * * * * * * * * * * * * * * * * * *
 * 
 *  GETS
 *
 * * * * * * * * * * * * * * * * * * * * */

PaintView.prototype.getCanvas = function() {
	return this.canvas;
}

PaintView.prototype.getPaintView = function() {
	return this.paintView;
}

PaintView.prototype.getColorButtons = function() {
	return this.colorButtons;
}

PaintView.prototype.getSubmitButton = function() {
	return this.submitButton;
}

PaintView.prototype.getTextStartButton = function() {
	return this.textStartButton;
}

PaintView.prototype.getTextInputBox = function() {
	return this.textInputBox;
}

PaintView.prototype.getLoadingView = function() {
	return this.loadingView;
}

PaintView.prototype.getCancelButton = function() {
	return this.cancelButton;
}

PaintView.prototype.getEraseButton = function() {
	return this.eraseButton;
}

PaintView.prototype.getEraseBackground = function() {
	return this.eraseBackground;
}

PaintView.prototype.getRefreshButton = function() {
	return this.refreshButton;
}


module.exports = PaintView;