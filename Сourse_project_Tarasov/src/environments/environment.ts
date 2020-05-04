// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  api: {
    // url: 'http://10.177.54.2:8888',
    // url: 'http://10.177.53.4:8888',
    // url: 'http://10.177.53.6:7000/adm-pm', // Витя
    // url: 'http://10.177.53.8:8888', // Коля
    // url: 'http://10.177.53.2:8888', // Андрей
    url: 'http://localhost:3000',
    urlLocal: 'http://localhost:7000/adm-pm',

    /////////////// TEST  ///////////////////////

    //  SOCKET
    apiSocket: 'ws://localhost:9090',

    // CONFIG
    apiGetConfig: '/get/4',

    // AUTHORIZATION AND  REGISTRATION
    apiLoginAuthorization: '/get/9',
    apiTabletAuthorization: '/get/9',
    apiCheckBancAccount: '/get/2',
    apiDoneRegistration: '/get/9',
    apiPrintRegReceipt: '/get/2',

    // DEPOSIT

    apiDepositStart: '/get/2',
    apiDepositEnd: '/get/2',

    // USER DATA SERVICES

    apiGetAvailableServices: '/BUTTONS',
    apiChangePassword: '/get/2',

    // LOGOUT

    apiLogOut: '/get/2',

    // CASH-COLLECTION

    apiAdmModulesStatus: '/get/1',
    apiCashUnit: '/CASH-UNIT-DTO',
    apiOpenSafe: '/get/2',
    apiSafeStatus: '/',
    apiPrintCollectionReceipt: '/get/2' ,
    apiEndDepositForReceipt:  '/get/2',
    apiOpenOC: '/get/2',

    // ENGINEER

    apiComponentStatus :  '/get/5',

    apiRestartADM : '/get/2',
    apiTurnOffADM : '/get/2',
  }
};

