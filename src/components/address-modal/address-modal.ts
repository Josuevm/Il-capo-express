import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import firebase from 'firebase';
import { DatabaseMethodsProvider } from '../../providers/database-methods/database-methods';
import { Address } from '../../orderData';

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

  changeAddress: boolean = false;
  selectedAddress : Address = null;

  constructor(private view: ViewController,
              public navParams: NavParams) {}

  closeModal() {
    this.view.dismiss({sendOrder: false});
  }

  setAddress(address){
    this.selectedAddress = address;
  }

  submit() {
    if(!this.changeAddress) {
      this.selectedAddress = null;
    }
    this.view.dismiss({anotherAddress: this.selectedAddress, sendOrder: true});
  }

}
