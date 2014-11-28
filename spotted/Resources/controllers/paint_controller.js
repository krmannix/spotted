var Paint = require('ti.paint');
var constants = require('./controller-constants');

function PaintController() {
	this.colorButtons = this.createColorButtons(['#FF0000', '#FFA500', '#FFFF00',
												 '#00FF00', '#0000FF', '#800080']);
	this.submitButton = this.createSubmitButton();
	this.textStartButton = this.createTextStartButton();
	this.textInputBox = this.createTextInputBox();
	this.canvas = this.createCanvas();
	this.paintView = this.createPaintView();
}

/* * * * * * * * * * * * * * * * * * * * *
 * 
 *  ACTIONS
 *
 * * * * * * * * * * * * * * * * * * * * */

PaintController.prototype.changeStrokeColor = function(color) {
	this.canvas.strokeColor = color;
}

/* * * * * * * * * * * * * * * * * * * * *
 * 
 *  CREATES
 *
 * * * * * * * * * * * * * * * * * * * * */

PaintController.prototype.createPaintView = function() {
	var pv = Ti.UI.createView({
		top:0, right:0, bottom:0, left:0
	});
	pv.add(this.canvas);
	pv.add(this.submitButton);
	pv.add(this.textStartButton);
	pv.add(this.textInputBox);
	for (var i = 0; i < this.colorButtons.length; i++) {
		pv.add(this.colorButtons[i]);
	}
	// Add text button
	return pv;
}

PaintController.prototype.createColorButton = function(color, x_distance) {
	return Ti.UI.createView({
		backgroundColor: color,
		left: x_distance,
		bottom: constants.paintBottomBuffer,
		width: constants.paintColorButtonSize,
		height: constants.paintColorButtonSize,
		borderRadius: constants.paintColorButtonSize/2
	});
}

PaintController.prototype.createCanvas = function() {
	return Paint.createPaintView({
	    top:0, right:0, bottom:0, left:0,
	    // strokeWidth (float), strokeColor (string), strokeAlpha (int, 0-255)
	    strokeColor:'#0f0', strokeAlpha:255, strokeWidth:10,
	    eraseMode:false
	});
}

PaintController.prototype.createColorButtons = function(colors) {
	var bs = [];
	for (var i = 0; i < colors.length; i++) {
		bs.push(this.createColorButton(colors[i], constants.paintColorButtonInitialLeft + 
											 (constants.paintColorButtonSize + constants.paintColorButtonBuffer)*i))
	}
	return bs;
}

PaintController.prototype.createSubmitButton = function() {
	var v = Ti.UI.createView({
		backgroundColor: constants.submitButtonBackgroundColor,
		height: constants.submitButtonHeight,
		borderRadius: constants.paintColorButtonSize/4,
		width: constants.submitButtonWidth,
		bottom: constants.paintBottomBuffer,
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

PaintController.prototype.createTextStartButton = function() {
	return Ti.UI.createImageView({
		image: 'images/tempT.png',
		height: constants.submitButtonHeight,
		bottom: constants.paintBottomBuffer,
		right: constants.submitButtonInitialRight + constants.submitButtonWidth + 10
	});
}

PaintController.prototype.createTextInputBox = function() {
	return Ti.UI.createTextField({
	backgroundColor: '#FFF',
		color: '#000',
		opacity: constants.textInputOpacity,
		font: {fontSize:16, fontFamily: constants.labelFontFamily},
		bottom: constants.textInputBottomClosed, 
		left: 0,
		height: constants.textInputHeight,
		width: Titanium.Platform.displayCaps.platformWidth,
		paddingLeft: constants.paintColorButtonInitialLeft,
		paddingRight: constants.submitButtonInitialRight
	});
}

/* * * * * * * * * * * * * * * * * * * * *
 * 
 *  GETS
 *
 * * * * * * * * * * * * * * * * * * * * */

PaintController.prototype.getCanvas = function() {
	return this.canvas;
}

PaintController.prototype.getPaintView = function() {
	return this.paintView;
}

PaintController.prototype.getColorButtons = function() {
	return this.colorButtons;
}

PaintController.prototype.getSubmitButton = function() {
	return this.submitButton;
}

PaintController.prototype.getTextStartButton = function() {
	return this.textStartButton;
}

PaintController.prototype.getTextInputBox = function() {
	return this.textInputBox;
}


module.exports = PaintController;