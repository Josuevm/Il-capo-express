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

  //la imagen tiene que llegar por objeto
  //"../assets/imgs/pizza.png"
  title: string;
  information: string;
  prices: any;
  thumbnail: string;
  selectedSize: string;

  product = {
    name: "",
    size: "P",
    price: "",
    observation: "",
    quantity: "1",
    extras: []
  }

  constructor(private navParams: NavParams, private view: ViewController) {

  }

  ionViewWillEnter() {

  }

  closeModal() {
    this.view.dismiss();
  }



  ionViewDidLoad() {

    this.information = this.navParams.get('data').description;
    this.product.name = this.navParams.get('data').name;
    this.product.price = this.navParams.get('data').price[0];

    this.prices = this.navParams.get('data').price;
    //la imagen tiene que llegar por objeto
    this.thumbnail = "../assets/imgs/pizza.png";
  }

  changeQuantity(Type) {
    switch (Type) {
      case 0:
        if (parseInt(this.product.quantity) > 1) this.product.quantity = (parseInt(this.product.quantity) - 1).toString();
        break;
      case 1:
        this.product.quantity = (parseInt(this.product.quantity) + 1).toString();
        break;
    }
  }

  changeSize(Size) {
    this.selectedSize = Size;
    this.product.size = Size;
    switch (Size) {
      case "P":
        this.product.price = this.prices[0];
        break;
      case "M":
        this.product.price = this.prices[1];
        break;
      case "G":
        this.product.price = this.prices[2];
        break;
    }
    console.log(this.selectedSize);
  }

}
