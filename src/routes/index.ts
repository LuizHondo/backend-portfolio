import { Router } from "express";
import artworkRoutes from "./artwork.js";

const routes = Router();

routes.use("/artwork", artworkRoutes);

export default routes;