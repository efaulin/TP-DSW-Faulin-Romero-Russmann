import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Board } from '../classes/boardclass';

@Component({
  selector: 'app-dialogboard',
  templateUrl: './dialogboard.component.html',
  styleUrls: ['./dialogboard.component.css'],
})
export class DialogboardComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Board) {}
}
