import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Auth } from './auth';

import * as firebase from 'firebase';
import 'rxjs/add/observable/fromPromise';

@Injectable()
export class AuthService {

  static ANONYMOUS : Auth = new Auth(null);
  auth$: BehaviorSubject<Auth> = new BehaviorSubject<Auth>(AuthService.ANONYMOUS);

  constructor(private afAuth: AngularFireAuth) {}

  login(email: string, password: string): Observable<any> {
    const subject = new Subject<any>();

    this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then(user => {
      this.auth$.next(new Auth(user.uid));
      subject.next(user);
      subject.complete();
    })
    .catch(err => {
      subject.error(err);
      subject.complete();
    });

    return subject.asObservable();

  }

  logout() {
    this.afAuth.auth.signOut();
    this.auth$.next(AuthService.ANONYMOUS);
  }

}
