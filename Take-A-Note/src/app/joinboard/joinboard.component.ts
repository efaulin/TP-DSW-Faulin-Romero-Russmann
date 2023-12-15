import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Board } from '../classes/boardclass';
import { MatDialog } from '@angular/material/dialog';
import { DialogboardComponent } from '../dialogboard/dialogboard.component';

@Component({
  selector: 'app-joinboard',
  templateUrl: './joinboard.component.html',
  styleUrls: ['./joinboard.component.css'],
})
export class JoinboardComponent implements OnInit {
  constructor(private rest: RestService, private dialog: MatDialog) {}

  public boards: Board[] = [];
  public name: string = '';

  ngOnInit(): void {
    this.getboards();
  }

  public getboards() {
    this.rest.get('http://localhost:3000/api/tablas').subscribe((res) => {
      this.boards = Object.values(res); //preguntar si es la manera correcta de hacerlo
      console.log(this.boards);
    });
  }

  public filterboards() {
    let letters = false;
    for (let i = 0; i < this.name.length; i++) {
      if (this.name.charAt(i) != ' ') {
        letters = true;
        break;
      }
    }
    if (letters) {
      this.rest
        .get(`http://localhost:3000/api/tablas/buscar/${this.name}`)
        .subscribe((res) => {
          console.log(this.name);
          this.boards = Object.values(res);
          console.log(this.boards);
        });
    } else {
      this.getboards();
    }
  }

  public opendialog(board: Board) {
    this.dialog.open(DialogboardComponent, {
      data: board,
      autoFocus: true,
      hasBackdrop: true,
    });
  }
}
