export const environment = {
  production: true,

  api: {
    // url: 'http://10.177.54.2:8888',
    // url: 'http://10.177.53.4:8888',
    // url: 'http://10.177.53.6:8888', // Витя
    // url: 'http://10.177.53.8:8888', // Коля
    // url: 'http://10.177.53.2:8888', // Андрей
    url: '',
    urlLocal: 'http://localhost:7000',

    //  SOCKET
    apiSocket: 'ws://localhost:7000/adm-pm/web-socket/connect',

    // CONFIG
    apiGetConfig: '/adm-pm/device/settings',

    // AUTHORIZATION AND  REGISTRATION
    apiLoginAuthorization: '/adm-pm/login/unp-number',
    apiTabletAuthorization: '/adm-pm/login/ibutton',
    apiCheckBancAccount: '/adm-pm/user/verify',
    apiDoneRegistration: '/adm-pm/user/register',
    apiPrintRegReceipt: '/adm-pm/customer/registration/print-receipt',

    // DEPOSIT

    apiDepositStart: '/adm-pm/deposit/start',
    apiDepositEnd: '/adm-pm/deposit/end',

    // USER DATA SERVICES

    apiGetAvailableServices: '/adm-pm/deposit/destination/user/',
    apiChangePassword: '/adm-pm/customer/change-password',

    // LOGOUT

    apiLogOut: '/adm-pm/logout',


    // CASH-COLLECTION

    apiAdmModulesStatus: '/adm-pm/device/status',
    apiCashUnit: '/adm-pm/cash-collection/cash-unit',
    apiOpenSafe: '/adm-pm/cash-collection/safe/open/',
    apiSafeStatus: '/adm-pm/device/safe/status/',
    apiPrintCollectionReceipt: '/adm-pm/cash-collection/receipt',
    apiEndDepositForReceipt: '/adm-pm/cash-collection/close/',
    apiOpenOC: '/adm-pm/cash-collection/open',

  // ENGINEER

    apiComponentStatus :  '/adm-pm/device/status',
    apiRestartADM : '/adm-pm/device/reboot',
    apiTurnOffADM : '/adm-pm/device/shutdown',
  }
};


