import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';

/**
 * Generated class for the AccountManagerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account-manager',
  templateUrl: 'account-manager.html',
})
export class AccountManagerPage {

  loggedUser = {
    name : "",
    address : ""
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    firebase.auth().onAuthStateChanged( user => {
      if (user) {
        console.log(user.displayName)
        this.loggedUser.name = user.displayName;
      } else {
        console.log("There's no user here");
      }
    });

  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountManagerPage');
  }

}
