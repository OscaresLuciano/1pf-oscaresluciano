export interface Alumno {
    id: number;
    name: string;
    lastName: string;
    email: string;
}

export interface Usuario {
    email: string;
    password: string;
}

export interface Curso {
    id: number;
    name: string;
    startDate: Date;
    endDate: Date;
}