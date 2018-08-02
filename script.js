//inicializar mapa
var map;
function initMap(lat, lng) {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat, lng},
    zoom: 13
  });
  marker = new google.maps.Marker({
    map:map,
    draggable: true,
    animation: google.maps.Animation.DROP,
    position: {lat, lng}
  });
  marker.addListener('click', toggleBounce);
}

function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
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
  output.innerHTML = "<p>Cargando…</p>";
  navigator.geolocation.getCurrentPosition(success, error);
}
geoFindMe();
