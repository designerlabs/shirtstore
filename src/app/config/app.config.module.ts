import { NgModule, InjectionToken } from '@angular/core';

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export class AppConfig {
    apiEndpoint: string;
    shopUrl:string;
    submitUrl: string;
}

export const APP_DI_CONFIG: AppConfig = {
    apiEndpoint: "",
    shopUrl: "http://mock-shirt-backend.getsandbox.com/shirts",
    submitUrl: "http://mock-shirt-backend.getsandbox.com/order"
};

@NgModule({
  providers: [{
    provide: APP_CONFIG,
    useValue: APP_DI_CONFIG
  }]
})
export class AppConfigModule { }