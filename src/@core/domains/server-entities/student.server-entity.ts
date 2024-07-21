import { z } from 'zod';
import { studentGenderEnumArray } from '../enums/student.enum';

const studentUserNameSchema = z.object({
  title: z.string(),
  first: z.string(),
  last: z.string(),
});

const studentLocationStreetSchema = z.object({
  number: z.number(),
  name: z.string(),
});

const studentLocationCoordinatesSchema = z.object({
  latitude: z.string(),
  longitude: z.string(),
});


const studentLocationTimezoneSchema = z.object({
  offset: z.string(),
  description: z.string(),
});

const studentLocationSchema = z.object({
  street: studentLocationStreetSchema,
  city: z.string(),
  state: z.string(),
  country: z.string(),
  postcode: z.union([z.number(), z.string()]),
  coordinates: studentLocationCoordinatesSchema,
  timezone: studentLocationTimezoneSchema
});

const studentLoginSchema = z.object({
  uuid: z.string(),
  username: z.string(),
  password: z.string(),
  salt: z.string(),
  md5: z.string(),
  sha1: z.string(),
  sha256: z.string()
});

const studentDobSchema = z.object({
  age: z.number(),
  date: z.string()
});

const studentPictureSchema = z.object({
  large: z.string(),
  medium: z.string(),
  thumbnail: z.string()
});

const studentRootSchemaValidate = z.object({
  gender: z.enum(studentGenderEnumArray),
  name: studentUserNameSchema,
  location: studentLocationSchema,
  email: z.string(),
  login: studentLoginSchema,
  dob: studentDobSchema,
  phone: z.string(),
  picture: studentPictureSchema,
  nat: z.string(),
});

const studentAPInfoSchema = z.object({
  seed: z.string(),
  results: z.number(),
  page: z.number(),
  version: z.string(),
});

// usados pelo repository
type StudentServerEntityResultsApi = z.input<typeof studentRootSchemaValidate>;
type StudentServerEntityInfoApi = z.input<typeof studentAPInfoSchema>;
// usados pelo repository end --

type StudentServerEntity = z.input<typeof studentRootSchemaValidate>;

export { StudentServerEntity, studentRootSchemaValidate, StudentServerEntityResultsApi, StudentServerEntityInfoApi }