function initialize() {
  var centerlatlng = new google.maps.LatLng(47.656811, -122.311691);
  var myOptions = {
    zoom: 13,
    center: centerlatlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

var PolylineCoordinates = [
new google.maps.LatLng(47.656815, -122.311605),
new google.maps.LatLng(47.656817, -122.312055),
new google.maps.LatLng(47.656832, -122.313248),
new google.maps.LatLng(47.656846, -122.314404),
new google.maps.LatLng(47.656224, -122.314420),
new google.maps.LatLng(47.656234, -122.315577),
new google.maps.LatLng(47.656226, -122.317875),
new google.maps.LatLng(47.655725, -122.318811),
new google.maps.LatLng(47.655876, -122.319804),
new google.maps.LatLng(47.655919, -122.320874),
new google.maps.LatLng(47.657517, -122.320844),
new google.maps.LatLng(47.659466, -122.320837),
new google.maps.LatLng(47.660210, -122.320833),
new google.maps.LatLng(47.660492, -122.320922),
new google.maps.LatLng(47.661319, -122.320792),
new google.maps.LatLng(47.661718, -122.320736),
new google.maps.LatLng(47.662041, -122.320913),
new google.maps.LatLng(47.665332, -122.321795),
new google.maps.LatLng(47.668616, -122.321782),
new google.maps.LatLng(47.669908, -122.321738),
new google.maps.LatLng(47.676886, -122.320418),
new google.maps.LatLng(47.683553, -122.321985),
new google.maps.LatLng(47.685403, -122.324255),
new google.maps.LatLng(47.693474, -122.329069),
new google.maps.LatLng(47.702362, -122.329353),
new google.maps.LatLng(47.706015, -122.329280),
new google.maps.LatLng(47.706655, -122.328655),
new google.maps.LatLng(47.704994, -122.328551),
new google.maps.LatLng(47.704086, -122.328539),
new google.maps.LatLng(47.703178, -122.328527),
new google.maps.LatLng(47.703166, -122.327265),
new google.maps.LatLng(47.703158, -122.325838),
new google.maps.LatLng(47.703152, -122.324924),
new google.maps.LatLng(47.703148, -122.324372),
new google.maps.LatLng(47.703145, -122.323962),
new google.maps.LatLng(47.703139, -122.323150),
new google.maps.LatLng(47.704034, -122.323160),
new google.maps.LatLng(47.704954, -122.323171),
new google.maps.LatLng(47.704936, -122.320486),
new google.maps.LatLng(47.704923, -122.318494),
new google.maps.LatLng(47.704918, -122.317801),
new google.maps.LatLng(47.704010, -122.317774),
new google.maps.LatLng(47.703102, -122.317746),
new google.maps.LatLng(47.702194, -122.317719),
new google.maps.LatLng(47.701286, -122.317692),
new google.maps.LatLng(47.700378, -122.317664),
];

var Path = new google.maps.Polyline({
clickable: false,
geodesic: true,
path: PolylineCoordinates,
strokeColor: "#6495ED",
strokeOpacity: 1.000000,
strokeWeight: 6
});

Path.setMap(map);


}
