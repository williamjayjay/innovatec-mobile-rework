import {  __rootEnvTransformed } from '../env.config';
import { InternalException } from '../errors/internalException';

describe('schemaValidate', () => {
  
  it('should return valid environment variables final test', () => {
    const env = { apiUrl: 'https://randomuser.me' };
    
    const result = __rootEnvTransformed(env);

    expect(result).toEqual({ apiUrl: 'https://randomuser.me/' });
  });


  it('should throw InternalException for invalid environment variables', () => {
    const env = { apiUrl: 'invalid-url' };

    expect(() => __rootEnvTransformed(env)).toThrow(InternalException);
  });

  it('should throw InternalException if apiUrl is undefined', () => {
    const env = { apiUrl: undefined };

    expect(() => __rootEnvTransformed(env)).toThrow(InternalException);
  });

});
