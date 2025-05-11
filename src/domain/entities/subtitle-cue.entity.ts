export interface SubtitleCue {
  startTimeMs: number;
  endTimeMs: number;
  text: string;
}

export type ProcessedSubtitle = SubtitleCue;
