import { Student } from "@/domain/entities/Student/Student";
import { RandomUserAPIResponse } from "@/domain/entities/Student/types/student.type";
import { StudentsRepositoryInterface } from "./interfaces/IStudent";
import { SearchParams } from "./types/student.type";
import { clientHttp } from "@/@core/services/client-http/client";

class StudentsRepository implements StudentsRepositoryInterface {
  apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl ;
  }

  async getStudents({
    page = 0,
    results = 0,
    include,
    gender
  }: SearchParams): Promise<Student[] | []> {

    try {
      const response = await clientHttp.get<RandomUserAPIResponse>(this.apiUrl , {
        params: {
          page,
          results,
          include,
          gender
        }
      })

      if (!response?.data?.results?.[0]) {
        return []
      }

      return Student.extractDataStudent(response?.data?.results)

    } catch (error) {
      throw new Error('Não foi possível obter os alunos.');
    }
  }
}

export {StudentsRepository};
