"use client";

import * as React from "react";
import type { Report } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ReportScore } from "./report-score";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Gauge,
  PersonStanding,
  CheckCircle,
  Globe,
  Info,
  Timer,
  AreaChart,
  Zap,
  Folder,
  ArrowUpDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ReportsDisplayProps {
  reports: Report[];
}

type SortKey = keyof Report | `scores.${keyof Report['scores']}` | `metrics.${keyof Report['metrics']}`;

export function ReportsDisplay({ reports: initialReports }: ReportsDisplayProps) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [activeFilter, setActiveFilter] = React.useState("All");
  const [sortConfig, setSortConfig] = React.useState<{ key: SortKey; direction: 'ascending' | 'descending' } | null>({ key: 'name', direction: 'ascending'});


  if (initialReports.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center p-12">
        <Info className="w-12 h-12 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold">No Reports Found</h2>
        <p className="text-muted-foreground mt-2 text-center">
          Could not find any reports in the './reports' directory.
          <br />
          Please make sure your JSON reports are structured as './reports/[TYPE]/[NAME].json'.
        </p>
      </Card>
    );
  }
  
  const reportTypes = ["All", ...Array.from(new Set(initialReports.map((r) => r.type)))];

  const filteredReports = initialReports.filter((report) => {
    const nameMatch = report.name.toLowerCase().includes(searchTerm.toLowerCase());
    const typeMatch = activeFilter === "All" || report.type === activeFilter;
    return nameMatch && typeMatch;
  });

  const sortedReports = React.useMemo(() => {
    if (sortConfig !== null) {
      return [...filteredReports].sort((a, b) => {
        const aValue = sortConfig.key.includes('.') ? sortConfig.key.split('.').reduce((o, i) => o[i as keyof typeof o], a as any) : a[sortConfig.key as keyof Report];
        const bValue = sortConfig.key.includes('.') ? sortConfig.key.split('.').reduce((o, i) => o[i as keyof typeof o], b as any) : b[sortConfig.key as keyof Report];

        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return filteredReports;
  }, [filteredReports, sortConfig]);

  const requestSort = (key: SortKey) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  const getSortIndicator = (key: SortKey) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <ArrowUpDown className="h-4 w-4 opacity-50" />;
    }
    return sortConfig.direction === 'ascending' ? (
      <ArrowUpDown className="h-4 w-4" />
    ) : (
      <ArrowUpDown className="h-4 w-4" />
    );
  };


  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Breakdown</CardTitle>
        <div className="pt-4 flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Search by project name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <div className="flex items-center gap-2">
            {reportTypes.map((type) => (
              <Button
                key={type}
                variant={activeFilter === type ? "default" : "outline"}
                onClick={() => setActiveFilter(type)}
              >
                {type}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold w-[200px]">
                  <Button variant="ghost" onClick={() => requestSort('name')}>
                    Project {getSortIndicator('name')}
                  </Button>
                </TableHead>
                <TableHead className="font-semibold w-[150px]">
                  <Button variant="ghost" onClick={() => requestSort('type')}>
                    <div className="flex items-center gap-2">
                      <Folder className="h-5 w-5 text-primary" />
                      Type {getSortIndicator('type')}
                    </div>
                  </Button>
                </TableHead>
                <TableHead className="font-semibold text-center">
                  <Button variant="ghost" onClick={() => requestSort('scores.performance')}>
                    <div className="flex items-center justify-center gap-2">
                      <Gauge className="h-5 w-5 text-primary" />
                      Performance {getSortIndicator('scores.performance')}
                    </div>
                  </Button>
                </TableHead>
                <TableHead className="font-semibold text-center">
                  <Button variant="ghost" onClick={() => requestSort('scores.accessibility')}>
                    <div className="flex items-center justify-center gap-2">
                      <PersonStanding className="h-5 w-5 text-primary" />
                      Accessibility {getSortIndicator('scores.accessibility')}
                    </div>
                  </Button>
                </TableHead>
                <TableHead className="font-semibold text-center">
                  <Button variant="ghost" onClick={() => requestSort('scores.bestPractices')}>
                    <div className="flex items-center justify-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      Best Practices {getSortIndicator('scores.bestPractices')}
                    </div>
                  </Button>
                </TableHead>
                <TableHead className="font-semibold text-center">
                  <Button variant="ghost" onClick={() => requestSort('scores.seo')}>
                    <div className="flex items-center justify-center gap-2">
                      <Globe className="h-5 w-5 text-primary" />
                      SEO {getSortIndicator('scores.seo')}
                    </div>
                  </Button>
                </TableHead>
                <TableHead className="font-semibold text-center">
                  <Button variant="ghost" onClick={() => requestSort('metrics.firstContentfulPaint')}>
                    <div className="flex items-center justify-center gap-2">
                      <Timer className="h-5 w-5 text-primary" />
                      FCP {getSortIndicator('metrics.firstContentfulPaint')}
                    </div>
                  </Button>
                </TableHead>
                <TableHead className="font-semibold text-center">
                  <Button variant="ghost" onClick={() => requestSort('metrics.largestContentfulPaint')}>
                    <div className="flex items-center justify-center gap-2">
                      <AreaChart className="h-5 w-5 text-primary" />
                      LCP {getSortIndicator('metrics.largestContentfulPaint')}
                    </div>
                  </Button>
                </TableHead>
                <TableHead className="font-semibold text-center">
                  <Button variant="ghost" onClick={() => requestSort('metrics.speedIndex')}>
                    <div className="flex items-center justify-center gap-2">
                      <Zap className="h-5 w-5 text-primary" />
                      Speed Index {getSortIndicator('metrics.speedIndex')}
                    </div>
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedReports.map((report) => (
                <TableRow key={`${report.type}-${report.name}`}>
                  <TableCell className="font-medium">{report.name}</TableCell>
                  <TableCell>{report.type}</TableCell>
                  <TableCell className="text-center">
                    <ReportScore score={report.scores.performance} />
                  </TableCell>
                  <TableCell className="text-center">
                    <ReportScore score={report.scores.accessibility} />
                  </TableCell>
                  <TableCell className="text-center">
                    <ReportScore score={report.scores.bestPractices} />
                  </TableCell>
                  <TableCell className="text-center">
                    <ReportScore score={report.scores.seo} />
                  </TableCell>
                  <TableCell className="text-center">
                    {(report.metrics.firstContentfulPaint / 1000).toFixed(1)}s
                  </TableCell>
                  <TableCell className="text-center">
                    {(report.metrics.largestContentfulPaint / 1000).toFixed(1)}s
                  </TableCell>
                  <TableCell className="text-center">
                    {(report.metrics.speedIndex / 1000).toFixed(1)}s
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {sortedReports.length === 0 && (
          <div className="text-center p-8 text-muted-foreground">
            No projects found matching your criteria.
          </div>
        )}
      </CardContent>
    </Card>
  );
}