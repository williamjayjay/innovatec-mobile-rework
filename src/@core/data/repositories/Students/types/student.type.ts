import { StudentServerEntityResultsApi, StudentServerEntityInfoApi } from "@/@core/domains/server-entities/student.server-entity";


type Gender = 'male' | 'female' | "";
 interface SearchParams {
    page?: number;
    results?: number;
    inc?: string;
    gender: Gender
}


interface StudentResponseApi {
    results: StudentServerEntityResultsApi[]
    info: StudentServerEntityInfoApi
}

export {SearchParams, StudentResponseApi, Gender}