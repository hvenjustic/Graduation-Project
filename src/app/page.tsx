import type { ReactNode } from 'react';
import {
  FiArrowUpRight,
  FiBookOpen,
  FiCheckCircle,
  FiLayers,
  FiTrendingUp,
  FiZap
} from 'react-icons/fi';
import QuickActions from '@/components/QuickActions';

const statHighlights = [
  {
    label: 'App shell',
    value: 'Next.js 15 + Tailwind 4',
    detail: 'App Router, dark mode, and opinionated styling ready to ship.',
    accent: 'from-indigo-500/20 to-purple-500/20'
  },
  {
    label: 'UI toolkit',
    value: 'Framer Motion + React Icons',
    detail: 'Animated navigation and cards without auth dependencies.',
    accent: 'from-emerald-500/15 to-teal-400/15'
  },
  {
    label: 'Project shape',
    value: 'Template folderized',
    detail: 'Config, public assets, and core components in place.',
    accent: 'from-amber-400/20 to-orange-500/20'
  }
];

const tracks = [
  {
    title: 'UI shell',
    icon: FiLayers,
    points: [
      'Sticky navigation with mobile drawer',
      'One-click light/dark toggle stored in localStorage',
      'Glassmorphic panels and gradient background scaffolding'
    ]
  },
  {
    title: 'Pages',
    icon: FiBookOpen,
    points: [
      'App Router layout and metadata pre-wired',
      'Landing page sections for stats, activity, and blueprint',
      'Reusable card primitives to drop in custom data'
    ]
  },
  {
    title: 'DX defaults',
    icon: FiTrendingUp,
    points: [
      'TypeScript strict mode, path aliases, and lint setup',
      'Tailwind 4 config with typography/scrollbar plugins',
      'Minimal dependencies—no auth or backend coupling'
    ]
  }
];

const activity = [
  {
    title: 'Auth stripped',
    body: 'Removed login flows and providers; the shell renders without gated routes.',
    tag: 'done',
    when: 'Moments ago'
  },
  {
    title: 'Navigation hardened',
    body: 'Responsive navbar with CTA and smooth hover states stays outside business logic.',
    tag: 'ui',
    when: 'Today'
  },
  {
    title: 'Template folder ready',
    body: 'Copied configs, assets, and entry pages into /template for quick reuse.',
    tag: 'starter',
    when: 'Today'
  }
];

const blueprint = `template
├── package.json
├── next.config.js
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── src
    ├── app
    │   ├── layout.tsx
    │   ├── page.tsx
    │   └── globals.css
    └── components
        ├── ThemeToggle.tsx
        └── navBar
            └── Navbar.tsx`;

const Pill = ({ text }: { text: string }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/50 px-3 py-1 text-xs font-semibold text-indigo-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-indigo-200">
    <FiCheckCircle className="h-3 w-3" />
    {text}
  </span>
);

const Card = ({ children }: { children: ReactNode }) => (
  <div className="glass-panel rounded-2xl border border-gray-200/60 bg-white/70 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-gray-800/60 dark:bg-slate-900/70">
    {children}
  </div>
);

export default function Home() {
  return (
    <div className="relative isolate px-6 pb-16">
      <section className="mx-auto mt-8 max-w-6xl overflow-hidden rounded-3xl border border-white/60 bg-white/70 p-8 shadow-lg backdrop-blur md:p-12 dark:border-white/10 dark:bg-slate-900/80">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <Pill text="Auth-free shell" />
              <Pill text="App Router" />
              <Pill text="Tailwind 4" />
            </div>
            <div className="space-y-3">
              <h1 className="text-3xl font-semibold leading-tight text-slate-900 dark:text-white md:text-4xl">
                Context-starter skeleton, ready to clone.
              </h1>
              <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-300">
                Use this template as the baseline for new projects. The routing, layout, theming, and
                UI shell come pre-assembled—just plug in your data and features.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="#blueprint"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:-translate-y-0.5 hover:bg-indigo-500"
              >
                View template map
                <FiArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="#actions"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-300 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-600"
              >
                Next steps
              </a>
            </div>
          </div>
          <div className="grid w-full gap-4 sm:grid-cols-2 lg:max-w-md">
            {statHighlights.map((item) => (
              <Card key={item.label}>
                <div className={`rounded-xl bg-gradient-to-br ${item.accent} p-4`}> 
                  <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">{item.label}</p>
                  <p className="mt-2 text-base font-semibold text-slate-900 dark:text-white">{item.value}</p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{item.detail}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 grid max-w-6xl gap-6 lg:grid-cols-3" id="tracks">
        {tracks.map((track) => (
          <Card key={track.title}>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-200">
                <track.icon className="h-5 w-5" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{track.title}</h3>
                  <FiArrowUpRight className="h-4 w-4 text-slate-400" />
                </div>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  {track.points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <FiCheckCircle className="mt-0.5 h-4 w-4 text-emerald-500" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        ))}
      </section>

      <section className="mx-auto mt-10 max-w-6xl" id="activity">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Activity</p>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">What changed for the template</h2>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300">
            <FiTrendingUp className="h-4 w-4" />
            Updated today
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {activity.map((item) => (
            <Card key={item.title}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.title}</p>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.body}</p>
                </div>
                <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-200">
                  {item.tag}
                </span>
              </div>
              <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">{item.when}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-6xl" id="blueprint">
        <div className="mb-4 flex items-center gap-2">
          <FiLayers className="h-4 w-4 text-indigo-500" />
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Folder blueprint</h2>
        </div>
        <Card>
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <pre className="max-h-[320px] overflow-auto rounded-xl bg-slate-900 p-4 text-sm leading-relaxed text-slate-100 shadow-inner">
{blueprint}
            </pre>
            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                <FiBookOpen className="h-4 w-4 text-indigo-500" />
                <span>How to reuse</span>
              </div>
              <p>Copy the template folder as a new project root, run <code>npm install</code>, and start building. Replace the landing content in <code>src/app/page.tsx</code> and adjust the navbar links.</p>
              <p>Keep the <code>ThemeToggle</code> and background layer if you want dark mode and the gradient field; swap the logo in <code>public/context-icon.svg</code> to rebrand.</p>
              <p>Tailwind plugins are pre-wired—enable prose styles or scrollbar tweaks as needed.</p>
            </div>
          </div>
        </Card>
      </section>

      <section className="mx-auto mt-10 max-w-6xl" id="actions">
        <div className="mb-4 flex items-center gap-2">
          <FiZap className="h-4 w-4 text-amber-500" />
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Quick next steps</h2>
        </div>
        <QuickActions />
      </section>
    </div>
  );
}
