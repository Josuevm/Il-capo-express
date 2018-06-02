import { NgModule } from '@angular/core';
import { AccordionComponent } from './accordion/accordion';
import { NavbarComponent } from './navbar/navbar';
import { UserPopoverComponent } from './user-popover/user-popover';
import { AddressSelectorComponent } from './address-selector/address-selector';
import { AddressModalComponent } from './address-modal/address-modal';

@NgModule({
	declarations: [AccordionComponent,
    NavbarComponent,
    UserPopoverComponent,
    AddressSelectorComponent,
    AddressModalComponent],
	imports: [],
	exports: [AccordionComponent,
    NavbarComponent,
    UserPopoverComponent,
    AddressSelectorComponent,
    AddressModalComponent]
})
export class ComponentsModule {}
