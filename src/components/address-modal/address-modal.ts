import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import firebase from 'firebase';
import { DatabaseMethodsProvider } from '../../providers/database-methods/database-methods';
import { Address } from '../../orderData';

/**
 * This component handles a modal with the address form
 * 
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

  /**
   * Close the address modal
   */
  closeModal() {
    this.view.dismiss({sendOrder: false});
  }

  /**
   * notifies in case that the address on the map is changed
   */
  setAddress(address){
    this.selectedAddress = address;
  }

  /**
   * Submits the selected address
   */
  submit() {
    if(!this.changeAddress) {
      this.selectedAddress = null;
    }
    this.view.dismiss({anotherAddress: this.selectedAddress, sendOrder: true});
  }

}
