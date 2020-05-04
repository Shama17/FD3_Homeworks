import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {LoginComponent} from './home/login/login.component';
import {RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RequestHttpService} from './services/request-http.service';
import {HttpClientModule} from '@angular/common/http';
import {MenuComponent} from './menu/menu.component';
import {CollectorRoleComponent} from './menu/collector-role/collector-role.component';
import {CashUnitTableComponent} from './menu/cash-unit-table/cash-unit-table.component';
import {SpinnerComponent} from './shared/spinner/spinner.component';
import {PopUpComponent} from './shared/pop-up/pop-up.component';
import {RegistrationComponent} from './home/registration/registration.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { NumPadComponent } from './home/num-pad/num-pad.component';
import { TimeOutComponent } from './shared/time-out/time-out.component';
import { UserRoleComponent } from './menu/user-role/user-role.component';
import { AdministratorRoleComponent } from './menu/administrator-role/administrator-role.component';



const routes = [
  {path: '', component: HomeComponent},
  {path: 'Login', component: LoginComponent},
  {path: 'KeyTablet', component: LoginComponent},
  {path: 'Registration', component: RegistrationComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'collector-role', component: CollectorRoleComponent},
  {path: 'timeOutScreen', component : TimeOutComponent},
  {path: 'user-role', component : UserRoleComponent},
  {path: 'administrator-role', component : AdministratorRoleComponent},

];

@NgModule({
  declarations: [

    AppComponent,
    LoginComponent,
    HomeComponent,
    MenuComponent,
    CollectorRoleComponent,
    CashUnitTableComponent,
    SpinnerComponent,
    PopUpComponent,
    RegistrationComponent,
    NumPadComponent,
    TimeOutComponent,
    UserRoleComponent,
    AdministratorRoleComponent

  ],

  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
  ],
  providers: [RequestHttpService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
