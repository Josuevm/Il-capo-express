import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import firebase from 'firebase';
import { DatabaseMethodsProvider } from '../../providers/database-methods/database-methods';
import { OrderProvider } from '../../providers/order/order';
import { ErrorHandlerProvider } from '../../providers/error-handler/error-handler';

/**
 * Generated class for the AccountManagerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account-manager',
  templateUrl: 'account-manager.html',
})
export class AccountManagerPage {

  @ViewChild('name') name;
  @ViewChild('telephone') telephone;


  loggedUser = {
    photo: "",
    name: "",
    address: {
      location: "",
      position: {
        lat: "", lng: ""
      }
    },
    telephone: ""
  }
  selectedAddress : any;
  userUID: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public db: DatabaseMethodsProvider,
    public errorHdlr: ErrorHandlerProvider,
    public alertCtrl : AlertController) {

    firebase.auth().onAuthStateChanged(user => {
      if (!user.photoURL) {
        this.loggedUser.photo = '../../assets/imgs/defaultphoto.png'
      } else {
        this.loggedUser.photo = user.photoURL + "?type=large";
      }

      this.userUID = user.uid;
      this.setUserData(this.userUID);
    });
  }


  ionViewDidLoad() {}

  /**
   * Gets the logged user data from database and sets it on the diferent inputs
   */
  setUserData(userUID) {
    let self = this;
    let doc = this.db.getDocument('users', userUID);
    doc.on("value", function (snapshot) {
      let data = snapshot.val()
      self.loggedUser.name = data.name;
      self.loggedUser.address = data.address;
      self.loggedUser.telephone = data.telephone;
    })
  }

  
  setAddress(address){
    this.selectedAddress = address;
  }

  /**
   * Saves the updated info in case that there is no empty fields and the data has the correct format
   */
  submit() {
    let data = {
      name: this.name.value,
      address: this.selectedAddress,
      telephone: this.telephone.value
    }

    if((this.errorHdlr.checkProperties(data)) && this.errorHdlr.checkProperties(data.address)){
          if(this.validateTelephone(data.telephone)){
            this.db.updateDocument('users', this.userUID, data);
            this.alert('Información actualizada','Sus cambios se han guardado con éxito');
          }else{
            this.alert('Error','El telefono debe contener 8 digitos');
          }
    }else{
      this.alert('Error','Complete todos los campos que se le solicitan');
    }
    
  }

  validateTelephone(telephone){
    let regex = new RegExp("^[0-9]{8}$");
    return regex.test(telephone);
  }

  alert(title:string,message:string){ //This is just for test
    this.alertCtrl.create({
      title: title,
      subTitle:message,
      buttons:['OK']
    }).present();
  }

}
