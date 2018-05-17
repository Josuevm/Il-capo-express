import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ProductModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'product-modal',
  templateUrl: 'product-modal.html',
})
export class ProductModalPage {

  title: string;
  information: string;

  constructor(private navParams: NavParams, private view: ViewController) {
  }

  ionViewWillLoad() {

  }

  closeModal() {
    this.view.dismiss();
  }

  ionViewDidLoad() {
    console.log(this.navParams.get('data'));
    this.title = this.navParams.get('data').name;
    this.information = this.navParams.get('data').description;

  }

}
