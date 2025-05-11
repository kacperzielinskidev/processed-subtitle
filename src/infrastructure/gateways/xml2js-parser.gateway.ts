import { parseStringPromise, ParserOptions } from "xml2js";
import {
  XmlParserGateway,
  ParsedXml,
} from "../../application/ports/xml-parser.gateway";

export class Xml2jsParserGateway implements XmlParserGateway {
  async parse(xmlString: string): Promise<ParsedXml> {
    const parserOptions: ParserOptions = {
      explicitArray: true,
      trim: true,
      explicitRoot: true,
    };

    try {
      const result = await parseStringPromise(xmlString, parserOptions);
      return result as ParsedXml;
    } catch (error) {
      console.error("XML parsing error in Xml2jsParserGateway:", error);
      throw new Error(
        `Failed to parse XML: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }
}
