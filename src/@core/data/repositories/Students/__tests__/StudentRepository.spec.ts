import { clientHttp } from '@/@core/services/client-http/client';
import { StudentsRepository } from '../StudentsRepository';
import { SearchParams } from '../types/student.type';
import { fakerWithMockResponseApi } from '@/@core/mocks/fakerDataResponseApi';

jest.mock('@/@core/services/client-http/client', () => ({
  clientHttp: {
    get: jest.fn(),
  },
}));

describe('StudentsRepository', () => {
  let studentsRepository: StudentsRepository;

  beforeEach(() => {
    studentsRepository = new StudentsRepository('http://api.example.com');
  });

  it('should be return student data when API responds successfully', async () => {
   
    (clientHttp.get as jest.Mock).mockResolvedValue({ data: fakerWithMockResponseApi });

    const searchParams: SearchParams = {
      page: 0,
      results: 1,
      inc: 'gender,name,location,email,login,dob,phone,picture,nat',
      gender: 'male',
    };

    const data = await studentsRepository.getStudents(searchParams);

    expect(data).toEqual(fakerWithMockResponseApi);
    expect(clientHttp.get).toHaveBeenCalledWith('http://api.example.com', {
      params: searchParams,
    });
  });

  it('should be throw an error when API call fails', async () => {
    (clientHttp.get as jest.Mock).mockRejectedValue(new Error('API Error'));

    const searchParams: SearchParams = {
      page: 0,
      results: 1,
      inc: 'gender,name,location,email,login,dob,phone,picture,nat',
      gender: 'male',
    };

    await expect(studentsRepository.getStudents(searchParams))
      .rejects
      .toThrow('Não foi possível obter os alunos.');
    
    expect(clientHttp.get).toHaveBeenCalledWith('http://api.example.com', {
      params: searchParams,
    });
  });
});
