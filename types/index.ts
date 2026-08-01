export type ProjectCategory = 'web' | 'mobile' | 'bot' | 'mini-app' | 'design';

export interface ProjectScreenshot {
  src: string;
  alt: string;
}

export interface Project {
  id: string;
  slug: string;
  category: ProjectCategory;
  client: string;
  duration: string;
  stack: string[];
  summary: string;
  architecture: string;
  challenges: string[];
  screenshots: ProjectScreenshot[];
}

export interface ServiceItem {
  key: string;
  icon: string;
}

export interface ProcessStep {
  step: number;
  icon: string;
}

export interface EstimatorFeature {
  key: string;
  priceMin: number;
  priceMax: number;
  weeks: number;
}

export interface EstimatorProjectType {
  key: string;
  priceMin: number;
  priceMax: number;
  weeksMin: number;
  weeksMax: number;
}

export interface EstimatorResult {
  priceMin: number;
  priceMax: number;
  weeksMin: number;
  weeksMax: number;
  breakdown: {label: string; min: number; max: number}[];
}
