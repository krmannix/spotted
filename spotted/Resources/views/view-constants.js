// General constants
module.exports.primaryColor = '#BF5FFF';
module.exports.secondaryColor = '#D8BFD8';
module.exports.borderColor = 'white';
module.exports.deviceHeight = Titanium.Platform.displayCaps.platformHeight;
module.exports.deviceWidth = Titanium.Platform.displayCaps.platformWidth;

// Top banner
module.exports.bannerTopBuffer = 15;
module.exports.bannerHeight = 30;
module.exports.bannerHeightWithBuffer = module.exports.bannerHeight + module.exports.bannerTopBuffer;
module.exports.bannerButtonHeight = module.exports.bannerHeight*0.8;
module.exports.bannerButtonTop = module.exports.bannerTopBuffer + (module.exports.bannerHeight - module.exports.bannerButtonHeight)/2;
module.exports.bannerButtonSpaceFromSide = 10;
module.exports.bannerBorderWidth = 4;	

// Constants for the table
module.exports.tableTop = module.exports.bannerHeightWithBuffer; //+ module.exports.bannerBorderWidth;
module.exports.rowHeight = module.exports.deviceWidth;
module.exports.imageHeightMultiplier = 0.9;
module.exports.imageHeight = module.exports.rowHeight*module.exports.imageHeightMultiplier;
module.exports.imageWidth = module.exports.deviceWidth*0.9;
module.exports.imageTop = module.exports.rowHeight*(1-module.exports.imageHeightMultiplier);

module.exports.timeStampHeight = 17;
module.exports.timeStampTextTop = module.exports.imageTop + module.exports.timeStampHeight/5;
