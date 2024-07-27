import { ReactNode } from 'react';
import { StudentServerEntity } from '@/@core/domains/server-entities/student.server-entity';
import { SearchParams } from '@/@core/data/repositories/Students/types/student.type';
import { FetchNextPageOptions, InfiniteQueryObserverResult, InfiniteData, RefetchOptions } from '@tanstack/react-query';

export namespace IHome {
  export interface Input {
    children: ReactNode;
    defaultValue: StudentServerEntity[] | [];
  }

  export interface Output {
    students: StudentServerEntity[] | [];
    storageDataStudents: StudentServerEntity[] | [];
    cleanStudents: () => void;
    getValuesFromRepository: ({ page, results, gender, inc }: SearchParams) => void;
    isFetchingNextPage:boolean;
    fetchNextPage:(options?: FetchNextPageOptions | undefined) => any;
    dataStudentsInfinity: InfiniteData<StudentServerEntity[]> | undefined;
    refetch:(options?: RefetchOptions | undefined) => any;
    isFetching:boolean;
  }
}
