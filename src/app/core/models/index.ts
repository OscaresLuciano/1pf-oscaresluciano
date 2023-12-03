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
    Profesor: 'Profesor',
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

export interface Enrollment {
    id: number;
    courseId: number;
    useId: number;
    user?: Usuario;
    course?: Curso;
}

export interface CreateEnrollmentPayload {
    courseId: number | null;
    userId: number | null;
}