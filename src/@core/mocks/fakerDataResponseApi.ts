import { faker } from '@faker-js/faker';
import { StudentServerEntity, studentRootSchemaValidate } from '@/@core/domains/server-entities/student.server-entity';
import { StudentResponseApi } from '@/@core/data/repositories/Students/types/student.type';


function createMockUser(): StudentServerEntity {
  // Gerar dados mockados
  const mockUser: StudentServerEntity = {
    dob: {
      age: faker.number.int({ min: 18, max: 99 }),
      date: faker.date.past().toISOString(),
    },
    email: faker.internet.email(),
    gender: faker.helpers.arrayElement(['male', 'female']),
    location: {
      city: faker.location.city(),
      coordinates: {
        latitude: faker.location.latitude().toString(),
        longitude: faker.location.longitude().toString(),
      },
      country: faker.location.country(),
      postcode: faker.helpers.arrayElement([faker.location.zipCode(), faker.number.int({ min: 1000, max: 9999 })]),
      state: faker.location.state(),
      street: {
        number: faker.number.int({ min: 1, max: 9999 }),
        name: faker.location.street(),
      },
      timezone: {
        offset: faker.location.timeZone(),
        description: faker.lorem.sentence(),
      },
    },
    login: {
      md5: faker.string.hexadecimal({ length: 32, casing: 'lower' }),
      password: faker.internet.password(),
      salt: faker.string.alphanumeric(8),
      sha1: faker.string.hexadecimal({ length: 40, casing: 'lower' }),
      sha256: faker.string.hexadecimal({ length: 64, casing: 'lower' }),
      username: faker.internet.userName(),
      uuid: faker.string.uuid(),
    },
    name: {
      first: faker.person.firstName(),
      last: faker.person.lastName(),
      title: faker.helpers.arrayElement(['Mr', 'Ms', 'Mrs']),
    },
    nat: faker.location.countryCode(),
    phone: faker.phone.number(),
    picture: {
      large: faker.image.avatar(),
      medium: faker.image.avatar(),
      thumbnail: faker.image.avatar(),
    },
  };

  // Validar os dados mockados
  const result = studentRootSchemaValidate.safeParse(mockUser);

  if (!result.success) {
    throw new Error('Invalid properties');
  }

  return result.data;
}

const fakerMockStudentData: StudentServerEntity[] = Array.from({ length: 2 }, createMockUser);

const fakerWithMockResponseApi: StudentResponseApi =
{
    results: fakerMockStudentData,
    info: {
        seed: "",
        results: 0,
        page: 0,
        version: ""
    }
}

export { fakerMockStudentData, fakerWithMockResponseApi, createMockUser };
