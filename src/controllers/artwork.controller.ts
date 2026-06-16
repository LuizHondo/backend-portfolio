import type { Request, Response } from "express";
import { mockArtworks } from "../mocks/artwork.mock.js";
import { AppError } from "../utils/AppError.js";

class ArtworkController {
    index(req: Request, res: Response) {
        res.json(mockArtworks);
    }
    show(req: Request, res: Response) {
        const { id } = req.params;
        res.json(mockArtworks.find(artwork => artwork.id === id) || { error: "Obra de arte não encontrada" });
    }
    create(req: Request, res: Response) {
        const {
            id,
            title,
            slug,
            summary,
            cover_image,
            featured_priority,
            medium,
            created_at,
            updated_at
        } = req.body;
        if (!id || !title || !slug || !summary || !cover_image || featured_priority === undefined || !medium || !created_at || !updated_at) {
            throw new AppError("Todos os campos são obrigatórios");
        }
        if (mockArtworks.some(artwork => artwork.id === id)) {
            throw new AppError("Já existe uma obra de arte com esse ID");
        }
        res.status(201).json({ message: "Obra de arte criada com sucesso" });
    }
    update(req: Request, res: Response) {
        const { id } = req.params;
        res.json({ message: `Atualizando a obra de arte com ID ${id}` });
    }
    delete(req: Request, res: Response) {
        const { id } = req.params;
        res.json({ message: `Deletando a obra de arte com ID ${id}` });
    }
}

export { ArtworkController };