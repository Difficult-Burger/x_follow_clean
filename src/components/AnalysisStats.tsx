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
      icon: <Users className="h-4 w-4" />,
      label: '分析账号',
      value: result.totalFollowing,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      icon: <FolderTree className="h-4 w-4" />,
      label: '识别分类',
      value: result.categories.length,
      color: 'text-violet-600',
      bg: 'bg-violet-50',
    },
    {
      icon: <Shield className="h-4 w-4" />,
      label: '上游源头',
      value: upstreamCount,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      icon: <TrendingDown className="h-4 w-4" />,
      label: '建议取关',
      value: result.recommendedUnfollows.length,
      color: 'text-rose-600',
      bg: 'bg-rose-50',
    },
  ]

  return (
    <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07 }}
          className="card rounded-xl p-4 text-center"
        >
          <div className={`mx-auto mb-2 inline-flex rounded-lg ${stat.bg} p-2 ${stat.color}`}>
            {stat.icon}
          </div>
          <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
          <div className="text-xs text-gray-500">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  )
}
