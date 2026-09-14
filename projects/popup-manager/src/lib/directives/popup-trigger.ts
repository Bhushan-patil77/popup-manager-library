import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { PopupManager } from '../services/popup-manager';

@Directive({
  selector: '[libPopupTrigger]',
})
export class PopupTrigger implements OnInit {

  @Input()
  popupTrigger!: string;

  @Input()
  customInput!: string;

  constructor(
    private elementRef: ElementRef,
    private popupService: PopupManager,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.renderer.setStyle(this.elementRef.nativeElement, 'cursor', 'pointer')
  }


  @HostListener('click')
  click(): any {
    this.popupService.toggle(
      this.popupTrigger,
      this.elementRef.nativeElement
    );
  }

}
