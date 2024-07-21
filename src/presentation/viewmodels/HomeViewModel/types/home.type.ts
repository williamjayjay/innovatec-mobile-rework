import { ReactNode } from 'react';
import { StudentServerEntity } from '@/@core/domains/server-entities/student.server-entity';

export namespace IHome {
  export interface Input {
    children: ReactNode;
    defaultValue: StudentServerEntity[] | [];
  }

  export interface Output {
    students: StudentServerEntity[] | [];
    cleanStudents: () => void;
    getValuesFromRepository: any
  }
}
