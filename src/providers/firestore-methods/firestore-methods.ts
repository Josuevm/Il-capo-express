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
    this.db.collection(collection).doc(docName).set(data).then(function() {
      console.log("Document successfully written!");
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  });
  
  }

  updateDocument(collection, docName, data){
    this.db.collection(collection).doc(docName).update( data );
  }

  insertIfNotExists(collection, document, data){
    var self = this;
   this.db.collection(collection).doc(document).get()
    .then(function(documentSnapshot){
      if(!documentSnapshot.exists){
        self.db.collection(collection).doc(document).set(data)
        console.log('First time')
      }
    });
  }

}
