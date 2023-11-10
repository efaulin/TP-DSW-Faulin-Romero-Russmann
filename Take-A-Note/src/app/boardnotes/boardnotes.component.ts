import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Note } from '../classes/noteclass';
import { BoardNotesService } from '../board-notes.service';

@Component({
  selector: 'app-boardnotes',
  templateUrl: './boardnotes.component.html',
  styleUrls: ['./boardnotes.component.css'],
})
export class BoardnotesComponent implements OnInit {
  constructor(
    private rest: RestService,
    private boardnotes: BoardNotesService
  ) {}

  public notes: Note[] = [];

  ngOnInit(): void {
    this.boardnotes.idboard.subscribe((id) => {
      this.rest
        .get(`http://localhost:3000/api/notas/buscar/${id}`)
        .subscribe((res) => {
          console.log(JSON.parse(JSON.stringify(res)));
          this.notes = JSON.parse(JSON.stringify(res))});
        console.log(id);
        //console.log(this.notes);
    });
  }
}
