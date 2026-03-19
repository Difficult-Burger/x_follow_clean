'use client'

import { motion } from 'framer-motion'
import { Settings, Search, GitBranch, Trash2 } from 'lucide-react'

const steps = [
  {
    icon: <Settings className="h-6 w-6" />,
    title: '开放权限',
    description: '在 X 设置中，确保你的关注列表对其他人可见。进入 Settings → Privacy → 取消勾选 "Protect your posts"。',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: <Search className="h-6 w-6" />,
    title: '输入 Handle',
    description: '输入你的 X 用户名（如 @username），我们会获取你的完整关注列表并进行分析。',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: <GitBranch className="h-6 w-6" />,
    title: 'AI 分析',
    description: 'Claude AI 会分析每个账号的内容、时效性和原创性，确定它们在信息链中的位置。',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: <Trash2 className="h-6 w-6" />,
    title: '智能清理',
    description: '查看可视化信息链轴线，了解每个账号的位置，按建议取关信息链末端的低价值账号。',
    color: 'from-green-500 to-emerald-500',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            工作原理
          </h2>
          <p className="text-lg text-gray-400">
            四步完成关注列表的深度清理
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card group relative rounded-2xl p-6"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${step.color} text-white`}>
                  {step.icon}
                </div>
                <span className="text-2xl font-black text-white/20">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">{step.title}</h3>
              <p className="text-sm leading-relaxed text-gray-400">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
