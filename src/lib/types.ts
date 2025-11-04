export interface Report {
  type: string;
  name: string;
  scores: {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
  };
  metrics: {
    firstContentfulPaint: number;
    largestContentfulPaint: number;
    speedIndex: number;
  };
}

export interface GroupedReports {
  [type: string]: Report[];
}
