export interface Alumno {
    id: number;
    name: string;
    lastName: string;
    email: string;
    token: string;
    role: string;
}

export interface Usuario {
    id: number;
    email: string;
    name: string;
    lastName: string;
    password: string;
    token: string;
    role: string;
}

export interface Curso {
    id: number;
    name: string;
    startDate: Date;
    endDate: Date;
}

export interface LoginPayload {
    email: string | null;
    password: string | null;
}