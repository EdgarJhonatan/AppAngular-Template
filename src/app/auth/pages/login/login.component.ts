import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent {
  miFormulario: FormGroup = this.fb.group({
    documento: ['46746907', [Validators.required]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  login() {
    console.log(this.miFormulario.value);
    const { documento, password } = this.miFormulario.value;

    this.authService.login(documento, password).subscribe((resp) => {
      console.log(resp);
      if (resp.codRes == '00') {
        this.router.navigateByUrl('/dashboard');
        //Swal.fire('Bienvenido', resp.message, 'success');
      } else {
        Swal.fire('Error', resp.message, 'error');
      }
    });
  }
}
