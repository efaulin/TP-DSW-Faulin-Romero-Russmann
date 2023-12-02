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
      this.getnotes(id);
    });
  }

  public getnotes(id: string) {
    console.log(id);
    this.rest.get(`http://localhost:3000/api/notas/buscar/${id}`).subscribe({
      next: (res) => {
        console.log(res);
        this.notes = structuredClone(JSON.parse(JSON.stringify(res)));
        console.log(this.notes);
      },
    });
  }
  public getidnote(i: number, note: Note) {
    return note.idItem;
  }
  public getnotas() {
    console.log(this.notes);
  }
}
