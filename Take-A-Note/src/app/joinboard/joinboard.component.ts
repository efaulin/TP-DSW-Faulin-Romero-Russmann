import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Board } from '../classes/boardclass';
import { BoardNotesService } from '../board-notes.service';

@Component({
  selector: 'app-joinboard',
  templateUrl: './joinboard.component.html',
  styleUrls: ['./joinboard.component.css'],
})
export class JoinboardComponent implements OnInit {
  constructor(
    private rest: RestService,
    private boardnotes: BoardNotesService
  ) {}

  public boards: Board[] = [];

  ngOnInit(): void {
    this.getboards();
  }

  public getboards() {
    this.rest.get('http://localhost:3000/api/tablas').subscribe((res) => {
      this.boards = Object.values(res); //preguntar si es la manera correcta de hacerlo
    });
  }

  public sendboardid(id: string) {
    this.boardnotes.idboard.emit(id);
  }
}
