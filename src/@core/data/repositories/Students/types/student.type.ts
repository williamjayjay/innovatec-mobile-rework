import { StudentServerEntityResultsApi, StudentServerEntityInfoApi } from "@/@core/domains/server-entities/student.server-entity";

 interface SearchParams {
    page?: number;
    results?: number;
    inc?: string;
    gender?: 'male' | 'female';
}


interface StudentResponseApi {
    results: StudentServerEntityResultsApi[]
    info: StudentServerEntityInfoApi
}

export {SearchParams, StudentResponseApi}