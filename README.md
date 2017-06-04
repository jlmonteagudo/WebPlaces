# WebPlaces

Usually, when we have to develop a mobile application, we also need to develop a backoffice to manage the information that is displayed in the mobile app.

The following system is composed by two modules: 
- An Angular backoffice to manage the information that is displayed in the mobile application. This is the backoffice repository
- An Ionic mobile application. Here you can find the [Ionic app repository](https://github.com/jlmonteagudo/IonicPlaces)

You can get more information about this [SAMPLE APP DEVELOPED WITH ANGULAR, IONIC AND FIREBASE](http://www.jlmonteagudo.com/app/places/).

Firebase has been used as backend.

## Running the application

- Clone this repository: `git clone https://github.com/jlmonteagudo/WebPlaces`
- Update the Firebase configuration file: `WebPlaces/src/environments/firebase.config.ts`
- Update the Google Maps API KEY in the file: `WebPlaces/src/environments/map.config.ts`
- Install dependencies: `npm install`
- Run application: `ng serve`

