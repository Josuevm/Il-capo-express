import { Component } from '@angular/core';
import { PopoverController } from 'ionic-angular';
import { UserPopoverComponent } from '../user-popover/user-popover';

/**
 * Generated class for the NavbarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'navbar',
  templateUrl: 'navbar.html'
})
export class NavbarComponent {

  constructor(public popoverCtrl : PopoverController,) {
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(UserPopoverComponent);
    popover.present({
      ev: myEvent
    });
  }

}
