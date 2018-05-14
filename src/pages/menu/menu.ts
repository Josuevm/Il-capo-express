import { Component ,OnInit,ViewChild,Renderer} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import {Http} from '@angular/http';
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
users : any[]
information:any[];
childrenContent:any[];
menuTittle :string;
flag : boolean;

@ViewChild("cc") cardContent : any;
icon:string = "arrow-forward";
accordionExpanded = false;
//subscribe to the json to get the menu.
  constructor(public navCtrl: NavController, public navParams: NavParams, public fire:AngularFireAuth,private http:Http,public renderer:Renderer) {
  this.http.get('https://jsonplaceholder.typicode.com/users').subscribe((data) =>{
  this.users = data.json();
  });
  
  let localData = http.get('assets/menu.json').map(res => res.json().items);
  localData.subscribe(data => {
    this.information = data;
    console.log(data);
  });

  }
  ngOnInit() {
 this.menuTittle = "Menu"
 this.renderer.setElementStyle(this.cardContent.nativeElement,"webkitTransition","max-height 500ms , padding 500ms")
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  signOut(){
    this.fire.auth.signOut();
  }
  //set the content in the pizza in an array and the button tittle
  setContent(childrenContent,menuTittle){
 this.childrenContent = childrenContent;
 this.menuTittle = menuTittle
 this.toggleAccordion();
  }
  
  showMenu(){
  }
  //toggle the accoordion by changing its css.
  toggleAccordion(){
    if(this.accordionExpanded){
      this.renderer.setElementStyle(this.cardContent.nativeElement,"max-height","0px");
      this.renderer.setElementStyle(this.cardContent.nativeElement,"padding","0px 0px");
    }else{
      this.renderer.setElementStyle(this.cardContent.nativeElement,"max-height","2000px");
      this.renderer.setElementStyle(this.cardContent.nativeElement,"padding","13px 16px");
    }
    this.accordionExpanded =!this.accordionExpanded;
    this.icon = this.icon == "arrow-forward"? "arrow-down":"arrow-forward";
    this.flag = !this.flag;
  }
  }

