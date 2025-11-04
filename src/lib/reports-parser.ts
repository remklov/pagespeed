import fs from "fs/promises";
import path from "path";
import type { Report } from "./types";

const REPORTS_DIR = path.join(process.cwd(), "reports");

const cleanName = (name: string): string => {
  return name
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
};

interface LighthouseReport {
  categories: {
    performance: { score: number | null };
    accessibility: { score: number | null };
    "best-practices": { score: number | null };
    seo: { score: number | null };
  };
  audits?: {
    [key: string]: {
      score: number | null;
      title: string;
      description: string;
      numericValue?: number;
    }
  }
}

export async function scanReports(): Promise<{ data: Report[], error: string | null }> {
  const allReports: Report[] = [];
  
  try {
    const reportTypes = await fs.readdir(REPORTS_DIR, { withFileTypes: true });

    for (const typeDirent of reportTypes) {
      if (typeDirent.isDirectory()) {
        const type = typeDirent.name;
        const typePath = path.join(REPORTS_DIR, type);
        const files = await fs.readdir(typePath);

        for (const file of files) {
          if (path.extname(file) === ".json") {
            const filePath = path.join(typePath, file);
            try {
              const fileContent = await fs.readFile(filePath, "utf-8");
              const jsonContent: LighthouseReport = JSON.parse(fileContent);

              const opportunities = jsonContent.audits 
                ? Object.values(jsonContent.audits)
                    .filter(audit => audit.score !== null && audit.score < 0.9)
                    .map(audit => ({ title: audit.title, description: audit.description }))
                : [];

              const reportData: Report = {
                type: type,
                name: cleanName(path.basename(file, ".json")),
                scores: {
                  performance: Math.round((jsonContent.categories.performance?.score ?? 0) * 100),
                  accessibility: Math.round((jsonContent.categories.accessibility?.score ?? 0) * 100),
                  bestPractices: Math.round((jsonContent.categories["best-practices"]?.score ?? 0) * 100),
                  seo: Math.round((jsonContent.categories.seo?.score ?? 0) * 100),
                },
                metrics: {
                  firstContentfulPaint: jsonContent.audits?.["first-contentful-paint"]?.numericValue ?? 0,
                  largestContentfulPaint: jsonContent.audits?.["largest-contentful-paint"]?.numericValue ?? 0,
                  speedIndex: jsonContent.audits?.["speed-index"]?.numericValue ?? 0,
                },
                opportunities,
              };
              allReports.push(reportData);
            } catch (e) {
              console.error(`Error parsing file ${filePath}:`, e);
              // Optionally skip this file and continue
            }
          }
        }
      }
    }
    
    // Sort reports by name ascending
    allReports.sort((a, b) => a.name.localeCompare(b.name));

    return { data: allReports, error: null };

  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
        console.warn("Reports directory not found. Please create a './reports' directory.");
        return { data: [], error: "The './reports' directory was not found. Please create it and add your report files." };
    }
    console.error("Error scanning reports directory:", error);
    return { data: [], error: "An unexpected error occurred while scanning for reports." };
  }
}
