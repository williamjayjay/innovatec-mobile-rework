import { StudentServerEntity } from '@/@core/domains/server-entities/student.server-entity';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class StudentsStorage {
  static keyStudents = '@Innovatec:students';

  static async addAllStudentsStorage(dataStudents: StudentServerEntity[]): Promise<void> {
    try {
      const jsonValue = JSON.stringify(dataStudents);
      await AsyncStorage.setItem(StudentsStorage.keyStudents, jsonValue);
    } catch (e) {
      console.error('Falha ao salvar dados no armazenamento local.', e);
    }
  }

  static async getAllStudentsStorage(): Promise<StudentServerEntity[] | null> {
    const jsonValue = await AsyncStorage.getItem(StudentsStorage.keyStudents);

    if (jsonValue) {
      return JSON.parse(jsonValue)
    }

    return null;
  }

  static async clear(): Promise<void> {
    try {
      await AsyncStorage.removeItem(StudentsStorage.keyStudents);
    } catch (e) {
      console.error('Falha ao remover dados no armazenamento local.', e);
    }
  }

}
