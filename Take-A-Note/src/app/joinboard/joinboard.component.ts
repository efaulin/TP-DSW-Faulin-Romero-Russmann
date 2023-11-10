import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Board } from '../classes/boardclass';

@Component({
  selector: 'app-joinboard',
  templateUrl: './joinboard.component.html',
  styleUrls: ['./joinboard.component.css'],
})
export class JoinboardComponent implements OnInit {
  constructor(private rest: RestService) {}
  public boards: Board[] = []; //preguntar al profe como declarar para que no explote
  ngOnInit(): void {
    this.getboards();
  }

  public getboards() {
    this.rest.get('http://localhost:3000/api/tablas').subscribe((res) => {
      this.boards = Object.values(res);
    });
  }
}
