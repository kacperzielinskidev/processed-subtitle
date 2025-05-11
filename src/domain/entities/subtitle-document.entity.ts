import { SubtitleCue } from "./subtitle-cue.entity";

export interface SubtitleDocument {
  videoId: string;
  language: string;
  cues: SubtitleCue[];
}
