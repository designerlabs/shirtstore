import { Component, OnInit, Input, Output } from '@angular/core';
import { HomeService } from './home.service';
import { CurrencyPipe } from '@angular/common';

import { RouterLinkActive  } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import {  SearchFilterPipe }   from '../common/search.pipe';
import {Subject} from 'rxjs/Subject';
import {debounceTime} from 'rxjs/operator/debounceTime';

import {ReversePipe} from 'ngx-pipes/src/app/pipes/array/reverse';
import {UniquePipe } from 'ngx-pipes/src/app/pipes/array/unique';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Http } from '@angular/http';

import * as _ from "lodash";
// import * as $ from 'jquery';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ReversePipe, UniquePipe]
})



export class HomeComponent implements OnInit {
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;
  closeResult: string;
  @Input() errMsg:any
  @Output() name="hello world"
  notNumber:boolean;
  loader:any;
  errorStatus:any;
  lists:any[]
  uniqueList:any[]
  inputValue: any;
  carts = new Array
  getCarts:any
  orders =  new Array
  getOrders:any
  totalAmount: any;
  modalValue: string;
  modalTitle: string;
  modalImage: string;
  modalPrice: string;

  constructor(private homeService:HomeService, private localStorageService: LocalStorageService, private reversePipe: ReversePipe, private unqiuePipe: UniquePipe, private modalService: NgbModal, private http:Http) {

  }


  

  ngOnInit() { //Initial load

    setTimeout(() => this.staticAlertClosed = true, 2000);
    this._success.subscribe((message) => this.successMessage = message);
    debounceTime.call(this._success, 5000).subscribe(() => this.successMessage = null);

    this.loader = true;
    this.errorStatus = false;
    
    if(this.localStorageService.get('list') && this.localStorageService.get('list') != 0){

      for(let getList in this.localStorageService.get('list')){
        this.carts.push(this.localStorageService.get('list')[getList])
      }

      for(let getOrder in this.localStorageService.get('order')){
        this.orders.push(this.localStorageService.get('order')[getOrder])
      }

     this.getOrders = this.localStorageService.get('order')
     this.getCarts = this.localStorageService.get('list');
    }else{
      this.getCarts = [{"error":"Record not available"}]
      this.getOrders = [];
    }
    
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

        this.getTotalPrice();
 
  }

  changeSuccessMessage() {
    this._success.next(`Successfully Submitted!`);
  }


/******************** Get the size ***************/

  getSize(size){
    if(size == 'x-large'){
      return 'xl'
    }else{
      return size;
    }
  }

/******************** get the Colour ***************/

  getColor(color){
    return color
  }


/******************** get the selected value and ID ***************/

  getValue(id, val){
    let getList = this.lists[id];
    let getVal = 'qtd'+id;
    this.carts.unshift({'product_id': getList.id, 'qty': val, 'name': getList.name, 'price': getList.price, 'total':getList.price * val });
    this.orders.unshift({'id': getList.id, 'quantity': val});
    let inputElement = <HTMLInputElement>document.getElementById(getVal);
    this.localStorageService.set('list', this.carts);
    this.localStorageService.set('order', this.orders);
    this.getCarts = this.localStorageService.get('list');
    this.getOrders = this.localStorageService.get('order');
    this.getTotalPrice();
  }

/******************** get the total amount ***************/

  getTotalPrice(){
    let total = 0;
    this.totalAmount = "0";
    for(var i=0; i < this.carts.length; i++){
      if(this.carts[i].total){
        total += this.carts[i].total;
        this.totalAmount = total;
      }else{
        this.totalAmount = "0";
      }
    }
    return total;
  }


  /******************** Expand the Item ***************/
  

  zoomImage(ele, content){ 
    let getList = this.lists[ele];
    this.modalValue = getList;
    this.modalTitle = getList.name;
    this.modalImage = getList.picture;
    this.modalPrice = getList.price;
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    
  }

/******************** Delete Order ***************/

  delItem(ele){
    for(let i=0; i < this.carts.length; i++){
      if(this.carts[i].product_id == ele){
         this.carts.splice(i, 1);
         this.localStorageService.set('list', this.carts);
         this.getCarts = this.localStorageService.get('list');
         if(this.localStorageService.get('list') == 0){
            this.getCarts = [{"error":"Record not available"}]
         }
         this.getTotalPrice()
      }
    }

    for(let j=0; j < this.orders.length; j++){
      if(this.orders[j].id == ele){
         this.orders.splice(j, 1);
         this.localStorageService.set('order', this.orders);
      } 
    }

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  /******************** Order Submission ***************/

  itemSubmit(){
   let body = 
    {"total":this.totalAmount,
      "basket":
        {
            "shirts":this.localStorageService.get('order')
          }
      }

    const req = this.http.post('http://mock-shirt-backend.getsandbox.com/order', body);
      req.subscribe(
     (response) => {
            /* this function is executed every time there's a new output */
           console.log("VALUE RECEIVED: "+response);
     },
     (err) => {
            /* this function is executed when there's an ERROR */
            console.log("ERROR: "+err);
     },
     () => {
            this.localStorageService.remove('order');
            this.localStorageService.remove('list');
            this.localStorageService.clearAll();
            this.carts = [];
            this.orders = [];
            this.getCarts = [];
            this.totalAmount = "0";
            this.changeSuccessMessage()
            console.log("COMPLETED");
     }
 );

    }


}
