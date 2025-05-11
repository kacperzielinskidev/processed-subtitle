import { Router } from "express";
import { subtitleRouter } from "./subtitle.routes";

const mainRouter = Router();

mainRouter.use("/api/subtitles", subtitleRouter);

export { mainRouter };
