import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { FirestoreMethodsProvider } from '../../providers/firestore-methods/firestore-methods'


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

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public firestore: FirestoreMethodsProvider) {

    firebase.auth().onAuthStateChanged( user => {
        console.log(user.displayName)
        this.loggedUser.photo = user.photoURL + "?type=large";
        this.userUID = user.uid;
        this.setUserData(this.userUID);
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountManagerPage');
  }

  setUserData(userUID){
    this.firestore.getDocumentData('Users', userUID)
    .then(doc =>{
      this.loggedUser.name = doc.data().name;
      this.loggedUser.address = doc.data().address;
      this.loggedUser.telephone = doc.data().telephone;
    })
    
  }

  submit(){
    let data ={
      name : this.name.value,
      address: this.address.value,
      telephone:this.telephone.value
    }
    this.firestore.updateDocument('Users',this.userUID,data);
  }

}
