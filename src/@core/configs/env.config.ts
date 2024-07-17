import { InternalException } from './errors/internalException';
import { transformError } from './errors/transformError';
import { checkLastBar } from './utils/utils.config';
import { schemaValidate } from './validate/validateEnv';

const __rootEnvTransformed = (env: { apiUrl: string | undefined }) => {
    const response = schemaValidate
        .transform((data) => {
            return {
                apiUrl: checkLastBar(data.apiUrl),
            };
        })
        .safeParse(env);

    if (response.success) {
        return Object.freeze(response.data);
    }

    const msg = transformError(
        Array.isArray(response.error) ? response.error[0] : response.error,
    );
    throw new InternalException(msg, 500);
};

const rootEnv = __rootEnvTransformed({
    apiUrl: process.env.EXPO_PUBLIC_URL,
});

export { rootEnv }
