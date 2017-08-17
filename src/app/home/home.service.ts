import { Injectable, Inject } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { Http, Response} from '@angular/http';
import {ActivatedRoute, Router, ParamMap} from '@angular/router';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import {SharedService, ILoader} from '../shared/shared.service';


// Import RxJs required methods
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/of'
@Injectable()
export class HomeService {

  constructor(private route: ActivatedRoute, private router:Router, private http:Http, @Inject(APP_CONFIG) private config: AppConfig, private ss:SharedService) {
  }

   private listAllUrl: string = this.config.shopUrl;
   getArticleData():Observable<boolean[]> {
    this.ss.showLoader();
    
      return this.http.get(this.listAllUrl)
            .take(1)
            .map((response:Response) => response.json())

            // .catch((error:any) =>
            // Observable.throw(error.json().error || 'Server error')
            // );
            .catch(
      (err: Response, caught: Observable<any[]>) => {
        debugger;
          if (err !== undefined) {
            this.router.navigate(['/404'])
            return Observable.throw('The Web server (running the Web site) is currently unable to handle the HTTP request due to a temporary overloading or maintenance of the server.');
          }
          return Observable.throw(caught); // <-----
        }
      );
              
  }

}
