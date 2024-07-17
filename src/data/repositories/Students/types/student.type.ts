import { RandomUserAPIResponse } from "@/domain/entities/Student/types/student.type";

export interface SearchParams {
    page?: number;
    results?: number;
    include?: string;
    gender?: 'male' | 'female' | 'both';
}

export interface StudentsPromise {
    data: RandomUserAPIResponse
}