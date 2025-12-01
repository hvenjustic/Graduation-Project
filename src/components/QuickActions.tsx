'use client';

import { motion } from 'framer-motion';
import { FiArrowUpRight, FiCompass, FiDatabase, FiZap } from 'react-icons/fi';

const quickActions = [
  {
    title: '接通图谱与商品接口',
    body: '将 /api/agent 与 /api/products 请求连到后端或 mock 服务，替换示例数据。',
    cta: '对接接口',
    icon: FiDatabase
  },
  {
    title: '导入知识图谱',
    body: '准备品牌、品类、属性的节点和关系，填充推荐与问答可引用的数据源。',
    cta: '加载节点',
    icon: FiCompass
  },
  {
    title: '上线体验版',
    body: '配置域名与部署流水线，保留 Agent 面板与聊天入口，便于演示毕业设计。',
    cta: '准备部署',
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
