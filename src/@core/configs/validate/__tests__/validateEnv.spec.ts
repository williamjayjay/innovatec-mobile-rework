import { MESSAGE_ERROR_VALIDATE_ENV, schemaValidate } from "../validateEnv";

describe('SchemaValidateEnv', () => {

  it('should validate a correct URL', () => {
    const validUrl = { apiUrl: 'https://randomuser.me' };
    const result = schemaValidate.safeParse(validUrl);
    expect(result.success).toBe(true);
  });

  it('should invalidate an incorrect URL', () => {
    const invalidUrl = { apiUrl: 'invalid-url' };
    const result = schemaValidate.safeParse(invalidUrl);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe(MESSAGE_ERROR_VALIDATE_ENV);
    }
  });

  it('should invalidate an undefined URL', () => {
    const undefinedUrl = { apiUrl: undefined };
    const result = schemaValidate.safeParse(undefinedUrl);

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.errors[0].message).toBe(MESSAGE_ERROR_VALIDATE_ENV);
    }
  });
});
