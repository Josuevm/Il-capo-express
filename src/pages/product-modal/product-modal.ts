import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavParams, ViewController, NavController, GESTURE_GO_BACK_SWIPE } from 'ionic-angular';
import { OrderProvider } from "../../providers/order/order";
import { Product } from '../../orderData';
import { OrderPage } from '../order/order';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
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
  isPizza: boolean;
  isHalf: boolean;
  halfList: any;

  firstHalf: string;
  secondHalf: string;

  product: Product = {
    id: '',
    name: "",
    size: "",
    price: 0,
    observation: "",
    quantity: 1,
    extras: []
  }

  extras = [{ name: "chili", path: "../assets/imgs/chili.png" },
  { name: "cheese", path: "../assets/imgs/cheese.png" },
  { name: "mushroom", path: "../assets/imgs/mushroom.png" },
  { name: "onion", path: "../assets/imgs/onion.png" },
  { name: "sausage", path: "../assets/imgs/sausage.png" },
  { name: "alba", path: "../assets/imgs/alba.png" }
  ];

  constructor(private navParams: NavParams,
    public orderProv: OrderProvider,
    private view: ViewController,
    private navCtrl: NavController,
    private toastCtrl: ToastController) {

  }

  ionViewWillEnter() {

  }


  //this method close the modal
  closeModal() {
    this.view.dismiss();
  }



  ionViewDidLoad() {
    console.log(this.navParams.get('data'));
    //indica si es pizza, esto para la modificacion automatica del modal 
    this.isPizza = this.navParams.get('isPizza');
    this.isHalf = this.navParams.get('isHalf');
    if (this.isPizza) {
      this.product.size = "P";
      this.selectedSize = "P"
      this.product.price = this.navParams.get('data').price[0];
    } else {
      this.product.price = this.navParams.get('data').price;
    }


    if (this.isHalf) {

      this.information = "";
      this.halfList = this.navParams.get('data').categoryPizzas;

      this.product.name = "Mitad y Mitad";
      this.firstHalf = this.halfList[0];
      this.secondHalf = this.halfList[0];


    } else {
      this.information = this.navParams.get('data').description;
      this.product.name = this.navParams.get('data').name;
    }



    this.product.id = this.navParams.get('data').id;
    this.prices = this.navParams.get('data').price;
    //la imagen tiene que llegar por objeto
    this.thumbnail = "../assets/imgs/pizza.png";
  }



  //This method receives a object that represetns one extra of the product, 
  // then returns true if the product is contained in the extras array 
  // false if its not  
  extraActive(extra) {
    let aux = this.product.extras.indexOf(extra);
    if (aux !== -1) {
      return true;
    } else {
      return false;
    }
  }

  //This method receives a object that represetns one extra of the product
  // then if the extra is contained in the extras array it will be deleted 
  // if not the object will be pushed to the array 
  addExtra(extra) {
    let aux = this.product.extras.indexOf(extra);
    if (aux !== -1) {
      this.product.extras.splice(aux, 1);
    } else {
      this.product.extras.push(extra);
    }
  }


  //this method receives a string that represents the type of action (substraction or addition)
  // if its an addition it will add +1 to the quantity of the product object 
  // if its an additoin it will substract -1 to the quantity of the prodcut object 
  changeQuantity(Type) {

    switch (Type) {
      case 0:
        if (this.product.quantity > 1) this.product.quantity = (this.product.quantity - 1);
        break;
      case 1:
        if (this.product.quantity < 6) this.product.quantity = (this.product.quantity + 1);
        break;
    }
  }

  //this method receives a string that represents the size of the product
  // if will update the selectedSize and the size in the product object 
  // then it will chanche the product size, in relation to the string itself
  changeSize(Size) {
    console.log(this.product);
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
      case "S":
        this.product.price = this.prices[3];
        break;
    }
  }

  changeHalf(selected_value, half) {
    switch (half) {
      case 1:
        this.firstHalf = selected_value;
        break;
      case 2:
        this.secondHalf = selected_value;
        break;
    }

  }

  //this method adds a product to the order provider, then close the modal and shows a toast notification.
  addProduct() {
    if (this.isHalf) {
      this.product.name = this.firstHalf + " + " + this.secondHalf;
      this.product.id = "99";
    }
    this.product.observation = this.observation.value;
    this.orderProv.addItem(this.product);
    this.closeModal();
    let toast = this.toastCtrl.create({
      message: 'Producto guardado con exito',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  //this method adds a product to the order provider, then close the modal and opens the menu page, finally it shows a toast notification
  onShowOrder() {
    if (this.isHalf) {
      this.product.name = this.firstHalf + " + " + this.secondHalf;
      this.product.id = "99";
    }
    this.orderProv.addItem(this.product);
    let toast = this.toastCtrl.create({
      message: 'Producto guardado con exito',
      duration: 3000,
      position: 'top'
    });
    this.navCtrl.push(OrderPage);
    this.closeModal();
  }



}
