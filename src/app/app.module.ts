import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http'
import { RouterModule, ActivatedRouteSnapshot } from '@angular/router'
import { appRoutes } from './routes';
import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { HomeService } from './home/home.service';
import { AppConfigModule } from './config/app.config.module';
import {  TruncatePipe }   from './common/app.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    TruncatePipe
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    AppConfigModule
  ],
  providers: [HomeService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
