let map, marker;
//coordenadas de laboratoria en barranco
let laboratoriaLocation = {
  lat : -12.145437,
  lng : -77.021891
}
$(document).ready(function(){
  navigator.geolocation.getCurrentPosition(success, error);
})
function success(position) {
  var latitude  = position.coords.latitude;
  var longitude = position.coords.longitude;
  initMap(latitude, longitude);

};
function error() {
  alert("Unable to retrieve your location");
  initMap(laboratoriaLocation.lat, laboratoriaLocation.lng);
  console.log('entro')
};

const initMap = (lat, lng) => {

  map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: {lat, lng},
    zoom: 16
  });
  marker = new google.maps.Marker({
    position: {lat, lng},
    map:map
  })
}
