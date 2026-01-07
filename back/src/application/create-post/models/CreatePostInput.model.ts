import { z } from 'zod';

export const CreatePostRequestSchema = z.object({
  content: z.string()
    .trim()
    .min(1, { message: "Content must not be empty." }),
  // user_uuid and user_name injected from context, not client-provided body
});

export type CreatePostRequest = z.infer<typeof CreatePostRequestSchema>;

export interface Post {
  id: string;
  content: string;
  created_at: Date;
  user_uuid: string;
  user_name: string;
}

/**
 * DTO passed into the use-case (middleware will inject these from the logged-in user).
 */
export interface CreatePostDTO {
  content: string;
  user_uuid: string;
  user_name: string;
}
