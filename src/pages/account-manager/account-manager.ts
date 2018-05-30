import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { DatabaseMethodsProvider } from '../../providers/database-methods/database-methods';

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

  @ViewChild('name') name;
  @ViewChild('telephone') telephone;
  @ViewChild('address') address;

  loggedUser = {
    photo: "",
    name : "",
    address : "",
    telephone : ""
  }

  userUID : string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
  public db: DatabaseMethodsProvider) {

    firebase.auth().onAuthStateChanged( user => {
        console.log(user.displayName)
        if(!user.photoURL){
          this.loggedUser.photo = '../../assets/imgs/defaultphoto.png'
        }else{
          this.loggedUser.photo = user.photoURL + "?type=large";
        }
        
        this.userUID = user.uid;
        this.setUserData(this.userUID);
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountManagerPage');
  }

  setUserData(userUID){
    let self = this;
    let doc = this.db.getDocument('users', userUID);
    doc.on("value", function(snapshot){
      let data =snapshot.val()
      self.loggedUser.name = data.name;
      self.loggedUser.address = data.address;
      self.loggedUser.telephone = data.telephone;
    })
  }

  submit(){
    let data ={
      name : this.name.value,
      address: this.address.value,
      telephone:this.telephone.value
    }
    this.db.updateDocument('users',this.userUID,data);
  }

}
