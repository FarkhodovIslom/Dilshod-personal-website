import type {EstimatorProjectType, EstimatorFeature} from '@/types';

export const projectTypes: EstimatorProjectType[] = [
  {key: 'web', priceMin: 1500, priceMax: 3000, weeksMin: 2, weeksMax: 4},
  {key: 'mobile', priceMin: 3000, priceMax: 6000, weeksMin: 4, weeksMax: 8},
  {key: 'bot', priceMin: 800, priceMax: 2000, weeksMin: 1, weeksMax: 2},
  {key: 'miniApp', priceMin: 1500, priceMax: 3500, weeksMin: 2, weeksMax: 4},
  {key: 'design', priceMin: 800, priceMax: 2000, weeksMin: 1, weeksMax: 3}
];

export const features: EstimatorFeature[] = [
  {key: 'auth', priceMin: 300, priceMax: 600, weeks: 1},
  {key: 'payments', priceMin: 400, priceMax: 800, weeks: 1},
  {key: 'realtime', priceMin: 350, priceMax: 700, weeks: 1},
  {key: 'i18n', priceMin: 200, priceMax: 400, weeks: 1},
  {key: 'admin', priceMin: 500, priceMax: 1000, weeks: 2},
  {key: 'analytics', priceMin: 250, priceMax: 500, weeks: 1},
  {key: 'seo', priceMin: 150, priceMax: 300, weeks: 1},
  {key: 'deploy', priceMin: 200, priceMax: 400, weeks: 1}
];
