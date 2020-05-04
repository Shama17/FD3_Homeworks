import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {RequestHttpService} from '../services/request-http.service';
import {Subscription} from 'rxjs';
import {AuthorizationDataService} from '../services/authorization-data.service';
import {ConfigDataService} from '../services/config-data.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../app.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  socketResponseKeyTabletSubscription: Subscription = null;
  socketResponseKeyID: Subscription = null;
  keyTabletSub = false;

  constructor(private router: Router, private requestHttpService: RequestHttpService,
              private authorizationDataService: AuthorizationDataService,
              private configDataService:ConfigDataService) {
  }

  ngOnInit() {
       this.socketResponseKeyTabletSubscription = this.requestHttpService.socketResponseKeyTabletSubject.subscribe(data => {
      this.keyTabletSub = data;
      this.socketResponseKeyID = this.requestHttpService.socketResponseKeyIDSubject.subscribe(id => {
        if (this.keyTabletSub === true) {
          this.authorizationDataService.tabletId = id;
          this.router.navigate(['KeyTablet']);
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.requestHttpService.socketResponseKeyTabletSubject.next(false);
    this.requestHttpService.socketResponseKeyIDSubject.next(null);
    this.socketResponseKeyTabletSubscription.unsubscribe();
    this.socketResponseKeyID.unsubscribe();
  }


  showPage(param) {
    if (param === 'login') {
      this.router.navigate(['Login']);
    } else if (param === 'registration') {
      this.router.navigate(['Registration']);
    }
  }


}
