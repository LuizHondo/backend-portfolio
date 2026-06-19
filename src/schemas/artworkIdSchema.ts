import { z } from "zod";

const artworkIdSchema = z.object({
    id: z.string({ error: (issue) => issue.input === undefined ? "ID is required" : "ID must be a string" }).trim().min(6, { message: "ID must be at least 6 characters long" })
});

export default artworkIdSchema;