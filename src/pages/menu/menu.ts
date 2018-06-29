import { Component, OnInit, ViewChild, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Http } from '@angular/http';

import {ModalController} from 'ionic-angular';
import { OrderPage } from '../order/order';
/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  private db = firebase.database();

  users: any[]
  information: any[];
  categoryItems: any[];
  menuTittle: string;
  flag: boolean;
  isPizza: boolean;
  public items: any;


  @ViewChild("cc") cardContent: any;
  icon: string = "arrow-forward";
  accordionExpanded = false;
  //subscribe to the json to get the menu.
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public fire: AngularFireAuth, private http: Http, 
     public renderer: Renderer, private productModal: ModalController) {
    this.loadMenu();
  }

  ngOnInit() {
    this.menuTittle = "Menu";
    this.renderer.setElementStyle(this.cardContent.nativeElement, "webkitTransition", "max-height 500ms , padding 500ms");
  }

  private loadMenu() {
    this.db.ref('menu').on("value", res => {
      let menu = res.val();
      this.items = Object.keys(menu).map(key => menu[key]);
    }, error => {
        console.log("Hubo un error al cargar el menu\nErrorCode: " + error.code);
    });
  }

  onShowOrder() {
    this.navCtrl.push(OrderPage);
  }

  signOut() {
    this.fire.auth.signOut();
  }

  //set the content in the pizza in an array and the button tittle
  setContent(products, menuTittle) {
    this.isPizza = menuTittle.includes('Pizza');//a lo mierda xdxdxdxd
    this.categoryItems = products;
    this.menuTittle = menuTittle
    this.toggleAccordion();
  }

  showMenu() {
  }
  
  //toggle the accoordion by changing its css.
  toggleAccordion() {
    if (this.accordionExpanded) {
      this.renderer.setElementStyle(this.cardContent.nativeElement, "max-height", "0px");
      this.renderer.setElementStyle(this.cardContent.nativeElement, "padding", "0px 0px");
    } else {
      this.renderer.setElementStyle(this.cardContent.nativeElement, "max-height", "2000px");
      this.renderer.setElementStyle(this.cardContent.nativeElement, "padding", "13px 16px");
    }
    this.accordionExpanded = !this.accordionExpanded;
    this.icon = this.icon == "arrow-forward" ? "arrow-down" : "arrow-forward";
    this.flag = !this.flag;
  }

  openModal(product){
    if(this.isPizza) {
      const productModal =  this.productModal.create('ProductModalPage',{data: product});
      productModal.present();
    } else {
      alert("otro Modal");
    }
  }

  

}




