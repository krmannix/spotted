// General constants
module.exports.primaryColor = '#545993';
module.exports.secondaryColor = '#c5c6c3';
module.exports.tertiaryColor = '#7E7F7E';
module.exports.borderColor = 'white';
module.exports.deviceHeight = Titanium.Platform.displayCaps.platformHeight;
module.exports.deviceWidth = Titanium.Platform.displayCaps.platformWidth;

// Top banner
module.exports.bannerTopBuffer = 15;
module.exports.bannerHeight = 40;
module.exports.bannerHeightWithBuffer = module.exports.bannerHeight + module.exports.bannerTopBuffer;
module.exports.bannerButtonHeight = module.exports.bannerHeight*0.8;
module.exports.bannerLogoHeight = module.exports.bannerHeight*0.95;
module.exports.bannerLogoWidth = module.exports.bannerLogoHeight;
module.exports.bannerButtonTop = module.exports.bannerTopBuffer + (module.exports.bannerHeight - module.exports.bannerButtonHeight)/2;
module.exports.bannerButtonSpaceFromSide = 10;
module.exports.bannerBorderWidth = 4;
module.exports.bannerLeft = -1*(module.exports.deviceWidth - module.exports.bannerLogoWidth - module.exports.bannerButtonSpaceFromSide);	

// Constants for the table
module.exports.tableTop = module.exports.bannerHeightWithBuffer; //+ module.exports.bannerBorderWidth;
module.exports.rowHeight = module.exports.deviceWidth;

module.exports.imageHeightMultiplier = 0.9;
module.exports.imageHeight = module.exports.rowHeight*module.exports.imageHeightMultiplier;
module.exports.imageWidth = module.exports.deviceWidth*0.9;
module.exports.imageTop = module.exports.rowHeight*(1-module.exports.imageHeightMultiplier);
module.exports.imageDefault = "images/defaultImage.png";

module.exports.timeStampHeight = 17;
module.exports.timeStampTextTop = module.exports.imageTop + module.exports.timeStampHeight/5;

// Constants for NoGeoView/ErrorPictureView
module.exports.noGeoHeight = module.exports.deviceHeight - module.exports.bannerHeightWithBuffer;
module.exports.noGeoText = "You have GPS turned off for this app. Please change this in your phone's Settings to use Spottd.\n\nThanks!";
module.exports.noGeoTextWidth = module.exports.deviceWidth*0.8;
module.exports.noGeoTextTop = 10;
module.exports.errorPictureText = "There was an error fetching the pictures. \n\nTry again in a bit!";

// Constants for the camera
module.exports.pictureButtonHeight = 80;
module.exports.pictureButtonWidth = module.exports.pictureButtonHeight;
module.exports.pictureButtonBottom = 20;
module.exports.pictureButtonBGHeight = module.exports.pictureButtonHeight + 10;
module.exports.pictureButtonBGWidth = module.exports.pictureButtonBGHeight;
module.exports.switchCameraButtonHeight = 35;
module.exports.cameraSpaceFromSide = 10;

// Paint View Variables
module.exports.paintColors = ['#FF0000', '#FFA500', '#FFFF00',
							  '#00FF00', '#0000FF', '#800080', 
							  '#FFFFFF'];
module.exports.paintBottomBuffer = 10;

module.exports.paintColorButtonSize = 35; //20
module.exports.paintColorButtonBuffer = 5;
module.exports.paintColorButtonInitialLeft = 10;

module.exports.paintColorButtonLeftMultiplier = module.exports.paintColorButtonSize +
												((module.exports.deviceWidth 
												  - module.exports.paintColorButtonInitialLeft
												  - module.exports.paintColorButtonSize*module.exports.paintColors.length)/
												module.exports.paintColors.length-1);

module.exports.submitButtonWidth = 70;
module.exports.submitButtonHeight = module.exports.switchCameraButtonHeight;
module.exports.submitButtonInitialRight = module.exports.paintColorButtonInitialLeft;
module.exports.submitButtonBorderColor = '#333';
module.exports.submitButtonBorderWidth = 2;
module.exports.submitButtonBackgroundColor = '#666';
module.exports.submitButtonTextColor = '#DDD';
module.exports.submitButtonText = 'Post';
module.exports.submitButtonBottom = module.exports.submitButtonHeight + module.exports.paintBottomBuffer + 10;

module.exports.eraseBackgroundBuffer = 7;

module.exports.paintCancelButtonBottom = module.exports.submitButtonBottom;

module.exports.textInputHeight = 40;
module.exports.textInputOpacity = 0.5;
module.exports.textInputBottomOpen = 15;
module.exports.textInputBottomClosed = -1*(module.exports.textInputBottomOpen+module.exports.textInputHeight);
