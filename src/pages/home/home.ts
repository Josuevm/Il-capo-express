import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { AngularFireAuth } from 'angularfire2/auth';
import { MenuPage } from '../menu/menu';
import firebase from 'firebase';
import { ErrorHandlerProvider } from '../../providers/error-handler/error-handler';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  public userProfile:any = null;
  @ViewChild('email') email;
  @ViewChild('password') password;

  constructor(private alertCtrl: AlertController,
    private fire: AngularFireAuth,
    public navCtrl: NavController,
    public errorHdlr: ErrorHandlerProvider,
    public ref : ChangeDetectorRef) {

      firebase.auth().onAuthStateChanged( user => {
        if (user) {
          console.log(user.displayName);
          this.userProfile = user;
          this.navCtrl.push(MenuPage);
        } else {
          console.log("There's no user here");
        }
      });
    
  }

  alert(message: string) { //This is just for test
    this.alertCtrl.create({
      title: "",
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  showUserPage() {
    console.log("entroooo");
  }

  goRegister() {
    this.navCtrl.push(RegisterPage);
  }

  recoverPass() {
    this.fire.auth.sendPasswordResetEmail(this.email.value)
      .then(res => {
        this.alert('Te hemos enviado un correo para recuperar la contraseña')
      }).catch(err => {
        this.alert(this.errorHdlr.handleError(err.message));
      })
  }

  signIn() {
    this.fire.auth.signInWithEmailAndPassword(this.email.value, this.password.value)
      .then(data => {
        this.navCtrl.setRoot(MenuPage);
      })
      .catch(error => {
        this.alert(this.errorHdlr.handleError(error.message));
        console.log(error.message)
      })
  }

  socialLogin(provider):void {
    let signInProv = null;

    switch (provider) {
      case 'facebook':
        signInProv = new firebase.auth.FacebookAuthProvider();
        break;
      case 'google':
        signInProv = new firebase.auth.GoogleAuthProvider();
        break;
    }

    this.fire.auth.signInWithRedirect(signInProv)
      .then(() => {
        this.fire.auth.getRedirectResult()
          .then(result => {
              let token = result.credential.accessToken;
              let user = result.user;
              console.log(token, user)
              //this.navCtrl.push(MenuPage);
              this.ref.detectChanges();
          })
      })

  }

  googleSignIn() {
    this.fire.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
      .then(() => {
        return this.fire.auth.getRedirectResult()
          .then(result => {
            let token = result.credential.accessToken;
            let user = result.user;
            console.log(token, user)
            this.alert("Loged in")
          }).catch(err => {
            this.alert(this.errorHdlr.handleError(err.message))
          })
      })
  }

}
