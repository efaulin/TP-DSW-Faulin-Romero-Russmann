import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Note } from '../classes/noteclass';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-boardnotes',
  templateUrl: './boardnotes.component.html',
  styleUrls: ['./boardnotes.component.css'],
})
export class BoardnotesComponent implements OnInit {
  constructor(private rest: RestService, private route: ActivatedRoute) {}

  public notes: Note[] = [];
  public idboard: string = '';

  ngOnInit(): void {
    this.idboard = this.route.snapshot.paramMap.get('id')!;
    this.getnotes(this.idboard);
  }

  public getnotes(id: string) {
    console.log(id);
    this.rest
      .get(`http://localhost:3000/api/notas/buscar/${id}`)
      .subscribe((res) => {
        this.notes = Object.values(res);
        console.log(this.notes);
      });
  }

  public savenote(idnote: string, index: number) {
    this.rest
      .put(`http://localhost:3000/api/notas/${idnote}`, this.notes[index])
      .subscribe((res) => {
        console.log(res);
      });
  }

  public addnote(pos: number) {
    const note = new Note('', pos, this.idboard);
    this.rest.post(`http://localhost:3000/api/notas`, note).subscribe((res) => {
      console.log(res);
      this.getnotes(this.idboard);
    });
  }

  public deletenote(idnote: string) {
    this.rest
      .delete(`http://localhost:3000/api/notas/${idnote}`)
      .subscribe((res) => {
        console.log(res);
        this.getnotes(this.idboard);
      });
  }
}
