// Interfaces de datos por tipo de usuario.
// Se importan en los servicios y en los componentes para mantener el código limpio.

// Interfaz datos de usuario de administrador
export interface DatosAdministrador {
  rol: string;
  clave_admin: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmar_password: string;
  telefono: string;
  rfc: string;
  edad: number;
  ocupacion: string;
}

// Interfaz datos de usuario de maestro
export interface DatosMaestro {
  rol: string;
  id_trabajador: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmar_password: string;
  fecha_nacimiento: string; // formato YYYY-MM-DD
  telefono: string;
  rfc: string;
  cubiculo: string;
  area_investigacion: string;
  materias_json: string[];
}

// Interfaz datos de usuario de alumno
export interface DatosAlumno {
  rol: string;
  matricula: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmar_password: string;
  fecha_nacimiento: string; // formato YYYY-MM-DD
  curp: string;
  rfc: string;
  edad: string;
  telefono: string;
  ocupacion: string;
}
