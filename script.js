// var preload = document.getElementById("preload");
// var loading = 0;
// var id = setInterval(frame, 64);
//
// function frame(){
//   if(loading == 100) {
//    clearInterval(id);
//    window.open("welcome.html", "_self");
//   } else {
//      loading = loading + 1;
//      if(loading == 90) {
//        preload.style.animation = "fadeout 1s ease";
//      }
//   }
// }
//inicializar mapa
var map;
function initMap(lat, lng) {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat, lng},
    zoom: 8
  });
}
//geolocalizacion
function geoFindMe() {
  var output = document.getElementById("out");
  if (!navigator.geolocation){
    console.log("<p>Geolocation is not supported by your browser</p>");
    return;
  }
  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;
    initMap(latitude, longitude);
  };
  function error() {
    console.log("Unable to retrieve your location");
  };
  output.innerHTML = "<p>Locating…</p>";
  navigator.geolocation.getCurrentPosition(success, error);
}
