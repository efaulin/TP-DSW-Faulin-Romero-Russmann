import { Component } from '@angular/core';
import { RestService } from '../rest.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private rest: RestService,
    private fb: FormBuilder,
    private route: Router
  ) {}

  public error: boolean = false;

  public user = this.fb.group({
    name: ['', [Validators.required]],
    pass: ['', [Validators.required]],
  });

  public isvalid() {
    const name = this.user.get('name')?.value;
    const pass = this.user.get('pass')?.value;
    this.rest
      .get(`http://localhost:3000/api/usuarios/validation/${name}&${pass}`)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.route.navigateByUrl('/logged-home');
        },
        error: (error) => {
          console.log(error);
          this.error = true;
        },
      });
  }

  public submit() {
    if (this.user.valid) {
      this.isvalid();
    }
  }
}
