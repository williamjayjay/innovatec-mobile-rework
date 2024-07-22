import React, { createContext, useCallback, useEffect, useState, type FC } from 'react';
import { IHome } from '../types/home.type';
import { StudentServerEntity } from '@/@core/domains/server-entities/student.server-entity';
import { StudentsRepository } from '@/@core/data/repositories/Students/StudentsRepository';
import { GetStudentsUseCase } from '@/@core/domains/usecases/Student/GetStudentUseCase';
import { useInfiniteQuery } from '@tanstack/react-query';
import { SearchParams } from '@/@core/data/repositories/Students/types/student.type';

const HomeContext = createContext<IHome.Output>({
  students: [],
  cleanStudents: () => { },
  getValuesFromRepository: () => Promise<void>
});

const HomeProvider: FC<IHome.Input> = ({ children, defaultValue }) => {
  const [students, setStudents] = useState<StudentServerEntity[] | []>(defaultValue);

  const studentRepository = new StudentsRepository()
  
  const getSudentsUseCase = new GetStudentsUseCase(studentRepository);

  const getValuesFromRepository = useCallback(async ({ page = 0, results = 1, gender='male',inc = '' }:SearchParams) => {
    try {
  
      const resultStudentUseCase = await getSudentsUseCase.execute({
        page,
        results,
        inc: inc || 'gender,name,location,email,login,dob,phone,picture,nat',
        gender:gender ,
      });
  
      setStudents(resultStudentUseCase)
    } catch (error) {
      throw new Error('Não foi possível obter dados dos estudantes.');
    }
  }, []);


  const cleanStudents = useCallback(() => {
    setStudents([]);
  }, []);

  const { data, fetchNextPage, isFetchingNextPage, isLoading, refetch, } = useInfiniteQuery({

    queryKey: ['students'],
    queryFn: ({ pageParam }) => getValuesFromRepository({
      page: pageParam,
      results: 1,
      inc: 'gender,name,location,email,login,dob,phone,picture,nat',
      gender: 'male',
    }),
    enabled: true,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      return pages?.length
    }

  });

  console.log('isLoading', isLoading)

  return (
    <HomeContext.Provider value={{ students, cleanStudents, getValuesFromRepository }}>
      {children}
    </HomeContext.Provider>
  );
};

export { HomeContext, HomeProvider }