import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BoardNotesService {
  @Output() idboard = new EventEmitter<string>();
  constructor() {}
}
