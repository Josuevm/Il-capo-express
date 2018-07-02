import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AccountManagerPage } from '../../pages/account-manager/account-manager'
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../../pages/home/home';
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


  constructor(public navCtrl : NavController,
    private fire: AngularFireAuth) {}

  manageAccount(){
    this.navCtrl.push(AccountManagerPage);
  }
  
  /**
   * Close user session
   */
  signOut(){
    this.fire.auth.signOut();
    this.navCtrl.push(HomePage);
  }

}
