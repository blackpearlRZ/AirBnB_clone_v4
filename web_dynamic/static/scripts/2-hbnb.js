$(document).ready(function () {
  const selectedAmenities = {};

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

  $('input[type="checkbox"]').change(function () {
    if (this.checked) { selectedAmenities[$(this).data('id')] = $(this).data('name'); } else { delete selectedAmenities[$(this).data('id')]; }

    $('.amenities h4').text(Object.values(selectedAmenities).join(', ') || String.fromCharCode(160));
  });
});
