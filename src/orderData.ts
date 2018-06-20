export default interface Order {
    products: Product[],
    UID: string,
    photoURL: string,
    anotherAddress?: Address,
    state: string //new, pending, finished, rejected
}

export interface Address {
    location: string,
    position: {
      lat: number, lng: number
    },
    otherSigns: string
}

export interface User {
    name: string,
    address: {
      location: string,
      position: {
        lat: number, lng: number
      },
      otherSigns: string
    },
    telephone: string
  }

  export interface Product {
    id: string,
    name: string,
    size: string,
    price: number,
    observation: string,
    quantity: number,
    extras: string[]
  }