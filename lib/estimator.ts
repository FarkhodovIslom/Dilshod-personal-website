import type {EstimatorResult} from '@/types';
import {projectTypes, features} from '@/data/estimator';

export function estimate(
  projectType: string,
  selectedFeatures: string[]
): EstimatorResult {
  const project = projectTypes.find((p) => p.key === projectType);
  if (!project) {
    return {priceMin: 0, priceMax: 0, weeksMin: 0, weeksMax: 0, breakdown: []};
  }

  let priceMin = project.priceMin;
  let priceMax = project.priceMax;
  let weeksMin = project.weeksMin;
  let weeksMax = project.weeksMax;

  const breakdown: {label: string; min: number; max: number}[] = [
    {label: projectType, min: project.priceMin, max: project.priceMax}
  ];

  for (const key of selectedFeatures) {
    const feature = features.find((f) => f.key === key);
    if (!feature) continue;

    priceMin += feature.priceMin;
    priceMax += feature.priceMax;
    weeksMin += feature.weeks;
    weeksMax += feature.weeks;

    breakdown.push({
      label: key,
      min: feature.priceMin,
      max: feature.priceMax
    });
  }

  return {priceMin, priceMax, weeksMin, weeksMax, breakdown};
}
