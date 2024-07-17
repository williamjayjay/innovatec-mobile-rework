import { z } from 'zod';

const transformError = (error: any) => {
    if (error instanceof z.ZodError) {
        return error.issues.map(issue => issue.message).join(', ');
    }
    return 'An unknown error occurred';
};

export {transformError}