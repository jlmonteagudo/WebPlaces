import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

export class FirebaseService {

  actionAsObservable(action: firebase.Promise<any>): Observable<any> {
    const subject: Subject<any> = new Subject();

    action.then(
      val => {
        subject.next();
        subject.complete();
      },
      err => {
        subject.error(err);
        subject.complete();
      }
    );

    return subject.asObservable();

  }

}

