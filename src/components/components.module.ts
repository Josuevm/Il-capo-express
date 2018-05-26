import { NgModule } from '@angular/core';
import { AccordionComponent } from './accordion/accordion';
import { NavbarComponent } from './navbar/navbar';
import { UserPopoverComponent } from './user-popover/user-popover';

@NgModule({
	declarations: [AccordionComponent,
    NavbarComponent,
    UserPopoverComponent],
	imports: [],
	exports: [AccordionComponent,
    NavbarComponent,
    UserPopoverComponent]
})
export class ComponentsModule {}
