import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {RequestHttpService} from './services/request-http.service';
import {ConfigDataService} from './services/config-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'CAOS';


  constructor(private requestService: RequestHttpService, private configDataService: ConfigDataService) {
    this.requestService.connect();
    this.configDataService.getConfig();
  }



}
