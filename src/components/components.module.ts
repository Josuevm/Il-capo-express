import { NgModule } from '@angular/core';
import { AccordionComponent } from './accordion/accordion';
import { NavbarComponent } from './navbar/navbar';
@NgModule({
	declarations: [AccordionComponent,
    NavbarComponent],
	imports: [],
	exports: [AccordionComponent,
    NavbarComponent]
})
export class ComponentsModule {}
