import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RequestHttpService} from './request-http.service';
import {Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {Config} from '../model/model';

@Injectable({
  providedIn: 'root'
})

export class ConfigDataService {
  public config: any = {
    timeOut: 30000,
    serverErrorMessage: 'Ошибка связи с сервером. Повторите операцию позже'
  };

  constructor(private http: HttpClient, private router: Router, private requestHttpService: RequestHttpService) {
  }

  getConfig() {
    this.requestHttpService.getConfig().subscribe(config => {
      this.config = config;
      console.log(this.config)
    }, error => {
      console.log(error)
    });
  }
}
