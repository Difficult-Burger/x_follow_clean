'use client'

import { motion } from 'framer-motion'
import { TrendingDown, Zap, BarChart3, Target } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative pt-28 pb-16">
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-500">
            <Zap className="h-3.5 w-3.5 text-amber-500" />
            AI 驱动的关注列表优化
          </div>

          <h1 className="mb-5 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            清理你的
            <br />
            <span className="gradient-text">信息流噪音</span>
          </h1>

          <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-gray-500">
            AI 分析你每一个关注账号在信息链中的位置，识别搬运号、营销号和信息尾部账号，让你直达信息源头。
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mx-auto grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3"
        >
          <FeatureCard
            icon={<BarChart3 className="h-5 w-5" />}
            title="信息链分析"
            description="识别每个账号在传播链中的上下游位置"
            color="text-blue-600"
            bg="bg-blue-50"
          />
          <FeatureCard
            icon={<Target className="h-5 w-5" />}
            title="智能分类"
            description="自动按领域分类：AI、Web3、政治等"
            color="text-violet-600"
            bg="bg-violet-50"
          />
          <FeatureCard
            icon={<TrendingDown className="h-5 w-5" />}
            title="取关建议"
            description="推荐取关信息链末端的低价值账号"
            color="text-rose-600"
            bg="bg-rose-50"
          />
        </motion.div>
      </div>
    </section>
  )
}

function FeatureCard({
  icon,
  title,
  description,
  color,
  bg,
}: {
  icon: React.ReactNode
  title: string
  description: string
  color: string
  bg: string
}) {
  return (
    <div className="card rounded-xl p-5 text-left">
      <div className={`mb-2.5 inline-flex rounded-lg ${bg} p-2 ${color}`}>{icon}</div>
      <h3 className="mb-1 text-sm font-semibold text-gray-900">{title}</h3>
      <p className="text-xs leading-relaxed text-gray-500">{description}</p>
    </div>
  )
}
