import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {RequestHttpService} from '../../services/request-http.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-cash-unit',
  templateUrl: './cash-unit-table.component.html',
  styleUrls: ['./cash-unit-table.component.css', '../../app.component.css']
})
export class CashUnitTableComponent implements OnInit, OnDestroy {
  totalSum: number = 0;
  cashUnits$: object[] = null;
  socketResponseCashUnitSubscription: Subscription = null;
  constructor(public requestHttpService: RequestHttpService) {
  }

  ngOnInit() {
    this.cashUnits$ = null;
    this.totalSum = null;
    this.socketResponseCashUnitSubscription = this.requestHttpService.socketResponseCashUitSubject.subscribe(data => {
      console.log(data);
      if (!!data) {
        this.cashUnits$ = [...data];
        this.totalSum = this.cashUnits$.reduce((accumulator, item) => {
          return accumulator + item['totalAmount'];
        }, 0);


      }

    });
  }

  ngOnDestroy(): void {
    this.requestHttpService.socketResponseCashUitSubject.next(null);
    this.socketResponseCashUnitSubscription.unsubscribe();
  }


}
