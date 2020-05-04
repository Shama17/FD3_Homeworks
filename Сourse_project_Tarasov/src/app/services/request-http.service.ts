import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {UserInterface, AdmStatus, ErrorMessageInterface} from '../model/model';
import * as Stomp from 'stompjs';
import {BehaviorSubject, forkJoin, Observable} from 'rxjs';
import {isBoolean} from 'util';


@Injectable({
  providedIn: 'root'
})


export class RequestHttpService {

  api = environment.api;


  public socketResponseCashUitSubject = new BehaviorSubject<object[]>(null);
  public cashInsertedSubject = new BehaviorSubject<boolean>(false);
  public depositModuleBusySubject = new BehaviorSubject(false);
  public socketResponseReceiptSubject = new BehaviorSubject(null);
  public socketResponseKeyTabletSubject = new BehaviorSubject(false);
  public socketResponseKeyIDSubject = new BehaviorSubject(null);
  public socketResponseSafeStatusSubject = new BehaviorSubject(null);
  private reconnectCounter = 0;
  public errorMessageSubject = new BehaviorSubject(null);


  constructor(private http: HttpClient, private router: Router) {
  }
  //////// PROD ////////////

  // connect() {
  //   const socket = new WebSocket(this.api.apiSocket);
  //   const ws = Stomp.over(socket);
  //   this.reconnectCounter++;
  //   ws.reconnect_delay = 200;
  //
  //   ws.connect({},
  //     (frame) => {
  //       console.log('frame: ', frame);
  //       ws.subscribe('/topic/system/notifications', (message) => {
  //         console.log(message);
  //         const messageType = JSON.parse(message.body).messageType;
  //         console.log(messageType);
  //         if (messageType === 4) {
  //           this.socketResponseCashUitSubject.next(JSON.parse(message.body).cashUnitDtoList);
  //           console.log(this.socketResponseCashUitSubject);
  //           this.cashInsertedSubject.next(true);
  //           this.depositModuleBusySubject.next(false);
  //         } else if (messageType === 3) {
  //           this.depositModuleBusySubject.next(true);
  //         } else if (messageType === 5) {
  //           console.log('печать чека');
  //         } else if (messageType === 2) {
  //           this.socketResponseKeyIDSubject.next(JSON.parse(message.body).userID);
  //           this.socketResponseKeyTabletSubject.next(true);
  //         } else if (messageType === 8) {
  //           this.socketResponseSafeStatusSubject.next('opened');
  //         } else if (messageType === 9) {
  //           this.socketResponseSafeStatusSubject.next('closed');
  //         }
  //       });
  //     },
  //     (error) => {
  //       console.log('STOMP error ' + error);
  //       if (this.reconnectCounter <= 2) {
  //         this.connect();
  //       }
  //       console.log('реконнект');
  //     }
  //   );
  // }
  //
  // getConfig() {
  //   return this.http.get(this.api.url + this.api.apiGetConfig);
  // }
  //
  // journalLog(message) {
  //   return this.http.get('http://localhost:3000/get/6' + message).subscribe(value => {
  //     console.log(value);
  //   });
  // }
  //
  // authorization(login, personalNumber, password) {
  //   return this.http.post(this.api.url + this.api.apiLoginAuthorization, {}, {
  //     headers: {
  //       'unp': login,
  //       'number': personalNumber,
  //       'password': password
  //     }
  //   });
  // }
  //
  //
  // tabletAuthorization(tabletId, password) {
  //   return this.http.post(this.api.url + this.api.apiTabletAuthorization, {}, {
  //     headers: {
  //       'number': tabletId,
  //       'password': password
  //     }
  //   });
  // }
  //
  // checkBancAccount(UNP, account) {
  //   return this.http.get(this.api.url + this.api.apiCheckBancAccount, {
  //     headers: {
  //       'UNP': UNP,
  //       'account': account
  //     }
  //   });
  // }
  //
  // doneRegistration(unp, account, pwd) {
  //   return this.http.post(this.api.url + this.api.apiDoneRegistration, {}, {
  //     headers: {
  //       'unp': unp,
  //       'account': account,
  //       'password': pwd
  //     }
  //   });
  // }
  //
  // printRegReceipt() {
  //   return this.http.get(this.api.url + this.api.apiPrintRegReceipt);
  // }
  //
  // // USER SERVICE REQUESTS
  //
  // getAvailableServices(userID) {
  //   return this.http.get(this.api.url + this.api.apiGetAvailableServices + userID);
  // }
  //
  // changePassword(oldPassword, newPassword) {
  //   console.log(oldPassword, newPassword);
  //   return this.http.post(this.api.url + this.api.apiChangePassword, {}, {
  //     headers: {
  //       'oldPassword': oldPassword,
  //       'newPassword': newPassword
  //     }
  //   });
  // }
  //
  //
  // // DEPOSIT REQUESTS
  //
  // startDeposit(depositDestination) {
  //   return this.http.post(this.api.url + this.api.apiDepositStart, depositDestination);
  // }
  //
  // endDeposit() {
  //   return this.http.get(this.api.url + this.api.apiDepositEnd);
  // }
  //
  //
  // // LOGOUT
  //
  // logOut() {
  //   return this.http.get(this.api.url + this.api.apiLogOut);
  // }
  //
  //
  // // CASH-COLLECTION REQUESTS
  //
  // getAdmModuleStatus() {
  //   return this.http.get(this.api.url + this.api.apiAdmModulesStatus);
  // }
  //
  // getCashUnits() {
  //   return this.http.get(this.api.url + this.api.apiCashUnit);
  // }
  //
  // openSafe(device) {
  //   console.log(device);
  //   return this.http.get(this.api.url + this.api.apiOpenSafe + device);
  // }
  //
  // safeStatus(device) {
  //   return this.http.get(this.api.url + this.api.apiSafeStatus + device);
  // }
  //
  // printCollectionReceipt() {
  //   return this.http.get(this.api.url + this.api.apiPrintCollectionReceipt);
  // }
  //
  // endDepositForReceipt(status) {
  //   return this.http.get(this.api.url + this.api.apiEndDepositForReceipt + status);
  // }
  //
  // openOC() {
  //   return this.http.get(this.api.url + this.api.apiOpenOC);
  // }
  //
  // // ENGINEER REQUESTS
  //
  // deviceStatus(component) {
  //   return this.http.get(this.api.url + this.api.apiComponentStatus + component);
  // }
  //
  //
  // restartADM() {
  //   return this.http.get(this.api.url + this.api.apiRestartADM)
  //
  // }
  //
  // turnOffADM() {
  //   return this.http.get(this.api.url + this.api.apiTurnOffADM)
  // }
  // resetCdm() {
  //   return this.http.get('http://localhost:3000/get/2').subscribe(value => {
  //     console.log(value);
  //   });
  // }
  //
  // resetBdm() {
  //   return this.http.get('http://localhost:3000/get/2').subscribe(value => {
  //     console.log(value);
  //   });
  // }
// }
  //
  //


