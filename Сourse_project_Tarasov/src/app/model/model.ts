export interface Config {
  id?: number;
  timeOut: number;
  errorMessage: string;
}


export interface UserInterface {
  id: number;
  login: string;
  password: any;
  account: any;
  firstName: string;
  lastName: string;
  middleName: string;
  post: string;
  email: string;
  phone: string;
  department_id: number;
  role_id: number;
  organizationName: string;
  organizationUnp: number
  roles: string [];

}


export interface AdmStatus {
  CDM: boolean;
  BDM: boolean;
  PRR: boolean;
  PTR: boolean;
  IBM: boolean;
}

export interface ErrorMessageInterface {
  message: string;
  code: number;
}




