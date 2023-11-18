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
    startDate: string;
    endDate: string;
}

export interface LoginPayload {
    email: string | null;
    password: string | null;
}