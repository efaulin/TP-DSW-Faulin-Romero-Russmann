import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Board } from '../classes/boardclass';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createboard',
  templateUrl: './createboard.component.html',
  styleUrls: ['./createboard.component.css'],
})
export class CreateboardComponent implements OnInit {
  constructor(
    private rest: RestService,
    private fb: FormBuilder,
    private route: Router
  ) {}

  public boardname = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('[^]*[^ ]+[^]*'),
      ],
    ],
  });

  ngOnInit(): void {}

  public createboard() {
    const board = new Board(this.boardname.get('name')?.value!);
    this.rest
      .post('http://localhost:3000/api/tablas', board)
      .subscribe((res) => {
        console.log(res);
      });
  }

  public submit() {
    if (this.boardname.valid) {
      this.createboard();
      this.route.navigateByUrl('/joinboard');
    }
  }
}
