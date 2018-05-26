import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountManagerPage } from './account-manager';

@NgModule({
  declarations: [
    AccountManagerPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountManagerPage),
  ],
})
export class AccountManagerPageModule {}
