import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { FirebaseService } from '../common/firebase.service';
import { Place } from './place';
import * as firebase from 'firebase';
import * as _ from 'lodash';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/combineLatest';


@Injectable()
export class PlaceService extends FirebaseService {

  constructor(private db: AngularFireDatabase) {
    super();
  }


  find(key: string): Observable<Place> {
    return this.db.object(`/places/${key}`).map(Place.fromJSON);
  }

  findAll(): Observable<Place[]> {
    return this.db.list('/places').map(Place.fromJSONArray);
  }

  findByArea(areaId: string): Observable<Place[]> {

    return this.db.list(`/placesPerArea/${areaId}`)
      .map(places => places.map(place => place.$key))
      .map(places => places.map(placeKey => this.db.object(`/places/${placeKey}`)))
      .flatMap(places => (places.length === 0) ? Observable.of([]) : Observable.combineLatest(places))
      .map(this.sortPlacesByPriority);
  }

  sortPlacesByPriority(places: Place[]): Place[] {
    return places.sort((a: Place, b: Place) => {
      return a.priority -  b.priority;
    });
  }

  create(place: Place): Observable<any> {
    delete place.$key;

    const newPlaceKey: string = this.db.list('/places').push(null).key;
    let updates: any = {};

    updates[`/places/${newPlaceKey}`] = place;
    updates[`/placesPerArea/${place.areaId}/${newPlaceKey}`] = true;

    const action: firebase.Promise<any> = this.db.object('/').update(updates);
    return super.actionAsObservable(action);

  }


  update(place: Place): Observable<any> {
    let updatedPlace: Place = Object.assign({}, place);
    delete updatedPlace.$key;
    const action: firebase.Promise<any> = this.db.list('/places').update(place.$key, updatedPlace);
    return super.actionAsObservable(action);
  }

  delete(place: Place): Observable<any> {
    let updates: any = {};

    updates[`/places/${place.$key}`] = null;
    updates[`/placesPerArea/${place.areaId}/${place.$key}`] = null;

    const action: firebase.Promise<any> = this.db.object('/').update(updates);
    return super.actionAsObservable(action);
  }


  uploadImages(place: Place, files: File[] | File): void {
    if (files instanceof FileList) {
      _.each(files, (file) => this.uploadImage(place, file));
    } else {
      this.uploadImage(place, files);
    }
  }

  uploadImage(place: Place, file: any): void {
    let storageRef: firebase.storage.Reference = firebase.storage().ref();
    let uploadTask: firebase.storage.UploadTask = storageRef.child(`places/images/${file.name}`).put(file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => { console.log('Place files uploaded'); },
      (error) => { console.warn('Place error uploading files:', error.message); },
      () => {
        if (!place.images) place.images = [];
        place.images.push(uploadTask.snapshot.downloadURL);
        this.update(place);
      }
    );

  }

}

