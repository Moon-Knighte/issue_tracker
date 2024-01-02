import { z } from 'zod';

//we can now validate the body of schema using zod
export const createIssueSchema = z.object({
    title: z.string().min(1, "Title is required.").max(255),
    description: z.string().min(1, "Description is required.")
});
