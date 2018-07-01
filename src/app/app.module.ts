import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environment/environment';
import { Network } from '@ionic-native/network';
import { Geolocation } from '@ionic-native/geolocation';
import { Firebase } from '@ionic-native/firebase';
import {} from '@types/googlemaps';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { UserPage } from '../pages/user/user';
import { RegisterPage } from '../pages/register/register';
import { MenuPage } from '../pages/menu/menu';
import { AccountManagerPage } from '../pages/account-manager/account-manager'
import { UserPopoverComponent } from '../components/user-popover/user-popover'
import { ErrorHandlerProvider } from '../providers/error-handler/error-handler';
import {HttpModule} from '@angular/http'
import {AccordionComponent} from '../components/accordion/accordion';
import {NavbarComponent} from '../components/navbar/navbar';
import { FirestoreMethodsProvider } from '../providers/firestore-methods/firestore-methods';
import { OrderProvider } from '../providers/order/order';
import { MenuItemsProvider } from '../providers/menu-items/menu-items';
import { OrderPage } from '../pages/order/order';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DatabaseMethodsProvider } from '../providers/database-methods/database-methods';
import { MapsConectivityProvider } from '../providers/maps-conectivity/maps-conectivity';
import { GoogleMapsProvider } from '../providers/google-maps/google-maps';
import { AddressSelectorComponent } from '../components/address-selector/address-selector';
import {AddressModalComponent} from '../components/address-modal/address-modal';
import { FcmProvider } from '../providers/fcm/fcm';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    UserPage,
    RegisterPage,
    MenuPage, 
    AccordionComponent,
    NavbarComponent,
    UserPopoverComponent,
    AccountManagerPage,
    OrderPage,
    AddressSelectorComponent,
    AddressModalComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      scrollPadding:false
    }), // conf here papis
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    HttpModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    UserPage,
    RegisterPage,
    MenuPage,
    UserPopoverComponent,
    AccountManagerPage,
    OrderPage,
    AddressSelectorComponent,
    AddressModalComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ErrorHandlerProvider,
    FirestoreMethodsProvider,
    OrderProvider,
    MenuItemsProvider,
    HttpClient,
    DatabaseMethodsProvider,
    MapsConectivityProvider,
    GoogleMapsProvider,
    Network,
    Geolocation,
    Firebase,
    FcmProvider
  ]
})
export class AppModule {}
