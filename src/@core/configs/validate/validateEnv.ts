import { z } from 'zod';

const MESSAGE_ERROR_VALIDATE_ENV = '.env variable EXPO_PUBLIC_URL_INNOVATEC is required (Ex. https://randomuser.me)'

const schemaValidate = z.object({
    apiUrl: z.string({
        required_error: MESSAGE_ERROR_VALIDATE_ENV,
    }).url({
        message: MESSAGE_ERROR_VALIDATE_ENV,
    })
});

export {schemaValidate, MESSAGE_ERROR_VALIDATE_ENV}