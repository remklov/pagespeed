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

// This is no longer used but kept for potential future reference.
export interface GroupedReports {
  [type: string]: Report[];
}
