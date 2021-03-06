import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { MenuPage } from '../menu/menu';
import { AngularFireAuth } from 'angularfire2/auth';
import { ErrorHandlerProvider } from '../../providers/error-handler/error-handler';
import { DatabaseMethodsProvider } from '../../providers/database-methods/database-methods';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  @ViewChild('name') name;
  @ViewChild('telephone') telephone;
  @ViewChild('email') email;
  @ViewChild('password') password;

  selectedAddress: any;


  constructor(private alertCtrl: AlertController,
    private fire: AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams,
    public errorHdlr: ErrorHandlerProvider,
    public db: DatabaseMethodsProvider) {
  }

  alert(title: string, message: string) { //This is just for test
    this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  /**
   * Returns to the Home Page
   */
  back() {
    this.navCtrl.push(HomePage);
  }

  /**
   * Create the user account,
   * validates if the requested fields are not empty or invalid
   */
  register() {
    let info = {
      name: this.name.value,
      telephone: this.telephone.value,
      address: this.selectedAddress
    }
    if (this.errorHdlr.checkProperties(info) && this.errorHdlr.checkProperties(info.address)) {
      if(this.validateTelephone(info.telephone)){
        this.fire.auth.createUserWithEmailAndPassword(this.email.value, this.password.value)
        .then(data => {
          this.db.setDocument('users', data.uid, info);
          this.alert("", "Registrado con exito");
          this.navCtrl.push(MenuPage);
        })
        .catch(error => {
          console.log(error.message)
          this.alert("", this.errorHdlr.handleError(error.message));
        })
      }else{
        this.alert('Error','El telefono debe contener 8 digitos');
      }
      

    } else {
      this.alert("Error", "Complete todos los campos que se le solicitan");
      return;
    }


  }

  validateTelephone(telephone){
    let regex = new RegExp("^[0-9]{8}$");
    return regex.test(telephone);
  }


  /**
   * notifies in case that the address on the map is changed
   */
  setAddress(address) {
    this.selectedAddress = address;
  }

}
