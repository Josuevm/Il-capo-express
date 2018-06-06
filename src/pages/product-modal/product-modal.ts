import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { OrderProvider } from "../../providers/order/order";

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

  @ViewChild('observation') observation;

  //la imagen tiene que llegar por objeto
  //"../assets/imgs/pizza.png"
  title: string;
  information: string;
  prices: any;
  thumbnail: string;
  selectedSize: string;

  

  extras = [{ name: "chili", path: "../assets/imgs/chili.png" },
  { name: "cheese", path: "../assets/imgs/cheese.png" },
  { name: "mushroom", path: "../assets/imgs/mushroom.png" },
  { name: "onion", path: "../assets/imgs/onion.png" },
  { name: "sausage", path: "../assets/imgs/sausage.png" },
  { name: "alba", path: "../assets/imgs/alba.png" }
  ];

  product = {
    name: "",
    size: "P",
    price: "",
    observation: "",
    quantity: "1",
    extras: []
  }

  constructor(private navParams: NavParams, public orderProv: OrderProvider, private view: ViewController) {

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

  extraActive(extra) {
    let aux = this.product.extras.indexOf(extra);
    if (aux !== -1) {
      return true;
    } else {
      return false;
    }
  }

  addExtra(extra) {
    let aux = this.product.extras.indexOf(extra);
    if (aux !== -1) {
      this.product.extras.splice(aux, 1);
      console.log(this.product.extras);
    } else {
      this.product.extras.push(extra);
      console.log(this.product.extras);
    }
  }


  changeQuantity(Type) {
    // por el momento tiene un CAP de 6 pizzas

    switch (Type) {
      case 0:

        if ((parseInt(this.product.quantity) > 1)) this.product.quantity = (parseInt(this.product.quantity) - 1).toString();
        break;
      case 1:
        if ((parseInt(this.product.quantity) < 6)) this.product.quantity = (parseInt(this.product.quantity) + 1).toString();
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

  addProduct() {
    this.product.observation = this.observation.value;
    console.log(this.product);
    this.orderProv.addItem(this.product);
  }

}
