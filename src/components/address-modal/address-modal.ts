import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import firebase from 'firebase';
import { DatabaseMethodsProvider } from '../../providers/database-methods/database-methods';

/**
 * Generated class for the AddressModalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'address-modal',
  templateUrl: 'address-modal.html'
})
export class AddressModalComponent {

  
  selectedAddress : any;
  loggedUser = {
    name: "",
    telephone: ""
  }

  constructor(private view: ViewController,
    public db: DatabaseMethodsProvider) {

    firebase.auth().onAuthStateChanged(user => {
      this.setUserData(user.uid);
    });

  }

  setUserData(userUID) {
    let self = this;
    let doc = this.db.getDocument('users', userUID);
    doc.on("value", function (snapshot) {
      let data = snapshot.val()
      self.loggedUser.name = data.name;
      self.loggedUser.telephone = data.telephone;
    })
  }

  closeModal() {
    this.view.dismiss();
  }

  setAddress(address){
    this.selectedAddress = address;
  }

  submit(){
    let orderData={
      user: this.loggedUser,
      orderAddress: this.selectedAddress
      //Mas datos que hagan falta
    }
    //Enviar pedido al otro lado
    console.log("Pedido:", orderData);
  }

}
