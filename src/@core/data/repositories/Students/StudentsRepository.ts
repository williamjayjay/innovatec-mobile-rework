import { StudentsRepositoryInterface } from "./interfaces/IStudent";
import { SearchParams, StudentResponseApi } from "./types/student.type";
import { clientHttp } from "@/@core/services/client-http/client";

class StudentsRepository implements StudentsRepositoryInterface {
  customApiUrl: string;

  constructor(customApiUrl?: string) {
    this.customApiUrl = customApiUrl || '' ;
  }

  async getStudents({
    page = 0,
    results = 0,
    inc,
    gender
  }: SearchParams): Promise<StudentResponseApi> {

    try {
      const response = await clientHttp.get<StudentResponseApi>(this.customApiUrl, {
        params: {
          page,
          results,
          inc,
          gender
        }
      })

      return response.data

    } catch (error) {
      throw new Error('Não foi possível obter os alunos.');
    }
  }
}

export { StudentsRepository };
