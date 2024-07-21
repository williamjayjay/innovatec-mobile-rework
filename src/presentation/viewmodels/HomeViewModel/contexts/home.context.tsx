import React, { createContext, useCallback, useState, type FC } from 'react';
import { IHome } from '../types/home.type';
import { StudentServerEntity } from '@/@core/domains/server-entities/student.server-entity';
import { StudentsRepository } from '@/@core/data/repositories/Students/StudentsRepository';
import { GetStudentsUseCase } from '@/@core/domains/usecases/Student/GetStudentUseCase';

const HomeContext = createContext<IHome.Output>({
  students: [],
  cleanStudents: () => { },
  getValuesFromRepository: () => Promise<void>
});

const HomeProvider: FC<IHome.Input> = ({ children, defaultValue }) => {
  const [students, setStudents] = useState<StudentServerEntity[] | []>(defaultValue);

  const studentRepository = new StudentsRepository('/api')
  
  const getSudentsUseCase = new GetStudentsUseCase(studentRepository);

  const getValuesFromRepository = async () => {
    const resultStudentUseCase = await getSudentsUseCase.execute({
      page: 1,
      results: 1,
      inc: 'gender,name,location,email,login,dob,phone,picture,nat',
      gender: 'male'
    })

    setStudents(resultStudentUseCase)

  }

  const cleanStudents = useCallback(() => {
    setStudents([]);
  }, []);


  return (
    <HomeContext.Provider value={{ students, cleanStudents, getValuesFromRepository }}>
      {children}
    </HomeContext.Provider>
  );
};

export { HomeContext, HomeProvider }