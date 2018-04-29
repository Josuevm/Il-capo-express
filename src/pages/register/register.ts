import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {HomePage} from '../home/home';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  @ViewChild('email') email;
  @ViewChild('password') password;

  constructor(private alertCtrl: AlertController,private fire: AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
  }

  alert(message:string){ //This is just for test
    this.alertCtrl.create({
      title:"",
      subTitle:message,
      buttons:['OK']
    }).present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  back(){
    this.navCtrl.push(HomePage);
  }

  register(){
    this.fire.auth.createUserWithEmailAndPassword(this.email.value,this.password.value)
    .then(data =>{
      this.alert("Registrado con exito")
    })
    .catch(error =>{
      this.alert(error.message)
    })
  }

}
