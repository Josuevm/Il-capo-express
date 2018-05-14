import { Component, ViewChild, OnInit,Renderer,Input } from '@angular/core';

/**
 * Generated class for the AccordionComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'accordion',
  templateUrl: 'accordion.html'
})
export class AccordionComponent implements OnInit{
accordionExpanded = false;
@ViewChild("cc") cardContent : any;
@Input("title") title:string;
  constructor(public renderer:Renderer) {
  
  }
  ngOnInit(){
    //this.renderer.setElementStyle(this.cardContent.nativeElement,"webkitTransition","max-height 500ms , padding 500ms")
  }



}
