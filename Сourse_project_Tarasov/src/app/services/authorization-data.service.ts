import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';

import {RequestHttpService} from './request-http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationDataService {
  public user = null;
  public tabletId = null;

  constructor(private http: HttpClient, private router: Router, private requestHttpService: RequestHttpService) {
  }


  authorization(login, personalNumber, password): Observable<any> {
    const UserSubject = new Subject();
    this.requestHttpService.authorization(login, personalNumber, password).subscribe(user => {
      this.user = user;
      UserSubject.next(user);
      UserSubject.complete();
    }, error => {
      this.user = null;
      UserSubject.next(null);
      UserSubject.complete();
    });
    return UserSubject;
  }

  tabletAuthorization(password): Observable<any> {
    const UserSubject = new Subject();
    this.requestHttpService.tabletAuthorization(this.tabletId, password).subscribe(user => {
      this.user = user;
      UserSubject.next(user);
      UserSubject.complete();
    }, error => {
      this.user = null;
      UserSubject.next(null);
      UserSubject.complete();
    });
    return UserSubject;
  }

  checkBancAccount(UNP, account): Observable<any> {
    const AccountSubject = new Subject();
    this.requestHttpService.checkBancAccount(UNP, account).subscribe(response => {
      AccountSubject.next(response);
      AccountSubject.complete();
    }, error => {
      this.user = null;
      AccountSubject.next(null);
      AccountSubject.complete();
    });
    return AccountSubject;
  }

  doneRegistration(unp, account, pwd): Observable<any> {
    const RegisteredUserSubject = new Subject();
    this.requestHttpService.doneRegistration(unp, account, pwd).subscribe(user => {
      RegisteredUserSubject.next(user);
      RegisteredUserSubject.complete();
    }, error => {
      this.user = null;
      RegisteredUserSubject.next(null);
      RegisteredUserSubject.complete();
    });
    return RegisteredUserSubject;
  }

  printRegReceipt(): Observable<any> {
    const PrintRegistrationReceipt = new Subject();
    this.requestHttpService.printRegReceipt().subscribe(response => {
      PrintRegistrationReceipt.next(response);
      PrintRegistrationReceipt.complete();
    }, error => {
      this.user = null;
      PrintRegistrationReceipt.next(null);
      PrintRegistrationReceipt.complete();
    });
    return PrintRegistrationReceipt;
  }


}
