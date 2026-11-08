import { inject, Injectable } from '@angular/core';
import { ErrorsService } from './tools/errors-service';
import { ValidatorService } from './tools/validator-service';
import { DatosMaestro } from '../interfaces/usuarios.interfaces';

@Injectable({
  providedIn: 'root',
})
export class MaestrosService {
  // Inyectar los servicios para validaciones y errores
  private validatorService = inject(ValidatorService);
  private errorService = inject(ErrorsService);

  // Esquema (estructura vacía) de los datos del maestro
  public esquemaMaestro(): DatosMaestro {
    return {
      rol: '',
      id_trabajador: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirmar_password: '',
      fecha_nacimiento: '',
      telefono: '',
      rfc: '',
      cubiculo: '',
      area_investigacion: '',
      materias_json: [],
    };
  }

  // Validaciones del formulario de maestro.
  // Regresa un JSON con los errores; si no hay errores, el JSON queda vacío.
  public validarMaestro(data: DatosMaestro, editar: boolean) {
    const error: any = {};

    // ID de trabajador
    if (!this.validatorService.required(data['id_trabajador'])) {
      error['id_trabajador'] = this.errorService.required;
    } else if (!this.validatorService.numeric(data['id_trabajador'])) {
      error['id_trabajador'] = this.errorService.numeric;
    } else if (!this.validatorService.max(data['id_trabajador'], 10)) {
      error['id_trabajador'] = this.errorService.max(10);
    }

    // Nombre
    if (!this.validatorService.required(data['first_name'])) {
      error['first_name'] = this.errorService.required;
    } else if (!this.validatorService.words(data['first_name'])) {
      error['first_name'] = 'Solo se aceptan letras y espacios';
    }

    // Apellidos
    if (!this.validatorService.required(data['last_name'])) {
      error['last_name'] = this.errorService.required;
    } else if (!this.validatorService.words(data['last_name'])) {
      error['last_name'] = 'Solo se aceptan letras y espacios';
    }

    // Correo electrónico
    if (!this.validatorService.required(data['email'])) {
      error['email'] = this.errorService.required;
    } else if (!this.validatorService.max(data['email'], 40)) {
      error['email'] = this.errorService.max(40);
    } else if (!this.validatorService.email(data['email'])) {
      error['email'] = this.errorService.email;
    }

    // Contraseñas (solo al registrar, no al editar)
    if (!editar) {
      if (!this.validatorService.required(data['password'])) {
        error['password'] = this.errorService.required;
      } else if (!this.validatorService.min(data['password'], 8)) {
        error['password'] = this.errorService.min(8);
      }

      if (!this.validatorService.required(data['confirmar_password'])) {
        error['confirmar_password'] = this.errorService.required;
      } else if (data['password'] !== data['confirmar_password']) {
        error['confirmar_password'] = 'Las contraseñas no coinciden';
      }
    }

    // Fecha de nacimiento (YYYY-MM-DD y no puede ser futura)
    if (!this.validatorService.required(data['fecha_nacimiento'])) {
      error['fecha_nacimiento'] = this.errorService.required;
    } else if (!this.validatorService.date(data['fecha_nacimiento'])) {
      error['fecha_nacimiento'] = this.errorService.betweenDate;
    } else {
      const hoy = new Date().toISOString().slice(0, 10);
      if (!this.validatorService.dateBetween(data['fecha_nacimiento'], '1900-01-01', hoy)) {
        error['fecha_nacimiento'] = this.errorService.betweenDate;
      }
    }

    // Teléfono (10 dígitos; ngx-mask guarda solo los números)
    if (!this.validatorService.required(data['telefono'])) {
      error['telefono'] = this.errorService.required;
    } else if (!this.validatorService.min(data['telefono'], 10)) {
      error['telefono'] = this.errorService.min(10);
    }

    // RFC (12 o 13 caracteres)
    if (!this.validatorService.required(data['rfc'])) {
      error['rfc'] = this.errorService.required;
    } else if (!this.validatorService.min(data['rfc'], 12)) {
      error['rfc'] = this.errorService.min(12);
    } else if (!this.validatorService.max(data['rfc'], 13)) {
      error['rfc'] = this.errorService.max(13);
    }

    // Cubículo
    if (!this.validatorService.required(data['cubiculo'])) {
      error['cubiculo'] = this.errorService.required;
    }

    // Área de investigación
    if (!this.validatorService.required(data['area_investigacion'])) {
      error['area_investigacion'] = this.errorService.required;
    }

    // Materias (al menos una)
    if (!data['materias_json'] || data['materias_json'].length === 0) {
      error['materias_json'] = 'Debes seleccionar al menos una materia';
    }

    return error;
  }
}
