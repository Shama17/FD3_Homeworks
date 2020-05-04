import {Component, EventEmitter, OnInit, Input, Output, AfterViewInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {RequestHttpService} from "../../services/request-http.service";
import {Location} from '@angular/common';

@Component({
  selector: 'app-time-out',
  templateUrl: './time-out.component.html',
  styleUrls: ['./time-out.component.css', '../../app.component.css']
})
export class TimeOutComponent implements OnInit, AfterViewInit {
  timeout;
  timer;
  time = 30;
  @Input() depositFlag;
  @Output() onBackClick = new EventEmitter();


  constructor(private router: Router, private requestHttpService: RequestHttpService ) {
  }

  ngOnInit() {
    this.timeout = setTimeout(() => {
      this.exit()
          }, 30000);
  }

  ngAfterViewInit() {
    this.timer = setInterval(() => {
      this.time--;
      if (this.time === 0) {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  exit() {
    if (this.depositFlag === 'deposit') {
      this.requestHttpService.endDeposit()
    }
    clearTimeout(this.timeout);
    this.requestHttpService.logOut();
    this.router.navigate(['']);
  }

  back() {
    clearTimeout(this.timeout);
    this.onBackClick.emit();
  }


}
