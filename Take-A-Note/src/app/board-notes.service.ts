import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoardNotesService {
  constructor() {}

  private idboard = new BehaviorSubject('0');
  getidboard = this.idboard.asObservable();

  setIdBoard(id: string) {
    this.idboard.next(id);
  }
}
