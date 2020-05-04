import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserInterface} from '../model/model';
import {Router, RouterModule} from '@angular/router';
import {AuthorizationDataService} from '../services/authorization-data.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css', '../app.component.css'],
})

export class MenuComponent implements OnInit, OnDestroy {

  User: UserInterface;

  constructor(private authorizationDataService: AuthorizationDataService,
              private router: Router) {
  }

  ngOnInit() {
    this.User = this.authorizationDataService.user;
    this.checkRole();
  }

  ngOnDestroy() {

  }

  checkRole() {
    if (this.User.roles.includes('CLIENT')) {
      this.router.navigate(['user-role']);
    }
    if (this.User.roles.includes('CASH_COLLECTOR')) {
      this.router.navigate(['collector-role']);
    }
    if (this.User.roles.includes('ENGINEER')) {
      this.router.navigate(['administrator-role']);
    }

  }

}
