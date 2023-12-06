export interface Usuario {
    id: number;
    email: string;
    name: string;
    lastName: string;
    password: string;
    token: string;
    role: UserRole;
}

export const UserRoles = {
    Administrador: 'Administrador',
    Empleado: 'Empleado',
    Estudiante: 'Estudiante',
  } as const;
  
  export type UserRole = keyof typeof UserRoles;

export interface Curso {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
}

export interface LoginPayload {
    email: string | null;
    password: string | null;
}

export interface Inscripcion {
    id: number;
    courseId: number;
    userId: number;
    user?: Usuario;
    course?: Curso;
}

export interface CreateInscripcionPayload {
    courseId: number | null;
    userId: number | null;
}