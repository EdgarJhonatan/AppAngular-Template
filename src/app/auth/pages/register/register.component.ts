import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent {
  miFormulario: FormGroup = this.fb.group({
    documento: ['46746908', [Validators.required]],
    nombre: ['José Carlos', [Validators.required]],
    paterno: ['Mariátegui', [Validators.required]],
    materno: ['Mendoza', [Validators.required]],
    email: ['jose@gmail.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  registro() {
    const jsonUsuario = this.miFormulario.value;

    console.log('jsonUsuario', jsonUsuario);

    this.authService.registro(jsonUsuario).subscribe((codRes) => {
      console.log(codRes);
      if (codRes == '00') {
        this.router.navigateByUrl('/dashboard');
      } else {
        Swal.fire('Error', codRes, 'error');
      }
    });
  }
}
