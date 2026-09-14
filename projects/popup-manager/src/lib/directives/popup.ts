import { Directive, ElementRef, HostListener, Input, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { PopupManager } from '../services/popup-manager';
import { PopupPositions } from '../enums/popup-positions';

@Directive({
  selector: '[libPopup]',
})
export class Popup implements OnInit, OnDestroy, OnChanges {
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private popupService: PopupManager
  ) { }

  @Input()
  popup!: string;

  @Input()
  top!: string;

  @Input()
  bottom!: string;

  @Input()
  left!: string;

  @Input()
  right!: string;

@Input()
position: PopupPositions = PopupPositions.CENTER;

  @Input()
  popupStyle!: string;

  isOpen = false;
  private triggerElement!: HTMLElement;
  showPopupClass: string = 'popup-fade-enter'
  hidePopupClass: string = 'popup-fade-leave'
  clickedInside: boolean = false



  ngOnInit(): void {
    this.hide();
    this.popupService.register(this.popup, this);
    this.applyCommonStyle();
    if (this.position) {
      this.applySpecificPosition()
    } else {
      this.applyPosition();
    }

    if (this.popupStyle) {
      this.applyCustomStyle();
    }
  }

  @HostListener('document:click', ['$event'])
  click(event: MouseEvent): void {

    const target = event.target as Node;

    const clickedInsidePopup = this.elementRef.nativeElement.contains(target);

    const clickedInsideTrigger = this.triggerElement?.contains(target) ?? false;

    if (!clickedInsidePopup && !clickedInsideTrigger) {
      this.hideElement();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['popupStyle']) {
      console.log('changed')
    }
  }


  togglePopup(triggerElement: HTMLElement): void {
    this.triggerElement = triggerElement;
    this.isOpen = !this.isOpen;
    this.isOpen ? this.showElement() : this.hideElement();
  }

  showElement() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'position', 'absolute');
    this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'block');
    this.renderer.setStyle(this.elementRef.nativeElement, 'z-index', '10000');
    this.renderer.removeClass(this.elementRef.nativeElement, this.hidePopupClass)
    this.renderer.addClass(this.elementRef.nativeElement, this.showPopupClass)
  }

  hideElement() {
    this.isOpen = false;
    this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'none');
    this.renderer.removeClass(this.elementRef.nativeElement, this.showPopupClass)
    this.renderer.addClass(this.elementRef.nativeElement, this.hidePopupClass)
  }

  private hide(): void {
    this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'none');
    this.renderer.removeClass(this.elementRef.nativeElement, this.showPopupClass)
    this.renderer.addClass(this.elementRef.nativeElement, this.hidePopupClass)
  }

  applyPosition(): void {

    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'position',
      'absolute'
    );

    if (this.top) {
      this.renderer.setStyle(
        this.elementRef.nativeElement,
        'top',
        this.top
      );
    }

    if (this.bottom) {
      this.renderer.setStyle(
        this.elementRef.nativeElement,
        'bottom',
        this.bottom
      );
    }

    if (this.left) {
      this.renderer.setStyle(
        this.elementRef.nativeElement,
        'left',
        this.left
      );
    }

    if (this.right) {
      this.renderer.setStyle(
        this.elementRef.nativeElement,
        'right',
        this.right
      );
    }


  }

  applySpecificPosition(): void {

    switch (this.position) {

      case PopupPositions.CENTER:
        this.renderer.setStyle(this.elementRef.nativeElement, 'position', 'fixed');
        this.renderer.setStyle(this.elementRef.nativeElement, 'top', '50%');
        this.renderer.setStyle(this.elementRef.nativeElement, 'left', '50%');
        this.renderer.setStyle(this.elementRef.nativeElement, 'transform', 'translate(-50%, -50%)');
        break;

      case PopupPositions.TOP:
        this.renderer.setStyle(this.elementRef.nativeElement, 'position', 'fixed');
        this.renderer.setStyle(this.elementRef.nativeElement, 'top', '0');
        this.renderer.setStyle(this.elementRef.nativeElement, 'left', '50%');
        this.renderer.setStyle(this.elementRef.nativeElement, 'transform', 'translateX(-50%)');
        break;

      case PopupPositions.BOTTOM:
        this.renderer.setStyle(this.elementRef.nativeElement, 'position', 'fixed');
        this.renderer.setStyle(this.elementRef.nativeElement, 'bottom', '0');
        this.renderer.setStyle(this.elementRef.nativeElement, 'left', '50%');
        this.renderer.setStyle(this.elementRef.nativeElement, 'transform', 'translateX(-50%)');
        break;

      case PopupPositions.LEFT:
        this.renderer.setStyle(this.elementRef.nativeElement, 'position', 'fixed');
        this.renderer.setStyle(this.elementRef.nativeElement, 'top', '50%');
        this.renderer.setStyle(this.elementRef.nativeElement, 'left', '0');
        this.renderer.setStyle(this.elementRef.nativeElement, 'transform', 'translateY(-50%)');
        break;

      case PopupPositions.RIGHT:
        this.renderer.setStyle(this.elementRef.nativeElement, 'position', 'fixed');
        this.renderer.setStyle(this.elementRef.nativeElement, 'top', '50%');
        this.renderer.setStyle(this.elementRef.nativeElement, 'right', '0');
        this.renderer.setStyle(this.elementRef.nativeElement, 'transform', 'translateY(-50%)');
        break;

      case PopupPositions.TOP_LEFT:
        this.renderer.setStyle(this.elementRef.nativeElement, 'position', 'fixed');
        this.renderer.setStyle(this.elementRef.nativeElement, 'top', '0');
        this.renderer.setStyle(this.elementRef.nativeElement, 'left', '0');
        break;

      case PopupPositions.TOP_RIGHT:
        this.renderer.setStyle(this.elementRef.nativeElement, 'position', 'fixed');
        this.renderer.setStyle(this.elementRef.nativeElement, 'top', '0');
        this.renderer.setStyle(this.elementRef.nativeElement, 'right', '0');
        break;

      case PopupPositions.BOTTOM_LEFT:
        this.renderer.setStyle(this.elementRef.nativeElement, 'position', 'fixed');
        this.renderer.setStyle(this.elementRef.nativeElement, 'bottom', '0');
        this.renderer.setStyle(this.elementRef.nativeElement, 'left', '0');
        break;

      case PopupPositions.BOTTOM_RIGHT:
        this.renderer.setStyle(this.elementRef.nativeElement, 'position', 'fixed');
        this.renderer.setStyle(this.elementRef.nativeElement, 'bottom', '0');
        this.renderer.setStyle(this.elementRef.nativeElement, 'right', '0');
        break;
    }

  }

  applyCustomStyle(): void {
    if (this.popupStyle) {
      this.renderer.setAttribute(
        this.elementRef.nativeElement,
        'style',
        this.popupStyle
      );
    }
  }

  applyCommonStyle(): void {
    this.renderer.setStyle(this.elementRef.nativeElement, 'z-index', '1000');
    this.renderer.setStyle(this.elementRef.nativeElement, 'border', '1px solid #5e5151');
    this.renderer.setStyle(this.elementRef.nativeElement, 'box-shadow', '0 10px 25px rgba(0, 0, 0, 0.15)');
  }


  ngOnDestroy(): void {
    this.popupService.unRegister(this.popup);
  }
}
