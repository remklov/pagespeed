"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import type { Report } from "@/lib/types";

interface ExportButtonProps {
  reports: Report[];
}

export function ExportButton({ reports }: ExportButtonProps) {
  const generateMarkdown = () => {
    let markdownContent = `# PageSpeed Insights Report\n\n`;
    markdownContent += `*Exported on: ${new Date().toLocaleDateString()}*\n\n`;

    reports.forEach((report) => {
      markdownContent += `## ${report.name}\n\n`;
      markdownContent += `### Overview\n\n`;
      markdownContent += `- **Type:** ${report.type}\n`;
      markdownContent += `\n### Performance Scores\n\n`;
      markdownContent += `- **Performance:** ${report.scores.performance}\n`;
      markdownContent += `- **Accessibility:** ${report.scores.accessibility}\n`;
      markdownContent += `- **Best Practices:** ${report.scores.bestPractices}\n`;
      markdownContent += `- **SEO:** ${report.scores.seo}\n`;
      markdownContent += `\n### Core Web Vitals\n\n`;
      markdownContent += `- **First Contentful Paint (FCP):** ${(report.metrics.firstContentfulPaint / 1000).toFixed(1)}s\n`;
      markdownContent += `- **Largest Contentful Paint (LCP):** ${(report.metrics.largestContentfulPaint / 1000).toFixed(1)}s\n`;
      markdownContent += `- **Speed Index:** ${(report.metrics.speedIndex / 1000).toFixed(1)}s\n`;

      if (report.opportunities.length > 0) {
        markdownContent += `\n### Recommended Actions\n\n`;
        report.opportunities.forEach((opp) => {
          markdownContent += `**${opp.title}**`;
          if (opp.displayValue) {
            markdownContent += ` (Est. Savings: ${opp.displayValue})`;
          }
          markdownContent += `\n`;
          // clean up markdown from description
          const cleanDescription = opp.description.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1');
          markdownContent += `${cleanDescription}\n\n---\n\n`;
        });
      }
      markdownContent += `\n\n`;
    });

    return markdownContent;
  };

  const handleExport = () => {
    const markdown = generateMarkdown();
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pagespeed-report.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Button onClick={handleExport}>
      <Download className="mr-2 h-4 w-4" />
      Export to Markdown
    </Button>
  );
}
