
import { z } from 'zod';
import { StudentServerEntity, studentRootSchemaValidate } from '../server-entities/student.server-entity';

export class StudentModel {
  private _props: StudentServerEntity[];

  constructor(props: StudentServerEntity[]) {
    this._props = this.validateProps(props);
  }

  get fullData() {
    return this._props
  }

  private validateProps(props: StudentServerEntity[]): StudentServerEntity[] {
    const result = z.array(studentRootSchemaValidate).safeParse(props);

    if (!result.success) {
    
      throw new Error('Invalid properties');
    }

    return result?.data?.map((student) => ({
      ...student,
    }));
  }


}
