import { Error404Component } from './error/error404/error404.component';
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
import {  SearchFilterPipe }   from './common/search.pipe';
import {  TruncatePipe }   from './common/app.pipe';
import {  UniquePipe }   from './common/unique.pipe';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LocalStorageModule } from 'angular-2-local-storage';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgPipesModule} from 'ngx-pipes';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CartComponent } from './cart/cart.component';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    SearchFilterPipe,
    TruncatePipe,
    UniquePipe,
    Error404Component,
    CartComponent
 
  ],
  imports: [
    BrowserModule,
    Ng2SearchPipeModule,
    NgPipesModule,
    NgbModule.forRoot(),
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    AppConfigModule,
    BrowserAnimationsModule,
    LocalStorageModule.withConfig({
            prefix: 'my-app',
            storageType: 'localStorage'
        })
  ],
  providers: [HomeService, LocalStorageModule],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
