import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {RequestHttpService} from '../../services/request-http.service';
import {Subscription} from 'rxjs';
import {UserInterface} from '../../model/model';
import {AuthorizationDataService} from '../../services/authorization-data.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserDataService} from '../../services/user-data.service';
import {CashCollectorDataService} from '../../services/cash-collector-data.service'
import {ConfigDataService} from '../../services/config-data.service';

@Component({
  selector: 'app-collector',
  templateUrl: './collector-role.component.html',
  styleUrls: ['./collector-role.component.css', '../../app.component.css']
})
export class CollectorRoleComponent implements OnInit, OnDestroy {

  pageFlag: 'menu' | 'collection' | 'receipt' | 'changePassword';
  collectionState = null;

  CdmOpenButton = false;
  BdmOpenButton = false;
  cashUnits = null;
  totalSum: 0;
  socketResponseSafeStatusSubscription: Subscription = null;

  private inputText = '';
  private changePasswordStage: 'setOldPassword' | 'setNewPassword' | 'confirmNewPassword';
  private oldPassword;
  private newPassword;
  private confirmNewPassword;
  public errorMessage = null;
  public popUpButtonRight = null;

  private menuButtonsArray = [];

  spinner = false;

  private timeOut;
  public timeOutFlag = false;

  private User: UserInterface;
  collectorButton = [
    {
      val: 'Инкассация', func: () => {
        this.startCashСollection();
      }
    },
    {
      val: 'Смена пароля', func: () => {
        this.changePassword();
      }
    }
  ];

  changeUserPassword: FormGroup = new FormGroup({
      password: new FormControl('', [Validators.required])
    },
  );

  constructor(private requestHttpService: RequestHttpService,
              private authorizationDataService: AuthorizationDataService,
              private userDataService: UserDataService,
              private cashCollectorDataService: CashCollectorDataService,
              private configDataService: ConfigDataService,
              private router: Router) {
  }

  ngOnInit() {
    this.startTimeout();
    this.pageFlag = 'menu';
    this.User = this.authorizationDataService.user;
    this.showButton(this.collectorButton);
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


  startCashСollection() {
    this.spinner = true;
    this.cashCollectorDataService.getCashUnits().subscribe(response => {
      console.log(response);
      if (response === null || (response.hasOwnProperty('message') && response.hasOwnProperty('code'))) {
        this.processingRequest(response);
      } else if (response.length > 0) {
        this.cashUnits = response;
        this.totalSum = this.cashUnits.reduce((accumulator, item) => {
          return accumulator + item['totalAmount'];
        }, 0);
      }
    });
    this.cashCollectorDataService.getAdmModuleStatus().subscribe(response => {
      console.log(response);
      if (response === null || (response.hasOwnProperty('message') && response.hasOwnProperty('code'))) {
        this.processingRequest(response);
      } else if (response.hasOwnProperty('BDM')) {
        this.pageFlag = 'collection';
        if (response.CDM === true) {
          this.startCdmCollection();
        }
        if (response.CDM === false) {
          this.startBdmCollection();
        }
      }
    });
  }

  startCdmCollection() {
    this.spinner = false;
    this.collectionState = 'statisticCDM';
    this.CdmOpenButton = true;
    this.BdmOpenButton = false;
  }


  startBdmCollection() {
    this.spinner = false;
    this.collectionState = 'statisticBDM';
    this.CdmOpenButton = false;
    this.BdmOpenButton = true;
  }

//
  open(device) {
    this.cashCollectorDataService.openSafe(device).subscribe(response => {
      if (response === null || (response.hasOwnProperty('message') && response.hasOwnProperty('code'))) {
        this.processingRequest(response);
      } else if (!!response.status) {
        this.socketResponseSafeStatusSubscription = this.requestHttpService.socketResponseSafeStatusSubject.subscribe(data => {
          console.log(data);
          if (!!data) {
            if (data === 'opened') {
              console.log('success true');
              this.collectionState = device + 'SafeOpened';
            } else {
              console.log('success false');
              console.log(data);
            }

          }
        });
      }
    });
  }

  printCollectionReceipt() {
    this.spinner = true;
    this.cashCollectorDataService.safeStatus('CDM').subscribe(response => {
      console.log(response);
      if (response === null || (response.hasOwnProperty('message') && response.hasOwnProperty('code'))) {
        this.processingRequest(response);
      } else if (response.hasOwnProperty('opened')) {
        this.spinner = false;
        if (response.opened === false) {
          // TODO: обработка запроса на печать чека
          this.cashCollectorDataService.printCollectionReceipt();
          this.collectionState = 'receiptPrinted';
        }
      }
    });
  }


  ReceiptResult(param) {
    // TODO: обработка запроса на завершение депозита для чека
    this.cashCollectorDataService.endDepositForReceipt(param);
    //   this.nextBdmCollection();
    this.collectionState = 'openBDM';

  }


  finishCollection() {
    this.spinner = true;
    this.cashCollectorDataService.safeStatus('BDM').subscribe(response => {
      console.log(response);
      if (response === null || (response.hasOwnProperty('message') && response.hasOwnProperty('code'))) {
        this.processingRequest(response);
      } else if (response.hasOwnProperty('opened')) {
        this.spinner = false;
        if (response.opened === false) {
          this.collectionState = 'openOC';
        }
      }
    });
  }


  OpenOC() {
    this.spinner = true;
    this.cashCollectorDataService.openOC().subscribe(response => {
      console.log(response);
      if (response === null || (response.hasOwnProperty('message') && response.hasOwnProperty('code'))) {
        this.processingRequest(response);
      } else if (response.status === true) {
        this.spinner = false;
        this.errorMessage = 'Операционный цикл успешно открыт';
      } else if (response.status === false) {
        this.spinner = false;
        this.errorMessage = 'Операционный цикл не открыт. В банкнотном сейфе отсутсвует сумка';
      }
    });
  }

//
//
//   back() {
//     this.router.navigate(['menu']);
//   }
//
//

  back() {
    this.resetTimeOut();
    if (this.pageFlag === 'menu') {
      this.router.navigate(['']);
    } else if (this.pageFlag === 'collection' && (this.collectionState === 'statisticBDM' || this.collectionState === 'statisticCDM')) {
      this.pageFlag = 'menu';
    } else if (this.pageFlag === 'collection' &&(this.collectionState === 'openOC')) {
      this.router.navigate([''])
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

  changePassword() {
    this.resetTimeOut();
    this.requestHttpService.journalLog('Изменить пароль');
    this.changePasswordStage = 'setOldPassword';
    this.pageFlag = 'changePassword';
  }

  changePasswordRequest() {
    this.resetTimeOut();
    this.userDataService.changePassword(this.oldPassword, this.confirmNewPassword).subscribe(response => {
      if (response === null || (response.hasOwnProperty('message') && response.hasOwnProperty('code'))) {
        this.processingRequest(response);
      } else if (response.status === true) {
        this.spinner = false;
        this.errorMessage = 'Пароль успешно изменен';
        this.popUpButtonRight = 'Продолжить';
      }

    });
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
    }, 300000);
  }


  clearData() {
    this.inputText = null;
    this.changePasswordStage = null;
    this.oldPassword = null;
    this.newPassword = null;
    this.confirmNewPassword = null;
    this.errorMessage = null;
    this.spinner = false;
    this.menuButtonsArray = [];
  }

  ngOnDestroy(): void {
    this.requestHttpService.logOut();
    this.clearData();
    this.closeTimeout();
    this.requestHttpService.socketResponseKeyTabletSubject.next(false);
  }
}
