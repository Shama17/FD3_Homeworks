import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {RequestHttpService} from './request-http.service';
import {observableToBeFn} from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http: HttpClient, private router: Router, private requestHttpService: RequestHttpService) {
  }

  getAvailableServices(userID): Observable<any> {
    const AvailableServicesSubject = new Subject();
    this.requestHttpService.getAvailableServices(userID).subscribe(services => {
      AvailableServicesSubject.next(services);
      AvailableServicesSubject.complete();
    }, error => {
      AvailableServicesSubject.next(null);
      AvailableServicesSubject.complete();
    });
    return AvailableServicesSubject;
  }

  changePassword(oldPassword, newPassword): Observable<any> {
    const resultChangePassword = new Subject();
    this.requestHttpService.changePassword(oldPassword, newPassword).subscribe(result => {
      resultChangePassword.next(result);
      resultChangePassword.complete();
    }, error => {
      resultChangePassword.next(null);
      resultChangePassword.complete();
    });
    return resultChangePassword;
  }

  startDeposit(depositDestination): Observable<any> {
    const startDepositSubject = new Subject();
    this.requestHttpService.startDeposit(depositDestination).subscribe(result => {
      startDepositSubject.next(result);
      startDepositSubject.complete();
    }, error => {
      startDepositSubject.next(null);
      startDepositSubject.complete();
    });
    return startDepositSubject;
  }

  endDeposit(): Observable<any> {
    const endDepositSubject = new Subject();
    this.requestHttpService.endDeposit().subscribe(result => {
      endDepositSubject.next(result);
      endDepositSubject.complete();
    }, error => {
      endDepositSubject.next(null);
      endDepositSubject.complete();
    });
    return endDepositSubject;
  }


}

