'use client'

import { motion } from 'framer-motion'
import { TrendingDown, Zap, BarChart3, Target } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20">
      {/* Background glow effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute right-1/4 top-1/3 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-300">
            <Zap className="h-4 w-4 text-yellow-400" />
            AI 驱动的关注列表优化工具
          </div>

          <h1 className="mb-6 text-5xl font-black leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
            清理你的
            <br />
            <span className="gradient-text">信息流噪音</span>
          </h1>

          <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-gray-400 sm:text-xl">
            我们用 AI 分析你的每一个关注账号在信息链中的位置，
            帮你识别<span className="text-white font-medium">搬运号</span>、
            <span className="text-white font-medium">营销号</span>和
            <span className="text-white font-medium">信息尾部账号</span>，
            让你直达信息源头。
          </p>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3"
        >
          <FeatureCard
            icon={<BarChart3 className="h-6 w-6" />}
            title="信息链分析"
            description="识别每个账号在信息传播链中的上下游位置"
            color="text-blue-400"
          />
          <FeatureCard
            icon={<Target className="h-6 w-6" />}
            title="智能分类"
            description="AI 自动将关注账号按领域分类：AI、Web3、政治等"
            color="text-purple-400"
          />
          <FeatureCard
            icon={<TrendingDown className="h-6 w-6" />}
            title="取关建议"
            description="推荐取关信息链末端的低价值账号，减少噪音"
            color="text-pink-400"
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
}: {
  icon: React.ReactNode
  title: string
  description: string
  color: string
}) {
  return (
    <div className="glass-card rounded-2xl p-6 text-left transition-all hover:border-white/20 hover:bg-white/[0.08]">
      <div className={`mb-3 ${color}`}>{icon}</div>
      <h3 className="mb-2 text-base font-semibold text-white">{title}</h3>
      <p className="text-sm leading-relaxed text-gray-400">{description}</p>
    </div>
  )
}
