import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AccountManagerPage } from '../../pages/account-manager/account-manager'
/**
 * Generated class for the UserPopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'user-popover',
  templateUrl: 'user-popover.html'
})
export class UserPopoverComponent {


  constructor(public navCtrl : NavController) {
  }

  manageAccount(){
    this.navCtrl.push(AccountManagerPage);
  }

}
