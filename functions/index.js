
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.updateNumberOfPlacesByArea = functions.database.ref('/placesPerArea/{areaId}/{placeId}').onWrite(event => {

  const placesCount = admin.database().ref(`/areas/${event.params.areaId}/placesCount`);

  return placesCount.transaction(function(count) {

    if (event.data.exists() && !event.data.previous.exists()) {
      return (count || 0) + 1;
    }
    else if (!event.data.exists() && event.data.previous.exists()) {
      return (count || 0) - 1;
    }

  });

});

