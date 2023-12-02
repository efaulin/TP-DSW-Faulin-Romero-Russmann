import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Board } from '../classes/boardclass';

@Component({
  selector: 'app-createboard',
  templateUrl: './createboard.component.html',
  styleUrls: ['./createboard.component.css'],
})
export class CreateboardComponent implements OnInit {
  constructor(private rest: RestService) {}

  public boardname: string = '';

  ngOnInit(): void {}

  public createboard() {
    const board = new Board(this.boardname);
    this.rest
      .post('http://localhost:3000/api/tablas', board)
      .subscribe((res) => {
        console.log(res);
      });
  }
}
