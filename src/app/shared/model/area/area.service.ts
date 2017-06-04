import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { FirebaseService } from '../common/firebase.service';
import { Area } from './area';
import * as firebase from 'firebase';
import * as _ from 'lodash';


@Injectable()
export class AreaService extends FirebaseService {

  constructor(private db: AngularFireDatabase) {
    super();
  }


  find(key: string): Observable<Area> {
    return this.db.object(`/areas/${key}`).map(Area.fromJSON);
  }

  findAll(query?: any): Observable<Area[]> {
    let options: any = query ? { query } : {};
    return this.db.list('/areas', options).map(Area.fromJSONArray);
  }

  create(area: Area): Observable<any> {
    delete area.$key;
    const action: firebase.Promise<any> = this.db.list('/areas').push(area);
    return super.actionAsObservable(action);
  }

  update(area: Area): Observable<any> {
    let updatedArea: Area = Object.assign({}, area);
    delete updatedArea.$key;
    const action: firebase.Promise<any> = this.db.list('/areas').update(area.$key, updatedArea);
    return super.actionAsObservable(action);
  }

  delete(key: string): Observable<any> {
    const action: firebase.Promise<any> = this.db.list('/areas').remove(key);
    return super.actionAsObservable(action);
  }


  uploadImages(area: Area, files: File[] | File): void {
    if (files instanceof FileList) {
      _.each(files, (file) => this.uploadImage(area, file));
    } else {
      this.uploadImage(area, files);
    }
  }  

  uploadImage(area: Area, file: any): void {
    let storageRef: firebase.storage.Reference = firebase.storage().ref();
    let uploadTask: firebase.storage.UploadTask = storageRef.child(`areas/images/${file.name}`).put(file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => { console.log('Area files uploaded'); },
      (error) => { console.warn('Area error uploading files:', error.message); },
      () => {
        area.imageUrl = uploadTask.snapshot.downloadURL;
        this.update(area);
      }
    );

  }

}

