import { Component, OnInit, signal } from '@angular/core';
import { PopupTrigger, Popup, PopupPositions } from 'popup-manager'

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [PopupTrigger, Popup],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User implements OnInit {

  PopupPosition = PopupPositions;

ngOnInit(): void {

}





}
