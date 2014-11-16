function Loc(pic_list, no_geo) {
	this.pic_list = pic_list;
	this.no_geo = no_geo;
	this.current_lat = undefined;
	this.current_lng = undefined;
}

Loc.prototype.checkForGPS = function() {
	if (Ti.Geolocation.locationServicesEnabled) {
		this.pic_list.getPicList().setVisible(true);
	    this.no_geo.getView().setVisible(false);
		return true;
	} else {
		this.no_geo.getView().setVisible(true);
		this.pic_list.getPicList().setVisible(false);
		alert('Please enable location services in your phone\'s Settings');
		return false;
	}
}

Loc.prototype.enableLocationServices = function() {
	if (this.checkForGPS()) {
	    Ti.Geolocation.purpose = 'Get Current Location';
	    Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_HUNDRED_METERS;
	    Ti.Geolocation.distanceFilter = 10;
	    Ti.Geolocation.preferredProvider = Ti.Geolocation.PROVIDER_GPS;
	} 
}

Loc.prototype.getLocation = function() {
	Ti.API.info("!!!!_!_!_!_!_!_!_!_!_!");
	 Ti.Geolocation.getCurrentPosition(function(e) { // Gets starting position
	 	Ti.API.info("Getting current position");
	        if (e.error) {
	        	this.no_geo.getView().setVisible(true);
				this.pic_list.getPicList().setVisible(false);
	            alert('Couldn\'t get location. Please check your connection.');
	            return {};
	        } else {
	        	this.pic_list.getPicList().setVisible(true);
	        	this.no_geo.getView().setVisible(false);
	        	this.current_lng = e.coords.longitude;
	        	this.current_lat = e.coords.latitude;
	        	Ti.API.info("SHIT");
	        	return {"lat": this.current_lat, "lng": this.current_lng};
	        }
	    });
	 Ti.API.info("Npothing is returning");
}


module.exports = Loc;