import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {RequestHttpService} from './request-http.service';


@Injectable({
  providedIn: 'root'
})
export class AdministratorDataService {

  constructor(private http: HttpClient, private router: Router, private requestHttpService: RequestHttpService) {
  }

  getAdmModuleStatus(): Observable<any> {
    const AdmModulesSubject = new Subject();
    this.requestHttpService.getAdmModuleStatus().subscribe(modules => {
      AdmModulesSubject.next(modules);
      AdmModulesSubject.complete();
    }, error => {
      AdmModulesSubject.next(null);
      AdmModulesSubject.complete();
    });
    return AdmModulesSubject;
  }


  getComponentStatus(component): Observable<any> {
    const componentStatusSubject = new Subject();
    this.requestHttpService.getComponentStatus(component).subscribe(modules => {
      componentStatusSubject.next(modules);
      componentStatusSubject.complete();
    }, error => {
      componentStatusSubject.next(null);
      componentStatusSubject.complete();
    });
    return componentStatusSubject;
  }

  restartAdm(): Observable<any> {
    const restartAdmSubject = new Subject();
    this.requestHttpService.restartADM().subscribe(response => {
      restartAdmSubject.next(response);
      restartAdmSubject.complete();
    }, error => {
      restartAdmSubject.next(null);
      restartAdmSubject.complete();
    });
    return restartAdmSubject;
  }


  turnOffAdm(): Observable<any> {
    const restartAdmSubject = new Subject();
    this.requestHttpService.turnOffADM().subscribe(response => {
      restartAdmSubject.next(response);
      restartAdmSubject.complete();
    }, error => {
      restartAdmSubject.next(null);
      restartAdmSubject.complete();
    });
    return restartAdmSubject;
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
