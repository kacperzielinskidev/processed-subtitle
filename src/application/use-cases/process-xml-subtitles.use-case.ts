import { SubtitleCue } from "../../domain/entities/subtitle-cue.entity";
import { InvalidFormatError } from "../../domain/errors/invalid-format.error";
import { MissingDataError } from "../../domain/errors/missing-data.error";
import { timeToMs } from "../../infrastructure/utils/time-converter";
import {
  XmlParserGateway,
  ParsedXml,
  XmlCueElement,
} from "../ports/xml-parser.gateway";

export const inMemorySubtitleStore: Map<string, SubtitleCue[]> = new Map();

export class ProcessXmlSubtitlesUseCase {
  constructor(private readonly xmlParserGateway: XmlParserGateway) {}

  async execute(
    xmlString: string
  ): Promise<{ videoId: string; language: string; cues: SubtitleCue[] }> {
    if (!xmlString || xmlString.trim() === "") {
      throw new MissingDataError("No XML data received or empty.");
    }

    let parsedXml: ParsedXml;
    try {
      parsedXml = await this.xmlParserGateway.parse(xmlString);
    } catch (error: any) {
      throw new InvalidFormatError("Failed to parse XML string.", error);
    }

    if (!parsedXml.subtitles) {
      throw new InvalidFormatError(
        "Invalid XML structure: <subtitles> root missing."
      );
    }

    const { video_id: videoId, lang: language } = parsedXml.subtitles.$;
    if (!videoId || !language) {
      throw new MissingDataError(
        "XML <subtitles> root must have 'video_id' and 'lang' attributes."
      );
    }

    const xmlCues: XmlCueElement[] | undefined = parsedXml.subtitles.cue;
    if (!xmlCues || !Array.isArray(xmlCues) || xmlCues.length === 0) {
      const processedData = { videoId, language, cues: [] };
      const storeKey = `${videoId}_${language}`;
      inMemorySubtitleStore.set(storeKey, processedData.cues);
      console.log(`Saved (empty) subtitles to memory for key: ${storeKey}`);
      return processedData;
    }

    const cues: SubtitleCue[] = [];
    for (const xmlCue of xmlCues) {
      const { start_time: startTimeStr, end_time: endTimeStr } = xmlCue.$;
      const textContent: string | null =
        xmlCue.text && xmlCue.text.length > 0 ? xmlCue.text[0] : null;

      if (!startTimeStr || !endTimeStr || textContent === null) {
        console.warn(
          `Skipping cue due to missing attributes or text: ${JSON.stringify(
            xmlCue.$
          )}`
        );
        continue;
      }

      const startTimeMs = timeToMs(startTimeStr);
      const endTimeMs = timeToMs(endTimeStr);

      if (startTimeMs === null || endTimeMs === null) {
        throw new InvalidFormatError(
          `Invalid time format in cue: start='${startTimeStr}', end='${endTimeStr}'`
        );
      }

      cues.push({
        startTimeMs,
        endTimeMs,
        text: textContent.trim(),
      });
    }

    const processedData = { videoId, language, cues };

    const storeKey = `${videoId}_${language}`;
    inMemorySubtitleStore.set(storeKey, processedData.cues);
    console.log(
      `Saved subtitles to memory for key: ${storeKey}`,
      processedData.cues
    );

    return processedData;
  }
}
