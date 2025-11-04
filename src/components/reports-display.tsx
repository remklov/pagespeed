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
} from "lucide-react";

interface ReportsDisplayProps {
  reports: Report[];
}

export function ReportsDisplay({ reports: initialReports }: ReportsDisplayProps) {
  const [searchTerm, setSearchTerm] = React.useState("");

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

  const filteredReports = initialReports.filter((report) =>
    report.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Breakdown</CardTitle>
        <div className="pt-4">
          <Input
            placeholder="Search by project name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold w-[200px]">
                  Project
                </TableHead>
                <TableHead className="font-semibold w-[150px]">
                  <div className="flex items-center gap-2">
                    <Folder className="h-5 w-5 text-primary" />
                    Type
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Gauge className="h-5 w-5 text-primary" />
                    Performance
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-center">
                  <div className="flex items-center justify-center gap-2">
                    <PersonStanding className="h-5 w-5 text-primary" />
                    Accessibility
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-center">
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    Best Practices
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Globe className="h-5 w-5 text-primary" />
                    SEO
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Timer className="h-5 w-5 text-primary" />
                    FCP
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-center">
                  <div className="flex items-center justify-center gap-2">
                    <AreaChart className="h-5 w-5 text-primary" />
                    LCP
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    Speed Index
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => (
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
        {filteredReports.length === 0 && (
          <div className="text-center p-8 text-muted-foreground">
            No projects found for &quot;{searchTerm}&quot;.
          </div>
        )}
      </CardContent>
    </Card>
  );
}