import { ReactNode } from 'react';
import { StudentServerEntity } from '@/@core/domains/server-entities/student.server-entity';
import { SearchParams } from '@/@core/data/repositories/Students/types/student.type';
import { FetchNextPageOptions, InfiniteQueryObserverResult, InfiniteData, RefetchOptions } from '@tanstack/react-query';

export namespace IHome {
  export interface Input {
    children: ReactNode;
    appIsLoaded: boolean
  }

  export interface Output {
    storageDataStudents: StudentServerEntity[] | [] | null;
    getValuesFromRepository: ({ page, results, gender, inc }: SearchParams) => void;
    isFetchingNextPage:boolean;
    fetchNextPageCustom:(options?: FetchNextPageOptions | undefined) => any;
    dataStudentsInfinityRoot: InfiniteData<StudentServerEntity[]> | undefined | StudentServerEntity[] | any;
    refetchCustom:(options?: RefetchOptions | undefined) => any;
    isFetching:boolean;
    refetchActivated:boolean;
    
  }
}
