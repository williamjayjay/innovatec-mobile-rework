import React, { createContext, useCallback, useEffect, useState, type FC } from 'react';
import { IHome } from '../types/home.type';
import { StudentServerEntity } from '@/@core/domains/server-entities/student.server-entity';
import { StudentsRepository } from '@/@core/data/repositories/Students/StudentsRepository';
import { GetStudentsUseCase } from '@/@core/domains/usecases/Student/GetStudentUseCase';
import { FetchNextPageOptions, InfiniteData, InfiniteQueryObserverResult, RefetchOptions, useInfiniteQuery } from '@tanstack/react-query';
import { SearchParams } from '@/@core/data/repositories/Students/types/student.type';

const HomeContext = createContext<IHome.Output>({
  students: [],
  storageDataStudents: [],
  cleanStudents: () => { },
  getValuesFromRepository: ({ page, results, gender, inc }: SearchParams) => { },
  isFetchingNextPage: false,
  fetchNextPage: (options?: FetchNextPageOptions | undefined) => { },
  dataStudentsInfinity: undefined,
  refetch: (options?: RefetchOptions | undefined) => { },
  isFetching: false
});

const HomeProvider: FC<IHome.Input> = ({ children, defaultValue }) => {
  const [students, setStudents] = useState<StudentServerEntity[] | []>(defaultValue);
  const [storageDataStudents, setStorageDataStudents] = useState<StudentServerEntity[] | []>(defaultValue);

  const studentRepository = new StudentsRepository()

  const getSudentsUseCase = new GetStudentsUseCase(studentRepository);

  const getValuesFromRepository = useCallback(async ({ page, results, gender = 'male', inc = '' }: SearchParams) => {

    console.log('STEP ONE', page)
    try {

      const resultStudentUseCase = await getSudentsUseCase.execute({
        page,
        results,
        inc: inc || 'gender,name,location,email,login,dob,phone,picture,nat',
        gender: gender,
      });

      setStudents(resultStudentUseCase)

      return resultStudentUseCase
    } catch (error) {
      throw new Error('Não foi possível obter dados dos estudantes.');
    }
  }, [setStudents]);


  const cleanStudents = useCallback(() => {
    setStudents([]);
  }, []);

  const { data: dataStudentsInfinity, fetchNextPage, isFetchingNextPage, isLoading, refetch, isFetching } = useInfiniteQuery({

    queryKey: ['students'],
    queryFn: ({ pageParam }) => getValuesFromRepository({
      page: pageParam,
      results: 10,
      inc: 'gender,name,location,email,login,dob,phone,picture,nat',
      gender: 'male',
    }),
    enabled: true,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      return pages?.length
    }

  });

  console.log('isFetching --xyz- ', isFetching)

  return (
    <HomeContext.Provider value={{ dataStudentsInfinity, students, storageDataStudents, isFetchingNextPage, cleanStudents, getValuesFromRepository, fetchNextPage, isFetching, refetch }}>
      {children}
    </HomeContext.Provider>
  );
};

export { HomeContext, HomeProvider }