import { InjectionToken } from '@angular/core';
import { Marker } from "app/shared/model/marker/marker";

//Defaults to Madrid coordenates
export const MARKER_DEFAULT_CONFIG: Marker = {
  latitude: 40.41694864693062,
  longitude: -3.7035347587219576,
  isDraggable: true
};

export let MARKER_DEFAULT_CONFIG_PROVIDER = new InjectionToken<Marker>('marker.default.config');

export const GOOGLE_MAPS_API_KEY = 'AIzaSyAfwNFzdHPW8R4NWuHTNJE1fMxFZtPgsZ8';
