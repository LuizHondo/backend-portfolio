import type { Request, Response } from "express";
import { mockArtworks } from "../mocks/artwork.mock.js";
import { AppError } from "../utils/AppError.js";
import { artworkSchema } from "../schemas/index.js";

class ArtworkService { 
    create(req: Request, res: Response) {
    const { id, title, featured_priority, medium, created_at, updated_at } = artworkSchema.parse(req.body);
    if (mockArtworks.some(artwork => artwork.id === id)) {
        throw new AppError("An artwork with this ID already exists");
    }
    res.status(201).json({ message: "Artwork created successfully" });

    }


}

export { ArtworkService };
