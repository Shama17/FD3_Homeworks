import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthorizationDataService} from '../../services/authorization-data.service';
import {RequestHttpService} from '../../services/request-http.service';
import {ConfigDataService} from '../../services/config-data.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css', '../../app.component.css']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  errorMessage = '';
  inputText = '';
  pageFlag = '';
  private unp;
  private bancAccount;
  private regPwd;
  private confirmRegPwd;
  private lastReg = '';
  private timeOut;
  timeOutFlag = false;
  spinner = false;

  registrationUNP: FormGroup = new FormGroup({
      unp: new FormControl('', [Validators.minLength(9), Validators.required])
    },
  );
  account: FormGroup = new FormGroup({
      bankAccount: new FormControl('', [Validators.required, this.checkEnteredBancAccount()])
    },
  );
  password: FormGroup = new FormGroup({
      password: new FormControl('', [Validators.required])
    },
  );
  confirmPassword: FormGroup = new FormGroup({
      confirmPassword: new FormControl('', [Validators.required])
    },
  );


  constructor(public requestHttpService: RequestHttpService,
              private authorizationDataService: AuthorizationDataService,
              private configDataService:ConfigDataService,
              private router: Router) {
  }

  ngOnInit() {
    if (this.router.url === '/Registration') {
      this.pageFlag = 'unpPage';
    }
  }

  numPressed(Num) {
    if (this.pageFlag === 'unpPage') {
      if (this.inputText === '') {
        this.inputText = (Num);
      } else if (this.inputText !== '' && this.inputText.length <= 8) {
        this.inputText += Num;
      }
    } else if (this.pageFlag === 'accountPage') {
      const index = this.inputText.indexOf('_', 2);
      if (index !== -1) {
        this.inputText = this.inputText.substr(0, index) + Num + this.inputText.substr(index + 1);
      }
    } else if (this.pageFlag === 'passwordPage' || this.pageFlag === 'confirmPasswordPage') {
      if (this.inputText === '') {
        this.inputText = (Num);
      } else if (this.inputText !== '') {
        this.inputText += Num;
      }
    }
  }

  clear() {
    if (this.pageFlag === 'accountPage') {
      this.inputText = 'BY__PJCB301______________933';
    } else {
      this.inputText = '';
    }
  }

  delete() {
    if (this.pageFlag !== 'accountPage') {
      this.inputText = this.inputText.substr(0, this.inputText.length - 1);
    } else {
      const index = this.inputText.indexOf('_', 2);
      if (this.inputText.indexOf('_', 2) === -1) {
        this.deleteChart(this.inputText.length - 3);
      } else {
        if (index > 11) {
          this.deleteChart(this.inputText.indexOf('_', 2));
        } else if (index === 11) {
          this.deleteChart(4);
        } else if (index === 3) {
          this.deleteChart(3);
        }
      }
    }
  }

  deleteChart(index) {
    this.inputText = this.inputText.substr(0, index - 1) + '_' + this.inputText.substr(index);
  }

  confirm() {
    switch (this.pageFlag) {
      case 'unpPage':
        this.registrationUNP.get('unp').markAsTouched();
        if (this.registrationUNP.valid) {
          this.unp = this.inputText;
          this.inputText = '';
          this.pageFlag = 'accountPage';
          this.inputText = 'BY__PJCB301______________933';
        }
        break;
      case 'accountPage' :
        this.account.get('bankAccount').markAsTouched();
        if (this.account.valid) {
          this.spinner = true;
          this.closeTimeout();
          this.bancAccount = this.inputText;
          this.inputText = '';
          this.account.get('bankAccount').markAsUntouched();
          this.authorizationDataService.checkBancAccount(this.unp, this.bancAccount).subscribe(response => {
            this.startTimeout();
            if (response === null || (response.hasOwnProperty('message') && response.hasOwnProperty('code'))) {
              this.processingRequest(response);
            } else if (!!response) {
              this.spinner = false;
              this.pageFlag = 'passwordPage';
            }
          });
        }
        break;
      case 'passwordPage' :
        this.password.get('password').markAsTouched();
        if (this.password.valid) {
          this.regPwd = this.inputText;
          this.inputText = '';
          this.pageFlag = 'confirmPasswordPage';
          this.confirmPassword.get('confirmPassword').setValidators([Validators.required, this.checkEnteredPasswords(this.regPwd)]);
          this.confirmPassword.get('confirmPassword').updateValueAndValidity();
        }
        break;
      case 'confirmPasswordPage':
        this.confirmPassword.get('confirmPassword').markAsTouched();
        if (this.confirmPassword.valid) {
          this.spinner = true;
          this.closeTimeout();
          this.confirmRegPwd = this.inputText;
          this.inputText = '';
          this.confirmPassword.get('confirmPassword').markAsUntouched();
          this.authorizationDataService.doneRegistration(this.unp, this.bancAccount, this.confirmRegPwd).subscribe(response => {
            this.startTimeout();
            if (response === null || (response.hasOwnProperty('message') && response.hasOwnProperty('code'))) {
              this.processingRequest(response);
            } else if(response.hasOwnProperty('login')) {
              this.spinner = false;
              this.pageFlag = 'summaryPage';
              this.authorizationDataService.user = response;
              this.lastReg = response.login.slice(10);
            }
          });
        }
        break;
    }
  }

  authorization() {
    this.spinner = true;
    this.clearData();
    this.router.navigate(['menu']);
  }

  back() {
    switch (this.pageFlag) {
      case 'unpPage' :
        this.inputText = '';
        this.clearData();
        this.router.navigate(['']);
        break;
      case 'accountPage':
        this.inputText = '';
        this.pageFlag = 'unpPage';
        break;
      case 'passwordPage':
        this.pageFlag = 'accountPage';
        this.inputText = 'BY__PJCB301______________933';
        break;
    }
  }

  printReceipt() {
    this.spinner = true;
    this.closeTimeout();
    this.authorizationDataService.printRegReceipt().subscribe(response => {
      this.startTimeout();
      if (response === null || (response.hasOwnProperty('message') && response.hasOwnProperty('code'))) {
        this.processingRequest(response);
      } else if (!!response.status) {
        this.spinner = false;
      }
    });
  }


  checkEnteredBancAccount() {
    return (control: FormControl): { [key: string]: any } | null => {
      if (control.value.includes('_')) {
        return {banckAccount: true};
      }
      return null;
    };
  }

  checkEnteredPasswords(password) {
    console.log(password);

    return (control: FormControl): { [key: string]: any } | null => {
      console.log(control.value);
      if (control.value !== password) {
        return {password: true};
      }
      return null;
    };
  }

  processingRequest(response) {
    this.spinner = false;
    this.clearData();
    if (response === null) {
      this.errorMessage = this.configDataService.config.serverErrorMessage;
    } else {
      this.errorMessage = response.message;
    }
  }


  clearData() {
    this.errorMessage = '';
    this.inputText = '';
    this.unp = null;
    this.bancAccount = null;
    this.regPwd = null;
    this.confirmRegPwd = null;
    this.lastReg = null;
    this.pageFlag = null;
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
    this.closeTimeout();
    this.clearData();
  }

}



