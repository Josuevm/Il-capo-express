import { Component } from '@angular/core';
import { Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { FcmProvider } from '../providers/fcm/fcm';
import { tap } from 'rxjs/operators';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  // constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen
  //           , fcm: FcmProvider, toastCtrl: ToastController) {
  //   platform.ready().then(() => {
    
      // Get a FCM token
    //    let aux: string = fcm.getToken()+"";
    //    let toast = toastCtrl.create({
    //     message: aux,
    //     duration: 3000,
    //     position: 'top'
    //   });
    // // // Listen to incoming messages
    //      fcm.listenToNotifications().pipe(
    //       tap(msg => {
    //             // show a toast
    //         const toast = toastCtrl.create({
    //             message: msg.body,
    //            duration: 3000
    //        });
    //           toast.present();
    //       })).subscribe();
    //   // Here you can do any higher level native things you might need.
    //   statusBar.styleDefault();
    //   splashScreen.hide();
    // });
 // }

}

