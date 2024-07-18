import { __rootEnvTransformed } from "./env.config";

export const rootEnv = __rootEnvTransformed({
    apiUrl: process.env.EXPO_PUBLIC_URL || '',
});

