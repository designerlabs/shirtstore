import { Component, OnInit, Input, Output } from '@angular/core';
import { HomeService } from './home.service';
import { CurrencyPipe } from '@angular/common';

import { RouterLinkActive  } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import {  SearchFilterPipe }   from '../common/search.pipe';
// import { UniquePipe } from '../common/unique.pipe';
import {ReversePipe} from 'ngx-pipes/src/app/pipes/array/reverse';
import {UniquePipe } from 'ngx-pipes/src/app/pipes/array/unique';
import * as _ from "lodash";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ReversePipe, UniquePipe]
})



export class HomeComponent implements OnInit {
  @Input() errMsg:any
  @Output() name="hello world"
  loader:any;
  errorStatus:any;
  lists:any[]
  uniqueList:any[]

  constructor(private homeService:HomeService, private localStorageService: LocalStorageService, private reversePipe: ReversePipe, private unqiuePipe: UniquePipe) {
    this.reversePipe.transform('foo'); // Returns: "oof"
    this.unqiuePipe.transform('fff')
  }


  

  ngOnInit() {
    this.loader = true;
    this.errorStatus = false;

    this.homeService.getArticleData()
      .subscribe(resMenuData => {this.lists = resMenuData; this.uniqueList = resMenuData; let uniqList = _.uniqBy(resMenuData, function(e){
        
      })},
        (err)=>{
          this.errorStatus = true;
    
          this.errMsg = err;
          this.localStorageService.set("errMsg",err)
          this.loader = false;
        },
        ()=>{
          this.loader = false;
        });
  }

////when you fetch collection from server.



  getSize(size){
    if(size == 'x-large'){
      return 'xl'
    }else{
      return size;
    }
  }

  getColor(color){
    return color
  }

}
