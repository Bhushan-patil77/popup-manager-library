import { Injectable } from '@angular/core';
import { Popup } from '../directives/popup';

@Injectable({
  providedIn: 'root',
})
export class PopupManager {

  private popups = new Map<string, Popup>();
  register(id: string, popup: Popup): void { this.popups.set(id, popup) }

  unRegister(id: string): void { this.popups.delete(id) }

  get(id: string): any { return this.popups.get(id) }

  toggle(id: string, triggerElement: HTMLElement): void {

    const popup = this.popups.get(id);

    if (!popup) {
      return;
    }

    popup.togglePopup(triggerElement);
  }

  hide(id: string): void {
    const popup = this.popups.get(id);
    if (!popup) { return }
    popup.hideElement();
  }

  show(id: string): void {
    const popup = this.popups.get(id);
    if (!popup) { return }
    popup.showElement();
  }
}
