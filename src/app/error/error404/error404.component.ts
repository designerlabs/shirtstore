import { Component, OnInit } from '@angular/core';
import { RouterLinkActive  } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.css']
})
export class Error404Component implements OnInit {
  
  constructor(private localStorageService: LocalStorageService) { }
  errMsg:any
  
  ngOnInit() {

    this.errMsg = this.localStorageService.get('errMsg');
    if(this.errMsg.status == 400){
      this.errMsg = JSON.parse(this.errMsg._body);
      this.errMsg = this.errMsg.errors[0].message;
      
    }else{
      this.errMsg = JSON.parse(this.errMsg._body).error;
    }
  }

}
