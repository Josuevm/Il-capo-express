
import { Injectable } from '@angular/core';
import firebase from 'firebase';

/*
  Generated class for the DatabaseMethodsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseMethodsProvider {
  db = firebase.database();
  constructor() {

  }

  setDocument(collection, documentID, data) {
    this.db.ref(collection + '/' + documentID).set(data);
  }

  getDocument(collection, documentID):any {
    return this.db.ref(collection + '/' + documentID);
  }

  updateDocument(collection, documentID, data) {
    this.db.ref(collection + '/' + documentID).set(data);
  }

  insertIfDontExist(collection, documentID, data) {
    
    let self = this;
    this.db.ref(collection + '/' + documentID)
    .on('value', function(snapshot){
      if(!snapshot.val()){
        console.log('No existe')
        self.setDocument(collection, documentID, data);
      }
    });
  }

}
