import { StudentsRepository } from "@/@core/data/repositories/Students/StudentsRepository";
import { SearchParams } from "@/@core/data/repositories/Students/types/student.type";
import { StudentModel } from "@/@core/domains/models/student.model";
import { fakerWithMockResponseApi } from "@/@core/mocks/fakerDataResponseApi";
import { GetStudentsUseCase } from "../GetStudentUseCase";


jest.mock('@/@core/services/client-http/client', () => ({
  clientHttp: {
    get: jest.fn(),
  },
}));

jest.mock('@/@core/data/repositories/Students/StudentsRepository');
jest.mock('@/@core/domains/models/student.model');

describe('GetStudentsUseCase', () => {
  let getStudentsUseCase: GetStudentsUseCase;
  let studentsRepository: jest.Mocked<StudentsRepository>;
  let studentModel: jest.Mocked<StudentModel>;
  

  const searchParams: SearchParams = {
    page: 0,
    results: 1,
    inc: 'gender,name,location,email,login,dob,phone,picture,nat',
    gender: 'male',
  };

  const mockStudentsResponse =  fakerWithMockResponseApi

  const mockStudentFullData = mockStudentsResponse.results
  
  class MockStudentModel {
    _props: any;
    constructor(props: any) {
      this._props = props;
    }
    get fullData() {
      return this._props;
    }
    validateProps(props: any) {
      return props;
    }
  }

  beforeEach(() => {
    studentsRepository = new StudentsRepository('http://api.example.com') as jest.Mocked<StudentsRepository>;
    getStudentsUseCase = new GetStudentsUseCase(studentsRepository);
    studentModel = new StudentModel(mockStudentsResponse.results) as jest.Mocked<StudentModel>;

    (studentsRepository.getStudents as jest.Mock).mockResolvedValue(mockStudentsResponse);

    (StudentModel as unknown as jest.Mock).mockImplementation((props) => new MockStudentModel(props));

  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a list of students', async () => {
    const result = await getStudentsUseCase.execute(searchParams);

    expect(studentsRepository.getStudents).toHaveBeenCalledWith(searchParams);
    expect(studentsRepository.getStudents).toHaveBeenCalledTimes(1);

    expect(StudentModel).toHaveBeenCalledWith(mockStudentsResponse.results);
    
    expect(result).toEqual(mockStudentFullData);
  });

  it('should return an empty array when no students are found', async () => {
    (studentsRepository.getStudents as jest.Mock).mockResolvedValue({ results: [] });
    const result = await getStudentsUseCase.execute(searchParams);

    expect(result).toEqual([]);
  });

  it('should throw an error when the repository call fails', async () => {
    (studentsRepository.getStudents as jest.Mock).mockRejectedValue(new Error('Network Error'));

    await expect(getStudentsUseCase.execute(searchParams)).rejects.toThrow('Erro ao buscar os estudantes: Network Error');
  });
});
