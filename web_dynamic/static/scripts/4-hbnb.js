const selectedAmenities = {};

function fetchPlaceOwner (place) {
  return $.ajax({
    url: `http://0.0.0.0:5001/api/v1/users/${place.user_id}`,
    type: 'GET'
  });
}

function fetchPlaces (amenities) {
  const data = {};
  if (amenities.length) { data.amenities = amenities; }

  return $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    data: JSON.stringify(data),
    contentType: 'application/json'
  });
}

function renderPlaces () {
  fetchPlaces(Object.keys(selectedAmenities)).done(function (places) {
    $('section.places').empty();
    for (const place of places) {
      fetchPlaceOwner(place).done(function (user) {
        $('section.places').append(
        `<article>
          <div class="title_box">
            <h2>${place.name}</h2>
            <div class="price_by_night">$${place.price_by_night}</div>
          </div>
          <div class="information">
            <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
            <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
            <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
          </div>
          <div class="user"><strong>Owner: </strong>${user.first_name} ${user.last_name}</div>
          <div class="description">
            ${place.description}
          </div>
        </article>`
        );
      });
    }
  });
}

function renderApiStatus () {
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/status/',
    type: 'GET',
    success: function (data) {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    }
  });
}

function handleFilterChange () {
  if (this.checked) selectedAmenities[$(this).data('id')] = $(this).data('name');
  else delete selectedAmenities[$(this).data('id')];

  $('.amenities h4').text(Object.values(selectedAmenities).join(', ') || String.fromCharCode(160));
}

$(document).ready(function () {
  $('input[type="checkbox"]').change(handleFilterChange);
  $('button').click(renderPlaces);

  renderApiStatus();
  renderPlaces();
});
