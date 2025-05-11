import { Router } from "express";
import { SubtitleController } from "../../../interfaces/controllers/subtitle.controller";
import { ProcessXmlSubtitlesUseCase } from "../../../application/use-cases/process-xml-subtitles.use-case";
import { Xml2jsParserGateway } from "../../gateways/xml2js-parser.gateway";

const subtitleRouter = Router();

const xmlParserGateway = new Xml2jsParserGateway();
const processXmlSubtitlesUseCase = new ProcessXmlSubtitlesUseCase(
  xmlParserGateway
);
const subtitleController = new SubtitleController(processXmlSubtitlesUseCase);

subtitleRouter.post("/", subtitleController.handleUploadSubtitles);
subtitleRouter.get("/", subtitleController.handleGetSubtitles);

export { subtitleRouter };
