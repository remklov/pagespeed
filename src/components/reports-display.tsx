"use client";

import type { GroupedReports } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { ReportScore } from "./report-score";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Gauge,
  PersonStanding,
  CheckCircle,
  Globe,
  Info,
  Timer,
  AreaChart,
  Zap,
} from "lucide-react";

interface ReportsDisplayProps {
  reports: GroupedReports;
}

export function ReportsDisplay({ reports }: ReportsDisplayProps) {
  const reportTypes = Object.keys(reports);

  if (reportTypes.length === 0) {
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

  return (
    <Card>
      <CardHeader>
         <CardTitle>Performance Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={reportTypes[0]}>
          <TabsList className="grid w-full grid-cols-1 sm:w-auto sm:grid-flow-col">
            {reportTypes.map((type) => (
              <TabsTrigger key={type} value={type}>
                {type}
              </TabsTrigger>
            ))}
          </TabsList>
          {reportTypes.map((type) => (
            <TabsContent key={type} value={type}>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-semibold w-[200px]">
                        Project
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
                    {reports[type].map((report) => (
                      <TableRow key={report.name}>
                        <TableCell className="font-medium">{report.name}</TableCell>
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
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
