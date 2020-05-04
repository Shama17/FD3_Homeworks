import {Component, OnInit, Output, OnDestroy} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthorizationDataService} from '../../services/authorization-data.service';
import {RequestHttpService} from '../../services/request-http.service';
import {ReactiveFormsModule} from '@angular/forms';
import {ConfigDataService} from '../../services/config-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../app.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  errorMessage = null;
  inputText = '';
  pageFlag = '';
  private login;
  private personalNum;
  private password;
  private timeOut;
  timeOutFlag = false;
  spinner = false;
  // user = {};


  authorizationUNP: FormGroup = new FormGroup({
      unp: new FormControl('', [Validators.minLength(9), Validators.required])
    },
  );

  authorizationPersonalNum: FormGroup = new FormGroup({
      personalNum: new FormControl('', [Validators.required])
    },
  );

  authorizationPassword: FormGroup = new FormGroup({
      password: new FormControl('', [Validators.required])
    },
  );


  constructor(private requestHttpService: RequestHttpService,
              private authorizationDataService: AuthorizationDataService,
              private configDataService: ConfigDataService,
              private router: Router) {
  }

  ngOnInit() {
    console.log(this.configDataService.config['timeOut']);
    this.startTimeout();
    if (this.router.url === '/Login') {
      this.pageFlag = 'loginPage';
    } else if (this.router.url === '/KeyTablet') {
      this.pageFlag = 'passwordPage';
    }
  }

  numPressed(Num) {
    this.resetTimeOut();
    if (this.pageFlag === 'loginPage') {
      if (this.inputText === '') {
        this.inputText = (Num);
      } else if (this.inputText !== '' && this.inputText.length <= 8) {
        this.inputText += Num;
      }
    }
    if (this.pageFlag !== 'loginPage') {
      if (this.inputText === '') {
        this.inputText = (Num);
      } else if (this.inputText !== '') {
        this.inputText += Num;
      }
    }
  }

  clear() {
    this.resetTimeOut();
    this.inputText = '';
  }

  delete() {
    this.resetTimeOut();
    this.inputText = this.inputText.substr(0, this.inputText.length - 1);
  }

  confirm() {
    this.resetTimeOut();
    switch (this.pageFlag) {
      case 'loginPage':
        this.authorizationUNP.get('unp').markAsTouched();
        if (this.authorizationUNP.valid) {
          this.login = this.inputText;
          this.inputText = '';
          this.pageFlag = 'personalNumPage';
        }
        break;
      case 'personalNumPage':
        this.authorizationPersonalNum.get('personalNum').markAsTouched();
        if (this.authorizationPersonalNum.valid) {
          this.personalNum = this.inputText;
          this.inputText = '';
          this.pageFlag = 'passwordPage';
        }
        break;
      case 'passwordPage':
        this.authorizationPassword.get('password').markAsTouched();
        if (this.authorizationPassword.valid) {
          if (this.router.url === '/KeyTablet') {
            this.password = this.inputText;
            this.sendAuthorizationRequest('tabletAuth');
          } else {
            this.password = this.inputText;
            this.sendAuthorizationRequest('loginAuth');
          }
        }
        break;
    }
  }

  back() {
    this.resetTimeOut();
    switch (this.pageFlag) {
      case 'loginPage' :
        this.clearData();
        this.router.navigate(['']);
        break;
      case 'personalNumPage' :
        this.inputText = this.login;
        this.pageFlag = 'loginPage';
        break;
      case 'passwordPage' :
        if (this.router.url === '/KeyTablet') {
          this.clearData();
          this.router.navigate(['']);
        } else {
          this.inputText = this.personalNum;
          this.pageFlag = 'personalNumPage';
        }
        break;
    }
  }


  sendAuthorizationRequest(type) {
    this.spinner = true;
    this.closeTimeout();
    if (type === 'loginAuth') {
      this.authorizationDataService.authorization(this.login, this.personalNum, this.password).subscribe(response => {
        if (response === null || (response.hasOwnProperty('message') && response.hasOwnProperty('code'))) {
          this.processingRequest(response);
        } else if (response.roles.includes('CASH_COLLECTOR') || response.roles.includes('CLIENT') || response.roles.includes('ENGINEER')) {
          this.spinner = false;
          this.clearData();
          this.router.navigate(['menu']);
        }


      });
    } else if (type === 'tabletAuth') {
      this.authorizationDataService.authorization(this.login, this.personalNum, this.password).subscribe(response => {
        if (response === null || (response.hasOwnProperty('message') && response.hasOwnProperty('code'))) {
          this.processingRequest(response);
        } else if (response.roles.includes('CASH_COLLECTOR') || response.roles.includes('CLIENT') || response.roles.includes('ENGINEER')) {
          this.spinner = false;
          this.clearData();
          this.router.navigate(['menu']);
        }
      });
    }
  }

  processingRequest(response) {
    this.spinner = false;
    this.startTimeout();
    this.clearData();
    if (response === null) {
      this.errorMessage = this.configDataService.config.serverErrorMessage;
    } else {
      this.errorMessage = response.message;
    }
  }

  clearData() {
    this.errorMessage = null;
    this.inputText = '';
    this.login = null;
    this.personalNum = null;
    this.password = null;
    this.spinner = false;
  }


  resetTimeOut() {
    this.timeOutFlag = false;
    if (!!this.timeOut) {
      clearTimeout(this.timeOut);
    }
    this.startTimeout();
  }

  closeTimeout() {
    this.timeOutFlag = false;
    if (!!this.timeOut) {
      clearTimeout(this.timeOut);
    }
  }

  startTimeout() {
    this.timeOut = setTimeout(() => {
      this.timeOutFlag = true;
    }, this.configDataService.config.timeOut);
  }

  ngOnDestroy(): void {
    this.authorizationDataService.tabletId = null;
    this.closeTimeout();
    this.clearData();
  }

}
