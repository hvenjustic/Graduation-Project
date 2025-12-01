import type { ComponentType } from 'react';
import type { Metadata } from 'next';
import { FiArrowUpRight, FiCheckCircle, FiCpu, FiLayers, FiShoppingBag, FiTrendingUp, FiZap } from 'react-icons/fi';

export const metadata: Metadata = {
  title: 'Products | Context-starter'
};

const products = [
  {
    name: 'Signal Studio',
    icon: FiTrendingUp,
    blurb: 'Unified telemetry workspace to monitor product health and ship changes with confidence.',
    price: '$24/mo',
    status: 'New',
    benefits: ['Live metrics with anomaly surfacing', 'Rollout guardrails baked in', 'Shareable incident rooms']
  },
  {
    name: 'Workflow Hub',
    icon: FiLayers,
    blurb: 'Composable automation blocks with human-in-the-loop checkpoints for critical moments.',
    price: '$18/mo',
    status: 'Stable',
    benefits: ['Drag-and-drop step builder', 'Role-based approvals', 'Audit-ready history']
  },
  {
    name: 'Inference Edge',
    icon: FiCpu,
    blurb: 'Low-latency inference gateway with caching, evaluation hooks, and cost controls.',
    price: '$32/mo',
    status: 'Beta',
    benefits: ['Adaptive caching by embedding', 'Offline evals + drift alerts', 'Spend caps per namespace']
  }
];

const launchChecklist = [
  'Provision a new workspace from the dashboard',
  'Invite your team and connect staging data sources',
  'Run through the sandbox blueprints to validate fit',
  'Promote to production with one-click hardening'
];

const HighlightCard = ({
  title,
  body,
  icon: Icon
}: {
  title: string;
  body: string;
  icon: ComponentType<{ className?: string }>;
}) => (
  <div className="glass-panel rounded-2xl border border-white/60 bg-white/70 p-5 shadow-sm dark:border-white/10 dark:bg-slate-900/70">
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-200">
        <Icon className="h-5 w-5" />
      </div>
      <div className="space-y-1">
        <p className="text-base font-semibold text-slate-900 dark:text-white">{title}</p>
        <p className="text-sm text-slate-600 dark:text-slate-300">{body}</p>
      </div>
    </div>
  </div>
);

export default function ProductsPage() {
  return (
    <div className="relative isolate px-6 pb-16">
      <section className="mx-auto mt-8 max-w-6xl overflow-hidden rounded-3xl border border-white/60 bg-white/70 p-8 shadow-lg backdrop-blur md:p-12 dark:border-white/10 dark:bg-slate-900/80">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-200">
              <FiShoppingBag className="h-4 w-4" />
              Products
            </span>
            <div className="space-y-3">
              <h1 className="text-3xl font-semibold leading-tight text-slate-900 dark:text-white md:text-4xl">
                Choose the building block that matches your rollout stage.
              </h1>
              <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-300">
                Each module ships with opinions for reliability and governance. Mix and match them, or start
                with the whole bundle to get telemetry, workflows, and AI orchestration in one stack.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="#catalog"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:-translate-y-0.5 hover:bg-indigo-500"
              >
                Explore the catalog
                <FiArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="#checklist"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-300 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-600"
              >
                Review launch checklist
              </a>
            </div>
          </div>
          <div className="grid w-full gap-4 sm:grid-cols-2 lg:max-w-md">
            <HighlightCard title="Ship faster" body="Opinionated defaults let teams stand up production-safe flows in a day." icon={FiZap} />
            <HighlightCard title="Stay observable" body="Every product emits structured events to keep dashboards accurate." icon={FiTrendingUp} />
            <HighlightCard title="AI-ready" body="Inference Edge integrates across modules so prompts stay consistent." icon={FiCpu} />
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-6xl" id="catalog">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Catalog</p>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Pick a starting module</h2>
          </div>
          <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300">
            Flexible pricing
          </span>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.name}
              className="glass-panel flex h-full flex-col rounded-2xl border border-gray-200/60 bg-white/70 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-gray-800/60 dark:bg-slate-900/70"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-200">
                    <product.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-base font-semibold text-slate-900 dark:text-white">{product.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{product.status}</p>
                  </div>
                </div>
                <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-200">
                  {product.price}
                </span>
              </div>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{product.blurb}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-200">
                {product.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2">
                    <FiCheckCircle className="mt-0.5 h-4 w-4 text-emerald-500" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <button className="mt-auto inline-flex items-center justify-center rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:border-slate-300 dark:border-slate-700 dark:text-slate-100 dark:hover:border-slate-600">
                Add to plan
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-6xl" id="checklist">
        <div className="mb-4 flex items-center gap-2">
          <FiCheckCircle className="h-4 w-4 text-emerald-500" />
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Launch checklist</h2>
        </div>
        <div className="glass-panel rounded-2xl border border-gray-200/60 bg-white/70 p-6 shadow-sm dark:border-gray-800/60 dark:bg-slate-900/70">
          <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
            <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-200">
              {launchChecklist.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200">
                    <FiCheckCircle className="h-3 w-3" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="rounded-xl bg-slate-900 p-5 text-sm text-slate-100 shadow-inner">
              <p className="text-xs uppercase tracking-wide text-slate-400">Activation tip</p>
              <p className="mt-2">
                Start with a single team, wire telemetry, then layer automations. When you turn on Inference
                Edge, you get consistent prompts and safety checks across modules automatically.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
