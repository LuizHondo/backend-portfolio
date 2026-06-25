import type { Request, Response } from "express";
import { mockArtworks } from "../mocks/artwork.mock.js";
import { AppError } from "../utils/AppError.js";
import { artworkIdSchema } from "../schemas/index.js";
import { ArtworkService } from "../services/ArtworkService.js";

const artworkService = new ArtworkService();

class ArtworkController {
    index(req: Request, res: Response) {
        res.json(mockArtworks);
    }
    show(req: Request, res: Response) {
        const { id } = artworkIdSchema.parse(req.params);
        const artwork = mockArtworks.find(artwork => artwork.id === id);
        if (!artwork) {
            throw new AppError("Artwork not found", 404);
        }
        res.json(artwork);
    }
    create(req: Request, res: Response) {
        artworkService.create(req, res);
    }
    update(req: Request, res: Response) {
        const { id } = artworkIdSchema.parse(req.params);
        res.json({ message: `Updating the artwork ID ${id}` });
    }
    delete(req: Request, res: Response) {
        const { id } = artworkIdSchema.parse(req.params);
        const artwork = mockArtworks.find(artwork => artwork.id === id);
        if(!artwork){
            throw new AppError("Artwork not found", 404);
        }
        res.json({ message: `Deleting the artwork ID ${id}` });
    }
}

export { ArtworkController };