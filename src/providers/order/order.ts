import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the OrderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OrderProvider {

  constructor(public http: HttpClient) {
    console.log('Hello OrderProvider Provider');
  }

  private items = [
      {
        number: 1,
        name: 'Jamon y Queso',
        price: 23,
        description: 'Salsa de tomate, queso mozzarella, jamón y pepperoni',
        quantity: 2
      },
      {
        number: 2,
        name: 'Peperoni',
        price: 23,
        description: 'Salsa de tomate, queso mozzarella, jamón y pepperoni',
        quantity: 1
      },
      {
        number: 4,
        name: 'Suprema',
        price: 23,
        description: 'Salsa de tomate, queso mozzarella, jamón y pepperoni',
        quantity: 6
      }
    ];

  /**
   * getOrder
   */
  public getOrder() {
    return this.items.slice();
  }
    /**
     * addItem
       item: menu item like pizza, pasta, etc
    */
    public addItem(item) {
        this.items.push(item);
    }

    /**
     * removeItem
        item selected orderItem
    */
    public removeItem(item) {
        const index = this.items.findIndex(
          (element) => item.number == element.number
        );
        this.items.splice(index, 1);
    }

    /**
     * changeQuantity
        item, 
        newQuantity     
    */
    public changeQuantity(item, newQuantity) {
      const selectedItem = this.items.find(
        (element) => item.number == element.number
      );
      selectedItem.quantity = newQuantity;
    }

    public getOrderPrice() {
      let orderPrice: number = 0;
      this.items.forEach(element => {
        orderPrice += element.number * element.price;
      });
      return orderPrice;
    }

    /**
     * sendOrder
     */
    public sendOrder() {
      
    }

}
