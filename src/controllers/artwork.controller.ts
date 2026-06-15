import type { Request, Response } from "express";

class ArtworkController {
    index(req: Request, res: Response) {
        res.json({ message: "Obtendo todas as obras de arte" });
    }
    show(req: Request, res: Response) {
        const { id } = req.params;
        res.json({ message: `Obtendo a obra de arte com ID ${id}` });
    }
    create(req: Request, res: Response) {
        res.json({ message: "Criando uma nova obra de arte" });
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