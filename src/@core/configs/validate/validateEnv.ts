import { z } from 'zod';

const schemaValidate = z.object({
    apiUrl: z.string().url({
        message:
            '.env variable EXPO_PUBLIC_URL is required (Ex. https://randomuser.me)',
    }),
});

export {schemaValidate}