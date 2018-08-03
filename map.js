let map, marker, infowindow;
//coordenadas de laboratoria en barranco
let laboratoriaLocation = {
  lat : -12.145437,
  lng : -77.021891
}
let currentLocation;
$(document).ready(function(){
  navigator.geolocation.getCurrentPosition(success, error);
})
const success = (position) => {
  currentLocation = new google.maps.LatLng(position);
  initMap();
};
const error = () => {
  alert("Te mostraremos restaurantes cerca a Laboratoria :)");
  currentLocation = laboratoriaLocation;
  initMap();
};
const toggleBounce = () => {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}

const initMap = () => {
  map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: currentLocation,
    zoom: 13
  });
  marker = new google.maps.Marker({
    map:map,
    draggable: true,
    animation: google.maps.Animation.DROP,
    position: currentLocation
  });
  marker.addListener('click', toggleBounce);
}
