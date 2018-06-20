import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { OrderProvider } from "../../providers/order/order";
import { ModalController } from 'ionic-angular';
import {AddressModalComponent} from '../../components/address-modal/address-modal'
import { Product } from '../../orderData';
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
    public alertCtrl: AlertController,
    private addressModal: ModalController) {
  }

  public orderItems:Product[] = [];
  public totalPrice: number;

  ionViewDidLoad() {
    this.updateOrder();
  }

  removeItem(index) {
    this.orderProv.removeItem(index);
    this.updateOrder();
  }

  updateOrder() {
    this.orderItems = this.orderProv.getOrder();
    this.totalPrice = this.orderProv.getOrderPrice();
  }

  onRemove(item:Product, index) {
    let confirm = this.alertCtrl.create({
      title: 'Eliminar',
      message: 'Eliminar ' + item.quantity + ' ' + item.name + ' de la orden?',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            this.removeItem(index);
          }
        },
        {
          text: 'Cancelar'
        }
      ]
    });
    confirm.present();
  }

  onSent = (error) => {
    let confirm = this.alertCtrl.create({
      title: 'Orden Enviada',
      message: !error
          ?'Su orden ha sido enviada, pronto sera notificado sobre el progreso'
          :'Lo sentimos, hubo un error al enviar la orden, intentelo de nuevo, o llame al ######',
      buttons: [{text: 'Aceptar'}]
    });
    confirm.present();
  }

  onOrder() {
    const addressModal = this.addressModal.create(AddressModalComponent);
    addressModal.present();
    addressModal.onDidDismiss(data => {
      if(data.sendOrder) {
        this.orderProv.sendOrder(this.onSent, data.anotherAddress);
      }
    });
  }

}
