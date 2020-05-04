import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {RequestHttpService} from './request-http.service';


@Injectable({
  providedIn: 'root'
})
export class CashCollectorDataService {

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

  getCashUnits(): Observable<any> {
    const CashUnitsSubject = new Subject();
    this.requestHttpService.getCashUnits().subscribe(cashUnits => {
      CashUnitsSubject.next(cashUnits);
      CashUnitsSubject.complete();
    }, error => {
      CashUnitsSubject.next(null);
      CashUnitsSubject.complete();
    });
    return CashUnitsSubject;
  }

  openSafe(device): Observable<any> {
    const openDeviceSubject = new Subject();
    this.requestHttpService.openSafe(device).subscribe(result => {
      openDeviceSubject.next(result);
      openDeviceSubject.complete();
    }, error => {
      openDeviceSubject.next(null);
      openDeviceSubject.complete();
    });
    return openDeviceSubject;
  }


  safeStatus(device): Observable<any> {
    const DeviceSafeStatusSubject = new Subject();
    this.requestHttpService.safeStatus(device).subscribe(result => {
      DeviceSafeStatusSubject.next(result);
      DeviceSafeStatusSubject.complete();
    }, error => {
      DeviceSafeStatusSubject.next(null);
      DeviceSafeStatusSubject.complete();
    });
    return DeviceSafeStatusSubject;
  }

  printCollectionReceipt(): Observable<any> {
    const CollectionReceiptSubject = new Subject();
    this.requestHttpService.printCollectionReceipt().subscribe(result => {
      CollectionReceiptSubject.next(result);
      CollectionReceiptSubject.complete();
    }, error => {
      CollectionReceiptSubject.next(null);
      CollectionReceiptSubject.complete();
    });
    return CollectionReceiptSubject;
  }

  endDepositForReceipt(status): Observable<any> {
    const EndDepositSubject = new Subject();
    this.requestHttpService.endDepositForReceipt(status).subscribe(result => {
      EndDepositSubject.next(result);
      EndDepositSubject.complete();
    }, error => {
      EndDepositSubject.next(null);
      EndDepositSubject.complete();
    });
    return EndDepositSubject;
  }

  openOC(): Observable<any> {
    const openOCSubject = new Subject();
    this.requestHttpService.openOC().subscribe(result => {
      openOCSubject.next(result);
      openOCSubject.complete();
    }, error => {
      openOCSubject.next(null);
      openOCSubject.complete();
    });
    return openOCSubject;
  }

}
