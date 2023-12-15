import { Component } from '@angular/core';
import { RestService } from '../rest.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../classes/userclass';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private rest: RestService,
    private fb: FormBuilder,
    private route: Router
  ) {}

  public user = this.fb.group({
    mail: ['', [Validators.required, Validators.email]],
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('[^ ]*'),
      ],
    ],
    pass: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('[^ ]*'),
      ],
    ],
  });

  public registeruser() {
    const mail = this.user.get('mail')?.value;
    const name = this.user.get('name')?.value;
    const pass = this.user.get('pass')?.value;
    const user = new User(name!, pass!, mail!);
    this.rest
      .post('http://localhost:3000/api/usuarios', user)
      .subscribe((res) => {
        console.log(res);
      });
  }

  public submit() {
    if (this.user.valid) {
      this.registeruser();
      this.route.navigateByUrl('/joinboard');
    }
  }
}
