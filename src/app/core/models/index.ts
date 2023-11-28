import { UserRole } from "./roles.enum";

export interface Usuario {
    id: number;
    email: string;
    name: string;
    lastName: string;
    password: string;
    token: string;
    role: UserRole;
}

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