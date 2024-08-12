$(document).ready(function () {
  const selectedAmenities = {};

  $('input[type="checkbox"]').change(function () {
    if (this.checked) { selectedAmenities[$(this).data('id')] = $(this).data('name'); } else { delete selectedAmenities[$(this).data('id')]; }

    $('.amenities h4').text(Object.values(selectedAmenities).join(', ') || String.fromCharCode(160));
  });
});
