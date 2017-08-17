import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import {SharedService, ILoader} from '../shared/shared.service';
import { LoaderService } from '../shared/loader.service';


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
  loader:ILoader;
  lists:any[]
  objLoaderStatus: boolean;
  constructor(private homeService:HomeService, private ss:SharedService, private loaderService: LoaderService) {
    this.loader=this.ss.loader;
    this.objLoaderStatus = false;
  }

  ngOnInit() {
    this.loaderService.loaderStatus
            .subscribe((val: boolean) => {
              this.objLoaderStatus = val;
              debugger;
          })
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
