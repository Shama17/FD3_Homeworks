import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {UserInterface} from '../../model/model';
import {RequestHttpService} from '../../services/request-http.service';
import {AuthorizationDataService} from '../../services/authorization-data.service';
import {Router} from '@angular/router';
import {UserDataService} from '../../services/user-data.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ConfigDataService} from '../../services/config-data.service';
import {consoleTestResultHandler} from "tslint/lib/test";


@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.css', '../../app.component.css']
})
export class UserRoleComponent implements OnInit, OnDestroy {
  inputText = '';
  private changePasswordStage: 'setOldPassword' | 'setNewPassword' | 'confirmNewPassword';
  private oldPassword;
  private newPassword;
  private confirmNewPassword;
  public errorMessage = null;
  public popUpButtonRight = null;
  pageFlag: 'menu' | 'userServices' | 'deposit' | 'receipt' | 'changePassword';

  cashInsertedSubscription: Subscription;
  cashInserted$ = false;
  depositModuleBusySubscription: Subscription;
  depositModuleBusy$ = false;
  socketResponseReceiptSubscription: Subscription;
  private menuButtonsArray = [];
  userServiceList = [];
  userServicesButtonsArray = [];
  currentIndexOfUserServicesArray = 0;

  spinner = false;

  private timeOut = null;
  timeOutFlag = false;

  private User: UserInterface;
  private UserButton = [
    {
      val: 'Взнос', func: () => {
        this.getAvailableServices();
      }
    },
    {
      val: 'Изменить пароль', func: () => {
        this.changePassword();
      }
    }];

  changeUserPassword: FormGroup = new FormGroup({
      password: new FormControl('', [Validators.required])
    },
  );

  constructor(private requestHttpService: RequestHttpService,
              private authorizationDataService: AuthorizationDataService,
              private userDataService: UserDataService,
              private configDataService: ConfigDataService,
              private router: Router) {
  }

  ngOnInit() {
    this.startTimeout();
    this.pageFlag = 'menu';
    this.User = this.authorizationDataService.user;
    this.showButton(this.UserButton);
  }


  showButton(buttons) {
    this.menuButtonsArray = [];
    buttons.forEach((elem, i) => {
      if (i % 2 === 0) {
        this.menuButtonsArray.push({
          buttonName: buttons[i].val,
          click: buttons[i].func,
          class: 'buttonLeft'
        });
      } else {
        this.menuButtonsArray.push({
          buttonName: buttons[i].val,
          click: buttons[i].func,
          class: 'buttonRight'
        });
      }
    });
  }

  getAvailableServices() {
    this.spinner = true;
    this.closeTimeout();
    this.userDataService.getAvailableServices(this.User.id).subscribe(response => {
      console.log(response);
      this.startTimeout();
      if (response === null || (response.hasOwnProperty('message') && response.hasOwnProperty('code'))) {
        this.processingRequest(response);
      } else if (response.length > 0) {
        this.userServiceList = response;
        console.log(this.userServiceList);
        this.preparedUserServiceButtons(response);
      }
    });
  }

  preparedUserServiceButtons(services) {
    console.log(services);
    const servicesList = [];
    services.forEach((elem, i) => {
      if (i % 2 === 0) {
        servicesList.push({
          buttonName: elem['serviceName'],
          serviceId: elem['id'],
          class: 'buttonLeft'
        })
        ;
      } else {
        servicesList.push({
          buttonName: elem['serviceName'],
          serviceId: elem['id'],
          class: 'buttonRight'
        });
      }
    });
    const serviceListsArray = [];
    for (let i = 0; i < servicesList.length; i += 6) {
      serviceListsArray[serviceListsArray.length] = servicesList.slice(i, i + 6);
    }
    this.showUserServiceButtons(serviceListsArray);
  }

  showUserServiceButtons(servicesArray) {
    this.userServicesButtonsArray = servicesArray;
    this.spinner = false;
    this.pageFlag = 'userServices';
  }


  showNextButtons() {
    this.resetTimeOut();
    if (this.currentIndexOfUserServicesArray < this.userServicesButtonsArray.length - 1) {
      this.currentIndexOfUserServicesArray++;
    } else {
      this.currentIndexOfUserServicesArray = 0;
    }
  }

  deposit(id) {
    this.spinner = true;
    this.requestHttpService.journalLog('Взнос');
    const depositDestination = this.userServiceList.find(elem => elem.id === id);
    this.closeTimeout();
    this.userDataService.startDeposit(depositDestination).subscribe(response => {
      this.startTimeout()
      if (response === null || (response.hasOwnProperty('message') && response.hasOwnProperty('code'))) {
        this.processingRequest(response);
      } else if (response.status === true) {
        this.spinner = false;
        this.cashInsertedSubscription = this.requestHttpService.cashInsertedSubject.subscribe(flag => {
          this.resetTimeOut();
          this.cashInserted$ = flag;
        });
        this.depositModuleBusySubscription = this.requestHttpService.depositModuleBusySubject.subscribe(flag => {
          this.resetTimeOut();
          this.depositModuleBusy$ = flag;
        });
        this.pageFlag = 'deposit';
      }
    });
  }

