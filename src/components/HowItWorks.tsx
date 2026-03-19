'use client'

import { motion } from 'framer-motion'
import { Settings, Search, GitBranch, Trash2 } from 'lucide-react'

const steps = [
  {
    icon: <Settings className="h-5 w-5" />,
    title: '开放权限',
    description: '在 X 设置中确保关注列表可见',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    num: '01',
  },
  {
    icon: <Search className="h-5 w-5" />,
    title: '输入 Handle',
    description: '输入你的 X 用户名开始分析',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    num: '02',
  },
  {
    icon: <GitBranch className="h-5 w-5" />,
    title: 'AI 分析',
    description: 'Claude 分析内容原创性和时效性',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    num: '03',
  },
  {
    icon: <Trash2 className="h-5 w-5" />,
    title: '智能清理',
    description: '可视化信息链，按建议取关',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    num: '04',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <h2 className="mb-2 text-2xl font-bold text-gray-900">工作原理</h2>
          <p className="text-sm text-gray-500">四步完成关注列表的深度清理</p>
        </motion.div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="card rounded-xl p-5"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className={`inline-flex rounded-lg ${step.bg} p-2 ${step.color}`}>
                  {step.icon}
                </div>
                <span className="text-xl font-bold text-gray-200">{step.num}</span>
              </div>
              <h3 className="mb-1 text-sm font-semibold text-gray-900">{step.title}</h3>
              <p className="text-xs leading-relaxed text-gray-500">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
