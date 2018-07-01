
import { Injectable } from '@angular/core';
import firebase from 'firebase';

/*
  This provider handles methods to create, update and get data from firebase real time database.
*/
@Injectable()
export class DatabaseMethodsProvider {
  db = firebase.database();
  constructor() {

  }
  /*
    Creates a new document specifying in which collection, the document ID and also the data.
  */
  setDocument(collection, documentID, data) {
    this.db.ref(collection + '/' + documentID).set(data);
  }

  /*
    Gets document information specifying which collection and the document ID.
  */
  getDocument(collection, documentID):any {
    return this.db.ref(collection + '/' + documentID);
  }

  /*
    Updates a new document specifying in which collection, the document ID and also the data.
  */
  updateDocument(collection, documentID, data) {
    this.db.ref(collection + '/' + documentID).set(data);
  }

  /*
    Creates a new document if the specified document ID is not on the database
  */
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
