import { Component, inject, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { SHARED_IMPORTS } from '../../shared/shared.imports';
import { MaestrosService } from '../../services/maestros-service';
import { NotificationService } from '../../services/tools/notification-service';
import { DatosMaestro } from '../../interfaces/usuarios.interfaces';

@Component({
  selector: 'app-registro-maestros',
  imports: [...SHARED_IMPORTS],
  templateUrl: './registro-maestros.html',
  styleUrl: './registro-maestros.scss',
})
export class RegistroMaestros implements OnInit {
  @Input() rol: string = '';
  @Input() datos_user: any = {};

  // Servicios
  private location = inject(Location);
  private maestrosService = inject(MaestrosService);
  private notificationService = inject(NotificationService);

  // Variables del formulario
  public maestro: DatosMaestro = {} as DatosMaestro;
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

  // Catálogo de áreas de investigación
  public areas: string[] = [
    'Desarrollo Web',
    'Programación',
    'Bases de datos',
    'Redes',
    'Matemáticas',
  ];

  // Catálogo de materias (checkbox)
  public materias: { value: string; nombre: string }[] = [
    { value: 'Aplicaciones Web', nombre: 'Aplicaciones Web' },
    { value: 'Programación 1', nombre: 'Programación 1' },
    { value: 'Bases de datos', nombre: 'Bases de datos' },
    { value: 'Tecnologías Web', nombre: 'Tecnologías Web' },
    { value: 'Minería de datos', nombre: 'Minería de datos' },
    { value: 'Desarrollo móvil', nombre: 'Desarrollo móvil' },
    { value: 'Estructuras de datos', nombre: 'Estructuras de datos' },
    { value: 'Administración de redes', nombre: 'Administración de redes' },
    { value: 'Ingeniería de software', nombre: 'Ingeniería de software' },
    { value: 'Administración de S.O.', nombre: 'Administración de S.O.' },
  ];

  constructor() {}

  ngOnInit(): void {
    this.maestro = this.maestrosService.esquemaMaestro();
    this.maestro.rol = this.rol;
    console.log('Datos del maestro:', this.maestro);
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

  // Agrega o quita una materia del arreglo materias_json
  public checkboxChange(event: any, materia: string): void {
    if (event.checked) {
      if (!this.maestro.materias_json.includes(materia)) {
        this.maestro.materias_json.push(materia);
      }
    } else {
      this.maestro.materias_json = this.maestro.materias_json.filter((m) => m !== materia);
    }
  }

  public registrar(): void {
    this.errors = {};
    this.errors = this.maestrosService.validarMaestro(this.maestro, this.editar);
    console.log('Errores de validación:', this.errors);

    if (Object.keys(this.errors).length > 0) {
      this.notificationService.error('Revisa los campos marcados en el formulario');
      return;
    }

    // TODO: registrar al maestro en el backend usando MaestrosService (siguiente práctica)
    this.notificationService.success('Formulario de maestro válido');
    console.log('Maestro listo para enviar:', this.maestro);
  }

  public actualizar(): void {}

  // Solo permite letras (con acentos y ñ) y espacios
  public soloLetras(event: KeyboardEvent): void {
    if (event.key.length === 1 && !/^[A-Za-zÑñáéíóúÁÉÍÓÚüÜ ]$/.test(event.key)) {
      event.preventDefault();
    }
  }
}
