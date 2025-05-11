import { Request, Response, NextFunction } from "express";
import {
  ProcessXmlSubtitlesUseCase,
  inMemorySubtitleStore,
} from "../../application/use-cases/process-xml-subtitles.use-case";
import { SubtitleCue } from "../../domain/entities/subtitle-cue.entity";

export class SubtitleController {
  constructor(
    private readonly processXmlSubtitlesUseCase: ProcessXmlSubtitlesUseCase
  ) {}

  public handleUploadSubtitles = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (!req.is("application/xml") && !req.is("text/xml")) {
        res
          .status(415)
          .json({ error: "Unsupported Media Type. Expecting XML." });
        return;
      }
      const xmlData: string = req.body as string;

      const processedData = await this.processXmlSubtitlesUseCase.execute(
        xmlData
      );

      console.log(
        "Received and processed subtitles (Controller - POST):",
        processedData
      );

      res.status(200).json({
        message: "Subtitles received, processed, and stored in memory.",
        videoId: processedData.videoId,
        lang: processedData.language,
        count: processedData.cues.length,
        subtitles: processedData.cues,
      });
    } catch (error) {
      next(error);
    }
  };

  public handleGetSubtitles = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const videoId = req.query.videoId as string;
      const language = req.query.lang as string;

      if (!videoId || !language) {
        res
          .status(400)
          .json({ error: "Missing videoId or lang query parameters." });
        return;
      }

      const storeKey = `${videoId}_${language}`;
      const subtitles: SubtitleCue[] | undefined =
        inMemorySubtitleStore.get(storeKey);

      if (subtitles) {
        console.log(`Fetching subtitles from memory for key: ${storeKey}`);
        res.status(200).json({
          videoId,
          language,
          count: subtitles.length,
          subtitles,
        });
      } else {
        console.log(`Subtitles not found in memory for key: ${storeKey}`);
        res.status(404).json({
          message: "Subtitles not found for the given videoId and language.",
        });
      }
    } catch (error) {
      next(error);
    }
  };
}
