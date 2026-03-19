'use client'

import { motion } from 'framer-motion'
import { AnalysisResult } from '@/lib/types'
import { Users, FolderTree, TrendingDown, Shield } from 'lucide-react'

export default function AnalysisStats({ result }: { result: AnalysisResult }) {
  const upstreamCount = result.categories
    .flatMap(c => c.accounts)
    .filter(a => a.chainPosition <= 30).length

  const stats = [
    {
      icon: <Users className="h-5 w-5" />,
      label: '分析账号',
      value: result.totalFollowing,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
    },
    {
      icon: <FolderTree className="h-5 w-5" />,
      label: '识别分类',
      value: result.categories.length,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
    },
    {
      icon: <Shield className="h-5 w-5" />,
      label: '上游源头',
      value: upstreamCount,
      color: 'text-green-400',
      bg: 'bg-green-500/10',
    },
    {
      icon: <TrendingDown className="h-5 w-5" />,
      label: '建议取关',
      value: result.recommendedUnfollows.length,
      color: 'text-red-400',
      bg: 'bg-red-500/10',
    },
  ]

  return (
    <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="glass-card rounded-xl p-4 text-center"
        >
          <div className={`mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg ${stat.bg} ${stat.color}`}>
            {stat.icon}
          </div>
          <div className="text-2xl font-bold text-white">{stat.value}</div>
          <div className="text-xs text-gray-400">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  )
}
