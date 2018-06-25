import { Injectable } from '@angular/core';
import Order, { Product, Address, User } from '../../orderData';
import firebase from 'firebase';
/*
  Generated class for the OrderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OrderProvider {

  constructor() {}

  private db = firebase.database();
  private UID: string;
  private user: User;
  private photoURL:string;
  private products: Product[] = [];


  /**
   * setUserData
   */
  public setUserData(UID:string, photoURL:string) {
    this.UID = UID;
    this.db.ref('users/' + UID).on("value", res => {
      this.user = res.val();
    }, error => {
        console.log("Hubo un error al cargar los datos del usuario con ID:" + UID + 
                "\n ErrorCode: " + error.code);
    });
    this.photoURL = photoURL;
  }
  /**
   * getOrder
   */
  public getOrder() {
    return this.products.slice();
  }
    /**
     * addItem
       item: menu item like pizza, pasta, etc
    */
    public addItem(item:Product) {
      this.products.push(item);
    }

    /**
     * removeItem
        item selected orderItem
    */
    public removeItem(index) {
        this.products.splice(index, 1);
    }

    public getOrderPrice() {
      let orderPrice: number = 0;
      this.products.forEach(element => {
        orderPrice += element.quantity * element.price;
      });
      return orderPrice;
    }

    /**
     * sendOrder
     */
    public async sendOrder(callBack: Function, anotherAddress?: Address) {
      let reference = this.db.ref('orders/').push();
      let order:Order =  {
        id: reference.key,
        products: this.products,
        UID: this.UID,
        user: this.user,
        address: anotherAddress?anotherAddress:this.user.address,
        photoURL: this.photoURL,
        state: 'new'
      };
      reference.set(order, error => callBack(error));
    }
}
