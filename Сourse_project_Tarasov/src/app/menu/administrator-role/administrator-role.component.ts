import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {RequestHttpService} from '../../services/request-http.service';
import {Subscription} from 'rxjs';
import {UserInterface} from '../../model/model';
import {AuthorizationDataService} from '../../services/authorization-data.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserDataService} from '../../services/user-data.service';
import {ConfigDataService} from '../../services/config-data.service';
import {AdministratorDataService} from '../../services/administrator-data.service';


@Component({
  selector: 'app-administrator-role',
  templateUrl: './administrator-role.component.html',
  styleUrls: ['./administrator-role.component.css', '../../app.component.css']
})
export class AdministratorRoleComponent implements OnInit, OnDestroy {
  private User: UserInterface;

  private errorMessage = null;
  private popUpButtonLeft = null;
  private popUpButtonRight = null;
  private popUpFlag = '';
  private spinner = false;
  private timeOut;
  private timeOutFlag = false;


  private pageFlag: 'menu' | 'service' | 'deviceStatus' | 'lastError';

  private menuButtonsArray = [];
  private administratorButton = [
    {
      val: 'Тестовый взнос', func: () => {
        this.testDeposit();
      }
    },
    {
      val: 'Сервис',
      func: () => {
        this.service();
      },
    },
    {
      val: 'Последние ошибки', func: () => {
        this.lastError();
      }

    }];
  private serviceButtonArray = [];
  private serviceButton = [{
    val: 'BDM', func: () => {
      this.getComponentStatus('BDM');
    }
  },
    {
      val: 'CDM', func: () => {
        this.getComponentStatus('CDM');
      }
    },
    {
      val: 'Принтер', func: () => {
        this.getComponentStatus('PTR');
      }
    },
    {
      val: 'iButton', func: () => {
        this.getComponentStatus('IBT');
      }
    },
    {
      val: 'Перезагрузка', func: () => {
        this.reboot();
      }
    },
    {
      val: 'Выключение', func: () => {
        this.turnOff();
      }
    }];

  private componentStatus = [];

  constructor(private requestHttpService: RequestHttpService,
              private administratorDataService: AdministratorDataService,
              private userDataService: UserDataService,
              private configDataService: ConfigDataService,
              private authorizationDataService: AuthorizationDataService,
              private router: Router) {
  }

