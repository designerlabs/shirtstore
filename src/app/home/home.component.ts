import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  lists:any[]
  constructor(private homeService:HomeService) { }

  ngOnInit() {
    this.homeService.getArticleData()
            .subscribe(resStoreData => this.lists = resStoreData)
  }

  getSize(size){
    if(size == 'x-large'){
      return 'x'
    }else{
      return size;
    }
  }

  getColor(color){
    return color
  }

}
