"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Report } from "@/lib/types";

interface ReportDetailsDialogProps {
  report: Report;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ReportDetailsDialog({
  report,
  open,
  onOpenChange,
}: ReportDetailsDialogProps) {
  const parseDescription = (description: string) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    return description.replace(linkRegex, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary underline">$1</a>');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Recommended Actions for {report.name}</DialogTitle>
          <DialogDescription>
            Based on the Lighthouse report, here are some opportunities to improve performance.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          {report.opportunities.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {report.opportunities.map((opp, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger className="text-left">{opp.title}</AccordionTrigger>
                  <AccordionContent>
                    <div
                      className="prose prose-sm dark:prose-invert"
                      dangerouslySetInnerHTML={{ __html: parseDescription(opp.description) }}
                    />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center text-muted-foreground py-8">
              No specific opportunities found in this report. Great job!
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
