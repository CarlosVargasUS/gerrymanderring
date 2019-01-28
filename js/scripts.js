$(document).ready(function () {
  console.log('scripts loaded');

  var url = 'js/Precincts-simplified2.geojson';
  var d = [];


  // var bbox = turf.bbox(features);

  //console.log(turf);


  L.mapbox.accessToken = 'pk.eyJ1IjoiY3N2MTciLCJhIjoiY2pwMDhvMnduMDUzajNrcnp2cGhvN2EwaiJ9.OIhZD-GOKgPn0qEI9wCz0A';

  var state = document.getElementById('state');
  var map = L.mapbox.map('map', 'mapbox.emerald')
    .setView([35.9132, -79.0558], 4);

  $.ajax({
    type: 'GET',
    url: 'js/ncr2.geojson',
    dataType: 'json',
    data: d,
    success: function (d) {
      //console.log(d);
      //console.log(d.features[0]);
      //console.log(d.features[0].geometry);
      //console.log(d.features[0].geometry.coordinates[0]);


      for (i = 0; i < d.features[0].geometry.coordinates.length; i++) {


      }

      var poly2 = d.features[0].geometry.coordinates[1];

      var states = L.geoJson(d).addTo(map);
      L.marker([35.7596, -79.0193], {
          icon: L.mapbox.marker.icon({
            'marker-color': '#f86767'
          }),
          draggable: false
        }).addTo(map)
        .on('dragend', function (e) {
          var layer = leafletPip.pointInLayer(this.getLatLng(), states, true);
          if (layer.length) {
            state.innerHTML = '<strong>' + layer[0].feature.properties.name + '</strong>';
          } else {
            state.innerHTML = '';
          }
        });

      console.log(states);

      //stop drag on map

   
        $('stopDrag').click(function(){
          map.draggable.disable();
          return false;
        });

      // map.on('stopDrag', function (e) {
      //   $(this).dragging.disable();
      //   return false;
      // });

      var selected = [];

      // states.on('ondragstart', function (e) {
      //   var layer = e.layer;
      //   var polygon = layer.feature;
      //   var precinctInfo = polygon.properties;

      //   layer.setStyle({
      //     'color': 'blue'
      //   });

      //   selected.push(polygon);
      // });

      states.on('click', function (e) {
        var layer = e.layer;
        var polygon = layer.feature;
        var precinctInfo = polygon.properties;

        layer.setStyle({
          'color': 'yellow'
        });

        selected.push(polygon);


        //union of two polygons
        if (selected.length == 2) {
          var union = turf.union(selected[0], selected[1]);
          console.log(union);

          L.geoJson(union.toGeoJSON()).addTo(map);

          /*map.addLayer({
            'id': 'urban-areas-fill',
            'type': 'fill',
            'source': {
                'type': 'geojson',
                'data': union
            },
            'layout': {},
            'paint': {
                'fill-color': '#f08',
                'fill-opacity': 0.4
            }
        // This is the important part of this example: the addLayer
        // method takes 2 arguments: the layer as an object, and a string
        // representing another layer's name. if the other layer
        // exists in the stylesheet already, the new layer will be positioned
        // right before that layer in the stack, making it possible to put
        // 'overlays' anywhere in the layer stack.
        // Insert the layer beneath the first symbol layer.
        });*/
        }
      });
    }
  });

});