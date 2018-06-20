import { Injectable } from '@angular/core';
import Order, { Product, Address } from '../../orderData';
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
  private photoURL:string;
  private products: Product[] = [];


  /**
   * setUserData
   */
  public setUserData(UID:string, photoURL:string) {
    this.UID = UID;
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
        this.products.forEach(element => {
          if(element.id == item.id) {
            //hacerle update de cantidad nada mas
          }
        });
        this.products.push(item);//meter esto en el else
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
      let order:Order =  {
        products: this.products,
        UID: this.UID,
        anotherAddress: anotherAddress,
        photoURL: this.photoURL,
        state: 'new'
      };
      this.db.ref('orders/').push(order, error => callBack(error));
    }
}
