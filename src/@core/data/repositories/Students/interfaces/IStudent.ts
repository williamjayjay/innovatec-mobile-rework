import { SearchParams, StudentResponseApi } from "../types/student.type";

interface StudentsRepositoryInterface {
    getStudents({ page, results, gender, inc }: SearchParams): Promise<StudentResponseApi>;
}

export { StudentsRepositoryInterface }