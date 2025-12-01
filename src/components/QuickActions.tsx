'use client';

import { motion } from 'framer-motion';
import { FiArrowUpRight, FiCompass, FiZap } from 'react-icons/fi';

const quickActions = [
  {
    title: 'Add a feature route',
    body: 'Create a folder under src/app and drop in your page component—layout already wraps it.',
    cta: 'Open src/app/page.tsx',
    icon: FiCompass
  },
  {
    title: 'Wire real data',
    body: 'Swap the placeholder sections with live fetchers or server actions as needed.',
    cta: 'Add hooks in src',
    icon: FiArrowUpRight
  },
  {
    title: 'Brand it',
    body: 'Update colors, gradients, and the navbar logo in public/context-icon.svg.',
    cta: 'Tweak globals.css',
    icon: FiZap
  }
];

export default function QuickActions() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {quickActions.map((action) => (
        <motion.div
          key={action.title}
          whileHover={{ translateY: -4 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="glass-panel rounded-2xl border border-slate-200/60 bg-white/80 p-5 shadow-sm dark:border-slate-800/60 dark:bg-slate-900/80"
        >
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
            <action.icon className="h-4 w-4 text-indigo-500" />
            {action.title}
          </div>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{action.body}</p>
          <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-200">
            {action.cta}
            <FiArrowUpRight className="h-3 w-3" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