  ngOnInit() {
    this.startTimeout();
    this.pageFlag = 'menu';
    this.User = this.authorizationDataService.user;
    this.showButton(this.administratorButton);
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

  service() {
    this.closeTimeout();
    this.spinner = true;
    this.pageFlag = 'service';
    this.serviceButtonArray = [];
    for (let i = 0; i < this.serviceButton.length; i++) {
      if (i % 2 === 0) {
        this.serviceButtonArray.push({
          button: this.serviceButton[i].val,
          click: this.serviceButton[i].func,
          class: 'buttonLeft',
          disabled: false
        })
        ;
      } else {
        this.serviceButtonArray.push({
          button: this.serviceButton[i].val,
          click: this.serviceButton[i].func,
          class: 'buttonRight',
          disabled: false
        });
      }
    }
    this.administratorDataService.getAdmModuleStatus().subscribe(response => {
      this.startTimeout();
      if (response === null || (response.hasOwnProperty('message') && response.hasOwnProperty('code'))) {
        this.processingRequest(response);
      } else if (response.hasOwnProperty('BDM')) {
        if (response.CDM === false) {
          this.serviceButtonArray[this.serviceButtonArray.findIndex(item => item.button === 'CDM')].disabled = true;
        }
        if (response.PRR === false) {
          this.serviceButtonArray[this.serviceButtonArray.findIndex(item => item.button === 'Принтер')].disabled = true;
        }
        if (response.IBM === false) {
          this.serviceButtonArray[this.serviceButtonArray.findIndex(item => item.button === 'iButton')].disabled = true;
        }
        this.spinner = false;
      }
      // TODO: переделать когда будут известны точные названия возвращаемых модулей
      // } else if (response.hasOwnProperty('BDM')) {
      //   for (let prop in response) {
      //     if (this.serviceButtonArray[this.serviceButtonArray.findIndex(item => item.button === prop)]) {
      //       this.serviceButtonArray[this.serviceButtonArray.findIndex(item => item.button === prop)].disabled = true;
      //     }
      //   }
      // }
      this.spinner = false;
    });
  }

  getComponentStatus(component) {
    this.closeTimeout();
    this.spinner = true;
    this.componentStatus = [];
    this.administratorDataService.getComponentStatus(component).subscribe(response => {
      this.startTimeout();
      if (response === null || (response.hasOwnProperty('message') && response.hasOwnProperty('code'))) {
        this.processingRequest(response);
      } else if (response.hasOwnProperty('components')) {
        for (let i = 0; i < response['components'].length; i++) {
          this.componentStatus.push({
              id: i,
              description: response['components'][i]['description'],
              status: response['components'][i]['statusDescription']
            }
          );
        }
      }
      this.pageFlag = 'deviceStatus';
      this.spinner = false;
    });
  }

  reboot() {
    this.resetTimeOut();
    this.errorMessage = 'Перезагрузить устройство ?';
    this.popUpButtonLeft = 'Нет';
    this.popUpButtonRight = 'Да';
    this.popUpFlag = 'reboot'

  }

  turnOff() {
    this.resetTimeOut();
    this.errorMessage = 'Выключить устройство ?';
    this.popUpButtonLeft = 'Нет';
    this.popUpButtonRight = 'Да';
    this.popUpFlag = 'turnOff'
  }

  testDeposit() {
    this.closeTimeout();
    this.spinner = true;
    this.administratorDataService.startDeposit('test').subscribe(response => {
      this.startTimeout();
      if (response === null || (response.hasOwnProperty('message') && response.hasOwnProperty('code'))) {
        this.processingRequest(response);
      } else if (response.status) {
        this.spinner = false;
        this.errorMessage = 'Тестовый прием';
        this.popUpButtonRight = 'Завершить';
        this.popUpFlag = 'testDeposit'
      }
    })

  }

  endTestDeposit() {
    this.closeTimeout();
    this.administratorDataService.endDeposit().subscribe(response => {
      this.startTimeout();
      if (response === null || (response.hasOwnProperty('message') && response.hasOwnProperty('code'))) {
        this.processingRequest(response);
      } else if (response.status) {
        this.spinner = false;
        this.errorMessage = null;
        this.popUpButtonRight = null;
      }
    })
  }

  lastError() {
    console.log('lastError');
    this.pageFlag = 'lastError';
  }


  back() {
    this.resetTimeOut();
    this.requestHttpService.journalLog('Выход');
    if (this.pageFlag === 'menu') {
      this.requestHttpService.logOut();
      this.router.navigate(['']);
    } else if (this.pageFlag === 'service') {
      this.pageFlag = 'menu';
    } else if (this.pageFlag === 'lastError') {
      this.pageFlag = 'menu';
    } else if (this.pageFlag === 'deviceStatus') {
      this.pageFlag = 'service';
    }
  }

  popUpNext() {
    this.spinner = true;
    if (this.popUpFlag === 'reboot') {
      this.administratorDataService.restartAdm().subscribe(response => {
        if (response === null || (response.hasOwnProperty('message') && response.hasOwnProperty('code'))) {
          this.processingRequest(response);
        } else if (response.status) {

        }
      })
    } else if (this.popUpFlag === 'turnOff') {
      this.administratorDataService.turnOffAdm().subscribe(response => {
        if (response === null || (response.hasOwnProperty('message') && response.hasOwnProperty('code'))) {
          this.processingRequest(response);
        } else if (response.status) {

        }
      })
    } else if (this.popUpFlag === 'testDeposit') {
      this.endTestDeposit()
    }

  }

//
  popUpCancel() {
    this.errorMessage = null;
    this.popUpButtonLeft = null;
    this.popUpButtonRight = null;
    this.popUpFlag = null;
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
