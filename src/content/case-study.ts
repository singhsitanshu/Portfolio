export type CaseStudyResultSummary = {
  id: string;
  title: string;
  context?: string;
  metrics: readonly { value: string; label: string; detail: string }[];
  note?: string;
  scope?: string;
  evidence: { id: string; label: string };
};
