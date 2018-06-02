import { NgModule } from '@angular/core';
import { AccordionComponent } from './accordion/accordion';
import { NavbarComponent } from './navbar/navbar';
import { UserPopoverComponent } from './user-popover/user-popover';
import { AddressSelectorComponent } from './address-selector/address-selector';

@NgModule({
	declarations: [AccordionComponent,
    NavbarComponent,
    UserPopoverComponent,
    AddressSelectorComponent],
	imports: [],
	exports: [AccordionComponent,
    NavbarComponent,
    UserPopoverComponent,
    AddressSelectorComponent]
})
export class ComponentsModule {}
