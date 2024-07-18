import { studentData } from "@/mocks/mockEntity";
import { mockResponseApi } from "@/mocks/mockResponseApi";
import { Student } from "@/domain/entities/Student/Student";

describe('Student', () => {

  describe('constructor', () => {
    it('should be create an instance of Student with the given data', () => {
      const student = new Student(studentData);
      expect(student.id).toBe(studentData.id);
      expect(student.firstName).toBe(studentData.firstName);
      expect(student.lastName).toBe(studentData.lastName);
      expect(student.image).toBe(studentData.image);
      expect(student.email).toBe(studentData.email);
      expect(student.gender).toBe(studentData.gender);
      expect(student.birthDate).toBe(studentData.birthDate);
      expect(student.phone).toBe(studentData.phone);
      expect(student.nationality).toBe(studentData.nationality);
      expect(student.address).toBe(studentData.address);
    });
  });

  describe('getAll', () => {

    it('must return all student data', () => {
      const student = new Student(studentData);
      expect(student.getAll()).toEqual(studentData);
    });
  });

  describe('extractDataStudent', () => {
    it('should be return a list of Student instances when given a valid array', () => {

      const apiResponse = mockResponseApi.results

      const result = Student.extractDataStudent(apiResponse);
      expect(result).toHaveLength(1);
      expect(result[0]).toBeInstanceOf(Student);
      expect(result[0].id).toBe(apiResponse[0].login.uuid);
      expect(result[0].firstName).toBe(apiResponse[0].name.first);
      expect(result[0].lastName).toBe(apiResponse[0].name.last);
      expect(result[0].image).toBe(apiResponse[0].picture.large);
      expect(result[0].email).toBe(apiResponse[0].email);
      expect(result[0].gender).toBe(apiResponse[0].gender);
      expect(result[0].birthDate).toBe(apiResponse[0].dob.date);
      expect(result[0].phone).toBe(apiResponse[0].phone);
      expect(result[0].nationality).toBe(apiResponse[0].nat);
      expect(result[0].address).toBe(
        `${apiResponse[0].location.street.number} ${apiResponse[0].location.street.name}, ${apiResponse[0].location.city}, ${apiResponse[0].location.state}, ${apiResponse[0].location.country}, ${apiResponse[0].location.postcode}`
      );
    });
   
    it('should be return an empty list when given an empty array', () => {
      const result = Student.extractDataStudent([]);
      expect(result).toEqual([]);
    });

    it('should be return an empty list when given an undefined', () => {
      const result = Student.extractDataStudent(undefined);
      expect(result).toEqual([]);
    });
  });
});
