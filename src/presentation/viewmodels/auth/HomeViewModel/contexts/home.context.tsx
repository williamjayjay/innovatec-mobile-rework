import React, { createContext, useCallback, useEffect, useState, type FC } from 'react';
import { IHome } from '../types/home.type';
import { StudentServerEntity } from '@/@core/domains/server-entities/student.server-entity';
import { StudentsRepository } from '@/@core/data/repositories/Students/StudentsRepository';
import { GetStudentsUseCase } from '@/@core/domains/usecases/Student/GetStudentUseCase';
import { FetchNextPageOptions, RefetchOptions, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { Gender, SearchParams } from '@/@core/data/repositories/Students/types/student.type';
import { StudentsStorage } from '@/@core/services/students-storage/students-storage.index';

const HomeContext = createContext<IHome.Output>({
  storageDataStudents: [],
  getValuesFromRepository: ({ page, results, gender, inc }: SearchParams) => { },
  isFetchingNextPage: false,
  fetchNextPageCustom: (options?: FetchNextPageOptions | undefined) => { },
  dataStudentsInfinityRoot: undefined,
  refetchCustom: (options?: RefetchOptions | undefined) => { },
  isFetching: false,
  filterByGender: "",
  setFilterByGender: () => { }
});

const HomeProvider: FC<IHome.Input> = ({ children, appIsLoaded }) => {
  const [storageDataStudents, setStorageDataStudents] = useState<StudentServerEntity[] | [] | null>(null);
  const [filterByGender, setFilterByGender] = useState<Gender>("");

  const studentRepository = new StudentsRepository()
  const getSudentsUseCase = new GetStudentsUseCase(studentRepository);

  const queryClient = useQueryClient();

  const getValuesFromRepository = useCallback(async ({ page, results, gender = 'male', inc = '' }: SearchParams) => {
    try {

      const resultStudentUseCase = await getSudentsUseCase.execute({
        page,
        results,
        inc: inc || 'gender,name,location,email,login,dob,phone,picture,nat',
        gender: gender,
      });

      if (!storageDataStudents) {
        setStorageDataStudents(resultStudentUseCase)
         await StudentsStorage.addAllStudentsStorage(resultStudentUseCase);
      }

      return resultStudentUseCase
    } catch (error) {
      throw new Error('Não foi possível obter dados dos estudantes.');
    }
  }, [storageDataStudents, appIsLoaded]);


  const { data: dataStudentsInfinityRoot, fetchNextPage, isFetchingNextPage, refetch, isFetching } = useInfiniteQuery({

    queryKey: ['students', filterByGender],
    queryFn: ({ pageParam }) => getValuesFromRepository({
      page: pageParam,
      results: 10,
      inc: 'gender,name,location,email,login,dob,phone,picture,nat',
      gender: filterByGender,

    }),
    enabled: false,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {

      const nextPage = pages?.length;
      return nextPage
    },

  });

  const checkAndSaveStudentsInStorage = useCallback(async () => {

    const savedDataStorageStudents = await StudentsStorage.getAllStudentsStorage();


    if (savedDataStorageStudents?.[0]) {
      return setStorageDataStudents(savedDataStorageStudents)
    }

    await refetch()

  }, [appIsLoaded]);

  useEffect(() => {
    checkAndSaveStudentsInStorage()
  }, [appIsLoaded])

  const refetchCustom = useCallback(async () => {

    if (isFetching) return;

    queryClient.setQueryData(['students', filterByGender], {
      pages: [],
      pageParams: [],
    });

    await refetch()

  }, [isFetching, filterByGender]);

  const fetchNextPageCustom = useCallback(async () => {

    if (isFetchingNextPage) return;

    if(!dataStudentsInfinityRoot?.pages){
      await refetch()
    }

    await fetchNextPage()

  }, [isFetchingNextPage, dataStudentsInfinityRoot]);


  return (
    <HomeContext.Provider value={{ dataStudentsInfinityRoot, storageDataStudents, isFetchingNextPage, getValuesFromRepository, fetchNextPageCustom, isFetching, refetchCustom, filterByGender, setFilterByGender }}>
      {children}
    </HomeContext.Provider>
  );
};

export { HomeContext, HomeProvider }