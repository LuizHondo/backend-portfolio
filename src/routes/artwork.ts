import { Router } from "express";
import { ArtworkController } from "../controllers/artwork.controller.js";

const artworkRoutes = Router();
const artworkController = new ArtworkController();

artworkRoutes.get("/", artworkController.index);
artworkRoutes.get("/:id", artworkController.show);
artworkRoutes.post("/", artworkController.create);
artworkRoutes.put("/:id", artworkController.update);
artworkRoutes.delete("/:id", artworkController.delete);

export default artworkRoutes;