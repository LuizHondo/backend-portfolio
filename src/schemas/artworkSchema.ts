import { z } from "zod";

// id, title, slug, summary, cover_image, featured_priority, medium, created_at, updated_at

const artworkSchema = z.object({
            id: z
                .string({ error: (issue) => issue.input === undefined ? "ID is required" : "ID must be a string" })
                .trim()
                .min(6, { message: "ID must be at least 6 characters long" }),
            title: z
                .string({ error: (issue) => issue.input === undefined ? "Title is required" : "Title must be a text" })
                .trim()
                .min(6, { message: "Title must be at least 6 characters long" }),
            slug: z
                .string({ error: (issue) => issue.input === undefined ? "Slug is required" : "Slug must be a string" })
                .trim()
                .min(6, { message: "Slug must be at least 6 characters long" }),
            summary: z
                .string({ error: (issue) => issue.input === undefined ? "Summary is required" : "Summary must be a text" })
                .trim()
                .min(10, { message: "Summary must be at least 10 characters long" }),
            cover_image: z
                .url({ error: (issue) => issue.input === undefined ? "Cover image is required" : "Cover image must be a url" })
                .trim(),
            featured_priority: z
                .number({ error: (issue) => issue.input === undefined ? "Featured priority is required" : "Featured priority must be a number" })
                .int({ message: "Featured priority must be an integer" })
                .positive({ message: "Featured priority must be a positive number" }),
            medium: z
                .string({ error: (issue) => issue.input === undefined ? "Medium is required" : "Medium must be a string" })
                .trim(),
            created_at: z
                .string({ error: (issue) => issue.input === undefined ? "Created at is required" : "Created at must be a string" })
                .trim(),
            updated_at: z
                .string({ error: (issue) => issue.input === undefined ? "Updated at is required" : "Updated at must be a string" })
                .trim()
});
        
export default artworkSchema;