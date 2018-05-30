import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { OrderProvider } from "../../providers/order/order";

/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public orderProv: OrderProvider,
    public alertCtrl: AlertController) {
  }

  public orderItems;
  public totalPrice: number;

  ionViewDidLoad() {
    this.updateOrder();
  }

  removeItem(item) {
    this.orderProv.removeItem(item);
    this.updateOrder();
  }

  updateOrder() {
    this.orderItems = this.orderProv.getOrder();
    this.totalPrice = this.orderProv.getOrderPrice();
  }

  onRemove(item) {
    let confirm = this.alertCtrl.create({
      title: 'Eliminar',
      message: 'Eliminar ' + item .quantity + ' ' + item.name + ' de la orden?',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            this.removeItem(item);
          }
        },
        {
          text: 'Cancelar'
        }
      ]
    });
    confirm.present();
  }

  onOrder() {
    let prompt = this.alertCtrl.create({
      title: 'Ordenar',
      message: "Enviaremos su pedido a la ubicacion predeterminada",
      inputs: [
        {
          name: 'Ubicacion',
          placeholder: 'Ubicacion'
        },
      ],
      buttons: [
        {
          text: 'Confirmar',
          handler: data => {
            this.orderProv.sendOrder();
          }
        }
      ]
    });
    prompt.present();
  }

}