  enroll() {
    this.closeTimeout();
    this.spinner = true;
    this.requestHttpService.journalLog('Зачислить');
    this.userDataService.endDeposit().subscribe(response => {
      console.log(response);
      this.startTimeout();
      if (response === null || (response.hasOwnProperty('message') && response.hasOwnProperty('code'))) {
        this.processingRequest(response);
      } else if (response.status === true) {
        this.spinner = false;
        this.requestHttpService.cashInsertedSubject.next(false);
        this.cashInsertedSubscription.unsubscribe();
        this.depositModuleBusySubscription.unsubscribe();
        this.pageFlag = 'receipt';
      }
    });
  }


  changePassword() {
    this.resetTimeOut();
    this.requestHttpService.journalLog('Изменить пароль');
    this.changePasswordStage = 'setOldPassword';
    this.pageFlag = 'changePassword';
  }


  back() {
    this.resetTimeOut();
    this.requestHttpService.journalLog('Выход');
    if (this.pageFlag === 'deposit') {
      this.userDataService.endDeposit();
      this.pageFlag = 'userServices';
    } else if (this.pageFlag === 'menu' || this.pageFlag === 'receipt') {
      this.requestHttpService.logOut();
      this.router.navigate(['']);
      this.requestHttpService.socketResponseKeyTabletSubject.next(false);
    } else if (this.pageFlag === 'userServices') {
      this.pageFlag = 'menu';
    }
  }

  numPressed(Num) {
    this.resetTimeOut();
    this.changeUserPassword.get('password').markAsUntouched();
    if (this.inputText === '') {
      this.inputText = (Num);
    } else if (this.inputText !== '') {
      this.inputText += Num;
    }
  }

  clear() {
    this.resetTimeOut();
    this.changeUserPassword.get('password').markAsUntouched();
    this.inputText = '';
  }

  delete() {
    this.resetTimeOut();
    this.changeUserPassword.get('password').markAsUntouched();
    this.inputText = this.inputText.substr(0, this.inputText.length - 1);
  }

  confirm() {
    this.resetTimeOut();
    switch (this.changePasswordStage) {
      case 'setOldPassword':
        this.changeUserPassword.get('password').markAsTouched();
        if (this.changeUserPassword.valid) {
          this.oldPassword = this.inputText;
          this.inputText = '';
          this.changePasswordStage = 'setNewPassword';
          this.changeUserPassword.get('password').markAsUntouched();
        }
        break;
      case 'setNewPassword':
        this.changeUserPassword.get('password').markAsTouched();
        if (this.changeUserPassword.valid) {
          this.newPassword = this.inputText;
          this.inputText = '';
          this.changePasswordStage = 'confirmNewPassword';
          this.changeUserPassword.get('password').markAsUntouched();
          this.changeUserPassword.get('password').setValidators([Validators.required, this.checkEnteredPasswords(this.newPassword)]);
          this.changeUserPassword.get('password').updateValueAndValidity();
        }
        break;
      case 'confirmNewPassword':
        this.changeUserPassword.get('password').markAsTouched();
        if (this.changeUserPassword.valid) {
          this.confirmNewPassword = this.inputText;
          this.inputText = '';
          this.spinner = true;
          this.changeUserPassword.get('password').markAsUntouched();
          this.changePasswordRequest();
        }
        break;
    }
  }


  changePasswordRequest() {
    this.closeTimeout();
    this.userDataService.changePassword(this.oldPassword, this.confirmNewPassword).subscribe(response => {
      this.startTimeout();
      console.log(response);
      if (response === null || (response.hasOwnProperty('message') && response.hasOwnProperty('code'))) {
        this.processingRequest(response);
      } else if (response.status === true) {
        this.spinner = false;
        this.errorMessage = 'Пароль успешно изменен';
        this.popUpButtonRight = 'Продолжить';
      }
    });
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

  popUpContinue() {
    this.resetTimeOut();
    this.errorMessage = null;
    this.popUpButtonRight = null;
    this.pageFlag = 'menu';
  }

  checkEnteredPasswords(newPwd) {
    return (control: FormControl): { [key: string]: any } | null => {
      if (control.value !== newPwd) {
        return {password: true};
      }
      return null;
    };
  }

  resetTimeOut() {
    console.log('таймаут reset');
    this.timeOutFlag = false;
    if (!!this.timeOut) {
      window.clearTimeout(this.timeOut);
    }
    this.startTimeout();
  }

  closeTimeout() {
    console.log('таймаут close');
    this.timeOutFlag = false;
    if (!!this.timeOut) {
      window.clearTimeout(this.timeOut);
    }
  }

  startTimeout() {
    console.log('таймаут start');
    this.timeOut = setTimeout(() => {
      this.timeOutFlag = true;
    }, this.configDataService.config.timeOut);
  }

  clearData() {
    this.inputText = null;
    this.changePasswordStage = null;
    this.oldPassword = null;
    this.newPassword = null;
    this.confirmNewPassword = null;
    this.errorMessage = null;
    this.spinner = false;
    this.cashInserted$ = false;
    this.menuButtonsArray = [];
    this.userServiceList = [];
    this.userServicesButtonsArray = [];
    this.currentIndexOfUserServicesArray = 0;
  }


  ngOnDestroy(): void {
    this.requestHttpService.logOut();
    this.clearData();
    this.closeTimeout();
    this.requestHttpService.cashInsertedSubject.next(false);
    if (!!this.cashInsertedSubscription) {
      this.cashInsertedSubscription.unsubscribe();
    }
    if (!!this.depositModuleBusySubscription) {
      this.depositModuleBusySubscription.unsubscribe();
    }
  }


}
