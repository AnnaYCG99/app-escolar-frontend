import { Component, inject, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { SHARED_IMPORTS } from '../../shared/shared.imports';
import { AlumnosService } from '../../services/alumnos-service';
import { NotificationService } from '../../services/tools/notification-service';
import { DatosAlumno } from '../../interfaces/usuarios.interfaces';

@Component({
  selector: 'app-registro-alumnos',
  imports: [...SHARED_IMPORTS],
  templateUrl: './registro-alumnos.html',
  styleUrl: './registro-alumnos.scss',
})
export class RegistroAlumnos implements OnInit {
  @Input() rol: string = '';
  @Input() datos_user: any = {};

  // Servicios
  private location = inject(Location);
  private alumnosService = inject(AlumnosService);
  private notificationService = inject(NotificationService);

  // Variables del formulario
  public alumno: DatosAlumno = {} as DatosAlumno;
  public errors: any = {};
  public editar: boolean = false;
  public idUser: number = 0;

  // Fecha máxima para el campo de fecha de nacimiento (hoy)
  public hoy: string = new Date().toISOString().slice(0, 10);

  // Variables para los campos de contraseña
  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';

  constructor() {}

  ngOnInit(): void {
    this.alumno = this.alumnosService.esquemaAlumno();
    this.alumno.rol = this.rol;
    console.log('Datos del alumno:', this.alumno);
  }

  public regresar(): void {
    this.location.back();
  }

  public showPassword(): void {
    this.inputType_1 = this.inputType_1 === 'password' ? 'text' : 'password';
    this.hide_1 = !this.hide_1;
  }

  public showPwdConfirmar(): void {
    this.inputType_2 = this.inputType_2 === 'password' ? 'text' : 'password';
    this.hide_2 = !this.hide_2;
  }

  public registrar(): void {
    this.errors = {};
    this.errors = this.alumnosService.validarAlumno(this.alumno, this.editar);
    console.log('Errores de validación:', this.errors);

    if (Object.keys(this.errors).length > 0) {
      this.notificationService.error('Revisa los campos marcados en el formulario');
      return;
    }

    // TODO: registrar al alumno en el backend usando AlumnosService (siguiente práctica)
    this.notificationService.success('Formulario de alumno válido');
    console.log('Alumno listo para enviar:', this.alumno);
  }

  public actualizar(): void {}

  // Solo permite letras (con acentos y ñ) y espacios
  public soloLetras(event: KeyboardEvent): void {
    if (event.key.length === 1 && !/^[A-Za-zÑñáéíóúÁÉÍÓÚüÜ ]$/.test(event.key)) {
      event.preventDefault();
    }
  }
}
