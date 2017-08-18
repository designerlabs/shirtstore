import { Component, OnInit, Input, Output } from '@angular/core';
import { HomeService } from './home.service';
import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

import { RouterLinkActive  } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

@Pipe({
  name: 'myfilter',
  pure: false
})

export class HomeComponent implements OnInit  {
  @Input() errMsg:any
  @Output() name="hello world"
  loader:any;
  errorStatus:any;
  lists:any[]
  
  
  constructor(private homeService:HomeService, private localStorageService: LocalStorageService) {
  
  }

  ngOnInit() {
    this.loader = true;
    this.errorStatus = false;

    this.homeService.getArticleData()
      .subscribe(resMenuData => {this.lists = resMenuData},
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
