export interface Memory {
  month: string;
  date: string;
  title: string;
  story: string;
  quote?: string;
  images: string[];
  caption?: string;
  captions?: string[];
}

export interface AnniversaryConfig {
  anniversaryDate: string;
  anniversaryDateFormatted: string;
  heroTitle: string;
  heroSubtitle: string;
  heroButtonText: string;
  musicPath: string;
}

export interface Statistic {
  value: number | string;
  label: string;
  suffix?: string;
}

export interface LoveLetterData {
  salutation?: string;
  paragraphs: string[];
  closing?: string;
  signature?: string;
  finalLine?: string;
}

export interface LightboxState {
  isOpen: boolean;
  images: string[];
  currentIndex: number;
  monthTitle: string;
  monthDate: string;
  captions?: string[];
}