  ////////////////////// TEST /////////////////

  connect() {
    const socket = new WebSocket(this.api.apiSocket);
    const ws = Stomp.over(socket);
    this.reconnectCounter++;
    ws.reconnect_delay = 200;

    ws.connect({},
      (frame) => {
        console.log('frame: ', frame);
        ws.subscribe('/topic/system/notifications', (message) => {
          console.log(message);
          const messageType = JSON.parse(message.body).messageType;
          console.log(messageType);
          if (messageType === 4) {
            this.socketResponseCashUitSubject.next(JSON.parse(message.body).cashUnitDtoList);
            this.cashInsertedSubject.next(true);
            this.depositModuleBusySubject.next(false);
          } else if (messageType === 3) {
            this.depositModuleBusySubject.next(true);
          } else if (messageType === 5) {
            console.log('печать чека');
          } else if (messageType === 2) {
            this.socketResponseKeyIDSubject.next(JSON.parse(message.body).userID);
            this.socketResponseKeyTabletSubject.next(true);
          } else if (messageType === 8) {
            this.socketResponseSafeStatusSubject.next('opened');
          } else if (messageType === 9) {
            this.socketResponseSafeStatusSubject.next('closed');
          }
        });
      },
      (error) => {
        console.log('STOMP error ' + error);
        if (this.reconnectCounter <= 2) {
          this.connect();
        }
        console.log('реконнект');
      }
    );
  }

