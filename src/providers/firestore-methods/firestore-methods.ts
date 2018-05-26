import firebase from 'firebase';
import { Injectable } from '@angular/core';

/*
  Generated class for the FirestoreMethodsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirestoreMethodsProvider {

  db = firebase.firestore();

  constructor() {
  }

  getDocumentData(collection, doc) {
    const document = this.db.collection(collection).doc(doc);
    return document.get();
  }

  setDocumentData(collection, docName, data){
    this.db.collection(collection).doc(docName).set(data);
  }

  updateDocument(collection, docName, data){
    this.db.collection(collection).doc(docName).update( data );
  }

}
