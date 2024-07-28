import React, { createContext, useCallback, useEffect, useState, type FC } from 'react';
import { IHome } from '../types/home.type';
import { StudentServerEntity } from '@/@core/domains/server-entities/student.server-entity';
import { StudentsRepository } from '@/@core/data/repositories/Students/StudentsRepository';
import { GetStudentsUseCase } from '@/@core/domains/usecases/Student/GetStudentUseCase';
import { FetchNextPageOptions, InfiniteData, InfiniteQueryObserverResult, RefetchOptions, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { SearchParams } from '@/@core/data/repositories/Students/types/student.type';
import { StudentsStorage } from '@/@core/services/students-storage/students-storage.index';

const HomeContext = createContext<IHome.Output>({
  storageDataStudents: [],
  getValuesFromRepository: ({ page, results, gender, inc }: SearchParams) => { },
  isFetchingNextPage: false,
  fetchNextPageCustom: (options?: FetchNextPageOptions | undefined) => { },
  dataStudentsInfinityRoot: undefined,
  refetchCustom: (options?: RefetchOptions | undefined) => { },
  isFetching: false,
  refetchActivated:false
});

const HomeProvider: FC<IHome.Input> = ({ children, appIsLoaded }) => {
  const [storageDataStudents, setStorageDataStudents] = useState<StudentServerEntity[] | [] | null>(null);
  const [refetchActivated, setRefetchActivated] = useState(false);
  
  const studentRepository = new StudentsRepository()

  const getSudentsUseCase = new GetStudentsUseCase(studentRepository);

  const queryClient = useQueryClient();

  const getValuesFromRepository = useCallback(async ({ page, results, gender = 'male', inc = '' }: SearchParams) => {
    console.log('GET XXX3', page)

    try {

      const resultStudentUseCase = await getSudentsUseCase.execute({
        page,
        results,
        inc: inc || 'gender,name,location,email,login,dob,phone,picture,nat',
        gender: gender,
      });

      return resultStudentUseCase
    } catch (error) {
      throw new Error('Não foi possível obter dados dos estudantes.');
    }
  }, []);

  const checkAndSaveStudentsInStorage = useCallback(async (resultStudentUseCase: any | StudentServerEntity[] | IHome.Output['dataStudentsInfinityRoot']) => {

    const savedDataStorageStudents = await StudentsStorage.getAllStudentsStorage();

    if (savedDataStorageStudents) {
      console.log('###### A1')
      return setStorageDataStudents(savedDataStorageStudents)
    }
    console.log('###### A222')

    void await StudentsStorage.addAllStudentsStorage(resultStudentUseCase);
    return
  }, []);

  const { data: dataStudentsInfinityRoot, fetchNextPage, isFetchingNextPage, isLoading, refetch, isFetching, isRefetching } = useInfiniteQuery({

    queryKey: ['students'],
    queryFn: ({ pageParam  }) => getValuesFromRepository({
      page: pageParam,
      results: 10,
      inc: 'gender,name,location,email,login,dob,phone,picture,nat',
      gender: 'male',
      
    }),
    enabled: !!storageDataStudents,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {

      console.log('refetchActivated ---',refetchActivated)
      const nextPage = pages?.length;
      return nextPage
      // return refetchActivated ? undefined : nextPage
    },

  });


  useEffect(() => {
    console.log('appIsLoaded ----->>', appIsLoaded)
    checkAndSaveStudentsInStorage(dataStudentsInfinityRoot?.pages?.flat?.())
  }, [appIsLoaded])

  const refetchCustom = useCallback(async()  => {
    setRefetchActivated(true)

    if (isFetching) return;

    queryClient.setQueryData(['students'], {
      pages: [],
      pageParams: [],
    });

    await refetch()

    setRefetchActivated(false)

    storageDataStudents !== null && setStorageDataStudents(null);

  }, [storageDataStudents, isFetching, refetchActivated]);

  const fetchNextPageCustom = useCallback(async() => {

    if (isFetchingNextPage) return;

    await fetchNextPage()

    storageDataStudents !== null && setStorageDataStudents(null);

  }, [storageDataStudents, isFetchingNextPage]);

  console.log('AAAAAAAAAAAAAAAAAAAAAAA', refetchActivated)

  return (
    <HomeContext.Provider value={{ dataStudentsInfinityRoot, storageDataStudents, isFetchingNextPage, getValuesFromRepository, fetchNextPageCustom, isFetching, refetchCustom, refetchActivated }}>
      {children}
    </HomeContext.Provider>
  );
};

export { HomeContext, HomeProvider }