import { Student } from "@/domain/entities/Student/Student";
import { SearchParams } from "../types/student.type";

interface StudentsRepositoryInterface {
    getStudents({ page, results, gender, include }: SearchParams): Promise<Student[] | []>;
}

export { StudentsRepositoryInterface }