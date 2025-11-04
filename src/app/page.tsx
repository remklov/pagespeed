import { scanReports } from "@/lib/reports-parser";
import { ReportsDisplay } from "@/components/reports-display";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FileWarning } from "lucide-react";
import { ExportButton } from "@/components/export-button";

export default async function Home() {
  const { data: reports, error } = await scanReports();

  return (
    <div className="min-h-screen w-full bg-background font-body text-foreground">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight font-headline">PageSpeed Insights Overview</h1>
              <p className="mt-1 text-muted-foreground">
                An aggregated view of your project's performance scores.
              </p>
            </div>
            <ExportButton reports={reports} />
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <Alert variant="destructive" className="mb-8">
            <FileWarning className="h-4 w-4" />
            <AlertTitle>Error Loading Reports</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <ReportsDisplay reports={reports} />
      </main>
    </div>
  );
}
