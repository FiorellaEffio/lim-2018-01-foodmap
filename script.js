let map, infowindow;
//coordenadas de laboratoria en barranco
let laboratoriaLocation = {
  lat : -12.145437,
  lng : -77.021891
}
let currentLocation;
const success = (position) => {
  console.log(position);
  currentLocation = {
    lat : position.coords.latitude,
    lng : position.coords.longitude
  };
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
function initMap() {
  console.log(currentLocation);
  map = new google.maps.Map(document.getElementById('map'), {
    center: currentLocation,
    zoom: 16
  });

  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: currentLocation,
    radius: 500,
    type: ['restaurant']
  }, callback);
}

function callback(results, status) {
  console.log(results);
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
      printRestaurantsDivs(results[i]);
    }
  }
}
function printRestaurantsDivs(objRestaurant) {
  let answerOpenNow ='No hay información :(';
  console.log(objRestaurant.hasOwnProperty('opening_hours'));
  if(objRestaurant.hasOwnProperty('opening_hours') === true){
    if(objRestaurant.opening_hours.open_now === false){
      answerOpenNow = 'NO :(';
    } else {
      answerOpenNow = 'SI :)';
    }
  }
  let restaurantContainer = document.getElementById('restaurants');
  restaurantContainer.innerHTML += `
  <div class="divRestaurant card">
    <div class="card-body">
    <h1>${objRestaurant.name}</h1>
    <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target=${'#R'+objRestaurant.id}>Mas info</button>
    </div>
  </div>`;
  let modalForRestaurantContainer = document.getElementById('modalsForRestaurants');
  photoRestaurant = ''
  modalsForRestaurants.innerHTML += `
  <div class="modal fade" id=${'R'+objRestaurant.id} role="dialog">
    <div class="modal-dialog">
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">${objRestaurant.name}</h4>
          <img src=""/>
        </div>
        <div class="modal-body">
          <div id=${'M'+objRestaurant.id}></div>
          <p>Ubicado en : ${objRestaurant.vicinity}</p>
          <p>Abierto ahora: ${answerOpenNow}</p>
          <p>Calificación: ${objRestaurant.rating}</p>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star"></span>
          <span class="fa fa-star"></span>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-info" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
  `;
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}
navigator.geolocation.getCurrentPosition(success, error);
