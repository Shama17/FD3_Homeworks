import {Component, Input, OnDestroy, OnInit, Output, EventEmitter} from '@angular/core';
import {RequestHttpService} from '../../services/request-http.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {ErrorMessageInterface} from '../../model/model';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css', '../../app.component.css']
})
export class PopUpComponent implements OnInit, OnDestroy {
  @Input() error;
  @Input() buttonNameLeft;
  @Input() buttonNameRight;
  @Output() onActionLeftClick = new EventEmitter();
  @Output() onActionRightClick = new EventEmitter();

  constructor(public requestHttpService: RequestHttpService, private router: Router) {
  }

  ngOnInit() {
    console.log(this.error);
  }

  ngOnDestroy(): void {

  }

  actionLeft() {
    this.onActionLeftClick.emit();
  }

  actionRight() {
    this.onActionRightClick.emit();
  }

  exit() {
    this.requestHttpService.logOut();
    this.router.navigate(['']);
  }
}
