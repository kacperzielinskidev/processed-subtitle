export interface XmlCueAttributes {
  start_time: string;
  end_time: string;
}

export interface XmlCueElement {
  $: XmlCueAttributes;
  text?: string[];
}

export interface XmlSubtitlesRootAttributes {
  video_id: string;
  lang: string;
}

export interface ParsedXml {
  subtitles: {
    $: XmlSubtitlesRootAttributes;
    cue?: XmlCueElement[];
  };
}

export interface XmlParserGateway {
  parse(xmlString: string): Promise<ParsedXml>;
}
