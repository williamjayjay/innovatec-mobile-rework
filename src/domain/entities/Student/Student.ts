import { StudentDTO, UserApiResponse } from "./types/student.type"

class Student {
  id: string
  firstName: string
  lastName: string
  image: string
  email: string
  gender: string
  birthDate: string
  phone: string
  nationality: string
  address: string

  constructor(data: StudentDTO) {
    this.id = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.image = data.image;
    this.email = data.email;
    this.gender = data.gender;
    this.birthDate = data.birthDate;
    this.phone = data.phone;
    this.nationality = data.nationality;
    this.address = data.address;
  }

  getAll(): StudentDTO {
    return this
  }

  static extractDataStudent(array?: UserApiResponse[]): Student[] | [] {
    if (!array || array.length === 0) {
      return [];
    }

    return array.map(user => {
      return new Student({
        id: user.login.uuid,
        firstName: user.name.first,
        lastName: user.name.last,
        image: user.picture.large,
        email: user.email,
        gender: user.gender,
        birthDate: user.dob.date,
        phone: user.phone,
        nationality: user.nat,
        address: `${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country}, ${user.location.postcode}`
      });
    });
  }

}

export {Student};

