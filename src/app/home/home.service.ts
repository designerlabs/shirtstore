import { Injectable, Inject } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { Http, Response} from '@angular/http';
import {ActivatedRoute, Router, ParamMap} from '@angular/router';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';



// Import RxJs required methods
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/of'
@Injectable()
export class HomeService {

  constructor(private route: ActivatedRoute, private router:Router, private http:Http, @Inject(APP_CONFIG) private config: AppConfig) {
  }

   private listAllUrl: string = this.config.shopUrl;
   getArticleData():Observable<boolean[]> {
 
    
      return this.http.get(this.listAllUrl)
            .take(1)
            .map((response:Response) => response.json())
            .catch(
      (err: Response, caught: Observable<any[]>) => {
        
          if (err !== undefined) {
            this.router.navigate(['/404'])
            return Observable.throw(err);
          }
          return Observable.throw(caught); // 
        }
      );
              
  }

}
