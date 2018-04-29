import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { AngularFireAuth } from 'angularfire2/auth';
import { MenuPage } from '../menu/menu';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  @ViewChild('email') email;
  @ViewChild('password') password;

  constructor(private alertCtrl: AlertController,private fire: AngularFireAuth,public navCtrl: NavController) {

  }

  alert(message:string){ //This is just for test
    this.alertCtrl.create({
      title:"",
      subTitle:message,
      buttons:['OK']
    }).present();
  }

  showUserPage() {
    console.log("entroooo");
  }

  goRegister(){
    this.navCtrl.push(RegisterPage);
  }

  signIn(){
    this.fire.auth.signInWithEmailAndPassword(this.email.value, this.password.value)
    .then(data =>{
      this.navCtrl.setRoot(MenuPage); 
    })
    .catch(error =>{
      this.alert(error.message)
    })
  }

}
