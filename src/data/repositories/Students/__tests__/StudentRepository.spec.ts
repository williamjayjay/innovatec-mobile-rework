import { Student } from "@/domain/entities/Student/Student";
import { clientHttp } from "@/@core/services/client-http/client";
import { StudentsRepository } from "../StudentsRepository";
import { mockResponseApi } from "@/mocks/mockResponseApi";

jest.mock("@/@core/services/client-http/client", () => ({
  clientHttp: {
    get: jest.fn(),
  },
}));

describe('StudentsRepository', () => {
  let studentsRepository: StudentsRepository;
  const apiUrl = '/api';

  beforeEach(() => {
    studentsRepository = new StudentsRepository(apiUrl);
  });

  it('should be return a list of students when the API responds successfully', async () => {

    (clientHttp.get as jest.Mock).mockResolvedValue({ data: mockResponseApi });

    const result = await studentsRepository.getStudents({ page: 0, results: 10, include: 'gender,name,location,email,login,dob,phone,picture,nat', gender: 'male' });

    expect(result).toHaveLength(1);
    expect(result[0]).toBeInstanceOf(Student);
    expect(result[0].email).toBe('john.doe@example.com');
  });

  it('should be return an empty list when the API does not respond with data', async () => {
    (clientHttp.get as jest.Mock).mockResolvedValue({ data: { results: [] } });

    const result = await studentsRepository.getStudents({ page: 0, results: 10, include: 'gender,name,location,email,login,dob,phone,picture,nat', gender: 'male' });

    expect(result).toEqual([]);
  });

    it('should be throw an error when the request fails', async () => {
    (clientHttp.get as jest.Mock).mockRejectedValue(new Error('Erro na API'));

    await expect(studentsRepository.getStudents({ page: 0, results: 10, include: 'gender,name,location,email,login,dob,phone,picture,nat', gender: 'male' })).rejects.toThrow('Não foi possível obter os alunos.');
  });
});
