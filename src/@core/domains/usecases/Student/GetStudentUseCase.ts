import { StudentsRepository } from '@/@core/data/repositories/Students/StudentsRepository';
import { SearchParams } from '@/@core/data/repositories/Students/types/student.type';
import { StudentModel } from '@/@core/domains/models/student.model';
import { StudentServerEntity } from '@/@core/domains/server-entities/student.server-entity';

class GetStudentsUseCase {
  private studentsRepository: StudentsRepository;

  constructor(studentsRepository: StudentsRepository) {
    this.studentsRepository = studentsRepository;
  }

  async execute(searchParams: SearchParams): Promise<StudentServerEntity[] | []> {
    try {
      const studentsResponse = await this.studentsRepository.getStudents(searchParams);

      if (!studentsResponse?.results?.length) {
        return [];
      }

      const studentResultModel = new StudentModel(studentsResponse.results);

      return studentResultModel.fullData;

    } catch (error: any) {
      throw new Error('Erro ao buscar os estudantes: ' + error.message);
    }
  }
}

export { GetStudentsUseCase };
