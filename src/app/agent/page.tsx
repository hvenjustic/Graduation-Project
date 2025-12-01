import type { ComponentType } from 'react';
import type { Metadata } from 'next';
import { FiArrowUpRight, FiCompass, FiGitBranch, FiPlay, FiShield, FiUsers } from 'react-icons/fi';

export const metadata: Metadata = {
  title: 'Agent | Context-starter'
};

const orchestrations = [
  {
    title: 'Onboarding concierge',
    summary: 'Guides customers through setup, connects data sources, and opens feedback loops.',
    owner: 'Success',
    status: 'Active',
    steps: ['Collect context + goals', 'Provision workspace + guardrails', 'Schedule live walkthrough', 'Capture outcomes and next steps']
  },
  {
    title: 'Release steward',
    summary: 'Handles rollout playbooks with approvals, testing, and coordinated comms.',
    owner: 'Engineering',
    status: 'Pilot',
    steps: ['Draft change summary', 'Run gated tests + evals', 'Notify impacted teams', 'Watch live metrics + rollback if needed']
  },
  {
    title: 'Support triage',
    summary: 'Prioritizes inbound tickets, drafts replies, and loops in specialists.',
    owner: 'Support',
    status: 'Active',
    steps: ['Detect intent + severity', 'Summarize history', 'Draft response with evidence', 'Route to specialist or auto-resolve']
  }
];

const capabilities = [
  { title: 'Grounded reasoning', description: 'Retrieves facts from your sources before drafting an action.', icon: FiCompass },
  { title: 'Secure by default', description: 'Scoped credentials and audit trails for every run.', icon: FiShield },
  { title: 'Human in the loop', description: 'Checkpoints ensure a human reviews high-impact actions.', icon: FiUsers },
  { title: 'Branch + replay', description: 'Fork an execution path to test fixes and re-run safely.', icon: FiGitBranch }
];

const CapabilityCard = ({
  title,
  description,
  icon: Icon
}: {
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
}) => (
  <div className="glass-panel rounded-2xl border border-white/60 bg-white/70 p-5 shadow-sm dark:border-white/10 dark:bg-slate-900/70">
    <div className="flex items-start gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-200">
        <Icon className="h-5 w-5" />
      </span>
      <div className="space-y-1">
        <p className="text-base font-semibold text-slate-900 dark:text-white">{title}</p>
        <p className="text-sm text-slate-600 dark:text-slate-300">{description}</p>
      </div>
    </div>
  </div>
);

export default function AgentPage() {
  return (
    <div className="relative isolate px-6 pb-16">
      <section className="mx-auto mt-8 max-w-6xl overflow-hidden rounded-3xl border border-white/60 bg-white/70 p-8 shadow-lg backdrop-blur md:p-12 dark:border-white/10 dark:bg-slate-900/80">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-200">
              <FiPlay className="h-4 w-4" />
              Agent
            </span>
            <div className="space-y-3">
              <h1 className="text-3xl font-semibold leading-tight text-slate-900 dark:text-white md:text-4xl">
                Deploy an operator that always follows your playbooks.
              </h1>
              <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-300">
                Encode critical workflows with checkpoints, guardrails, and observability. Your team stays in
                control while the agent executes repeatable work at speed.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="#orchestrations"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:-translate-y-0.5 hover:bg-indigo-500"
              >
                View orchestrations
                <FiArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="#capabilities"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-300 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-600"
              >
                See capabilities
              </a>
            </div>
          </div>
          <div className="rounded-2xl bg-slate-900 p-6 text-slate-100 shadow-inner">
            <p className="text-xs uppercase tracking-wide text-slate-400">Execution snapshot</p>
            <div className="mt-4 space-y-4 text-sm">
              <div className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2">
                <span>Scope check</span>
                <span className="text-emerald-300">Passed</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2">
                <span>Evidence gathered</span>
                <span className="text-indigo-200">6 sources</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2">
                <span>Human approval</span>
                <span className="text-amber-200">Pending</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2">
                <span>Resolution time</span>
                <span className="text-slate-200">4m 12s</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-6xl" id="orchestrations">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Playbooks</p>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Ready-to-run orchestrations</h2>
          </div>
          <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300">
            Guardrails on
          </span>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {orchestrations.map((flow) => (
            <div
              key={flow.title}
              className="glass-panel flex h-full flex-col rounded-2xl border border-gray-200/60 bg-white/70 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-gray-800/60 dark:bg-slate-900/70"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-base font-semibold text-slate-900 dark:text-white">{flow.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Owner: {flow.owner} · {flow.status}
                  </p>
                </div>
                <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-200">
                  {flow.steps.length} steps
                </span>
              </div>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{flow.summary}</p>
              <ol className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-200">
                {flow.steps.map((step, index) => (
                  <li key={step} className="flex items-start gap-2">
                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-200">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              <button className="mt-auto inline-flex items-center justify-center rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:border-slate-300 dark:border-slate-700 dark:text-slate-100 dark:hover:border-slate-600">
                Run with approvals
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-6xl" id="capabilities">
        <div className="mb-4 flex items-center gap-2">
          <FiCompass className="h-4 w-4 text-indigo-500" />
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Core capabilities</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {capabilities.map((item) => (
            <CapabilityCard key={item.title} title={item.title} description={item.description} icon={item.icon} />
          ))}
        </div>
      </section>
    </div>
  );
}