  getConfig() {
    return this.http.get(this.api.url + this.api.apiGetConfig);
  }

  journalLog(message) {
    return this.http.get('http://localhost:3000/get/6' + message).subscribe(value => {
      console.log(value);
    });
  }

  authorization(login, personalNumber, password) {
    return this.http.get(this.api.url + this.api.apiLoginAuthorization, {
      headers: {
        'unp': login,
        'number': personalNumber,
        'password': password
      }
    });
  }


  tabletAuthorization(tabletId, password) {
    console.log(tabletId, password);
    return this.http.get(this.api.url + this.api.apiTabletAuthorization);
  }

  checkBancAccount(UNP, account) {
    return this.http.get(this.api.url + this.api.apiCheckBancAccount, {
      headers: {
        'UNP': UNP,
        'account': account
      }
    });
  }

  doneRegistration(unp, account, pwd) {
    return this.http.get(this.api.url + this.api.apiDoneRegistration, {
      headers: {
        'unp': unp,
        'account': account,
        'password': pwd
      }
    });
  }

  printRegReceipt() {
    return this.http.get(this.api.url + this.api.apiPrintRegReceipt);
  }

  // USER SERVICE REQUESTS

  getAvailableServices(userID) {
    console.log(userID);
    return this.http.get(this.api.url + this.api.apiGetAvailableServices);
  }

  changePassword(oldPassword, newPassword) {
    console.log(oldPassword, newPassword);
    return this.http.get(this.api.url + this.api.apiChangePassword, {
      headers: {
        'oldPassword': oldPassword,
        'newPassword': newPassword
      }
    });
  }


  // DEPOSIT REQUESTS

  startDeposit(depositDestination) {
    return this.http.get(this.api.url + this.api.apiDepositStart, {
      headers: {
        'depositDestination': depositDestination
      }
    });
  }

  endDeposit() {
    return this.http.get(this.api.url + this.api.apiDepositEnd);
  }


  // LOGOUT

  logOut() {
    return this.http.get(this.api.url + this.api.apiLogOut);
  }


  // CASH-COLLECTION REQUESTS

  getAdmModuleStatus() {
    return this.http.get(this.api.url + this.api.apiAdmModulesStatus);
  }

  getCashUnits() {
    return this.http.get(this.api.url + this.api.apiCashUnit);
  }

  openSafe(device) {
    console.log(device);
    return this.http.get(this.api.url + this.api.apiOpenSafe);
  }

  safeStatus(device) {
    return this.http.get(this.api.url + this.api.apiSafeStatus + device);
  }

  printCollectionReceipt() {
    return this.http.get(this.api.url + this.api.apiPrintCollectionReceipt);
  }

  endDepositForReceipt(status) {
    return this.http.get(this.api.url + this.api.apiEndDepositForReceipt);
  }

  openOC() {
    return this.http.get(this.api.url + this.api.apiOpenOC);
  }


  // ENGINEER REQUESTS

  getComponentStatus(component) {
    return this.http.get(this.api.url + this.api.apiComponentStatus);
    console.log(component)
  }


  restartADM() {
    return this.http.get(this.api.url + this.api.apiRestartADM)

  }

  turnOffADM() {
    return this.http.get(this.api.url + this.api.apiTurnOffADM)
  }



}




