'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Loader2, RefreshCw, Sparkles } from 'lucide-react'
import Header from '@/components/Header'
import InfoChainAxis from '@/components/InfoChainAxis'
import UnfollowPanel from '@/components/UnfollowPanel'
import AnalysisStats from '@/components/AnalysisStats'
import { AnalysisResult } from '@/lib/types'

const LOADING_STEPS = [
  { text: '连接到 X 平台...', duration: 1500 },
  { text: '获取关注列表...', duration: 2000 },
  { text: '分析账号内容和信息链位置...', duration: 3000 },
  { text: 'AI 正在进行深度分析...', duration: 0 },
]

export default function AnalyzeContent() {
  const searchParams = useSearchParams()
  const handle = searchParams.get('handle') || ''

  const [loading, setLoading] = useState(true)
  const [loadingStep, setLoadingStep] = useState(0)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const runAnalysis = useCallback(async () => {
    if (!handle) return
    setLoading(true)
    setError(null)
    setLoadingStep(0)

    for (let i = 0; i < LOADING_STEPS.length - 1; i++) {
      setLoadingStep(i)
      await new Promise(r => setTimeout(r, LOADING_STEPS[i].duration))
    }
    setLoadingStep(LOADING_STEPS.length - 1)

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ handle }),
      })

      if (!res.ok) {
        throw new Error('Analysis failed')
      }

      const data = await res.json()
      setResult(data)
    } catch (err) {
      setError('分析失败，请稍后重试。')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [handle])

  useEffect(() => {
    runAnalysis()
  }, [runAnalysis])

  if (!handle) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="mb-4 text-gray-400">请提供你的 X 用户名</p>
          <a href="/" className="text-blue-400 hover:underline">返回首页</a>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen pb-20">
      <Header />

      <div className="mx-auto max-w-5xl px-6 pt-24">
        {/* Page header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <a
              href="/"
              className="mb-2 inline-flex items-center gap-1 text-sm text-gray-500 transition hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" /> 返回首页
            </a>
            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              @{handle} 的关注列表分析
            </h1>
          </div>
          {!loading && (
            <button
              onClick={runAnalysis}
              className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-400 transition hover:bg-white/5 hover:text-white"
            >
              <RefreshCw className="h-4 w-4" /> 重新分析
            </button>
          )}
        </div>

        {/* Loading state */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-32"
          >
            <div className="relative mb-8">
              <div className="h-20 w-20 animate-spin rounded-full border-4 border-white/10 border-t-blue-500" />
              <Sparkles className="absolute inset-0 m-auto h-8 w-8 animate-pulse text-blue-400" />
            </div>
            <div className="space-y-3 text-center">
              {LOADING_STEPS.map((step, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{
                    opacity: i <= loadingStep ? 1 : 0.3,
                    x: 0,
                  }}
                  className={`flex items-center gap-2 text-sm ${
                    i < loadingStep ? 'text-green-400' :
                    i === loadingStep ? 'text-white' : 'text-gray-600'
                  }`}
                >
                  {i < loadingStep ? (
                    <span className="text-green-400">✓</span>
                  ) : i === loadingStep ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <span className="text-gray-600">○</span>
                  )}
                  {step.text}
                </motion.p>
              ))}
            </div>
          </motion.div>
        )}

        {/* Error state */}
        {error && (
          <div className="glass-card mx-auto max-w-md rounded-2xl p-8 text-center">
            <p className="mb-4 text-red-400">{error}</p>
            <button
              onClick={runAnalysis}
              className="rounded-lg bg-white/10 px-6 py-2 text-sm text-white transition hover:bg-white/20"
            >
              重试
            </button>
          </div>
        )}

        {/* Results */}
        {result && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Summary */}
            <div className="glass-card mb-8 rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <Sparkles className="mt-1 h-5 w-5 flex-shrink-0 text-purple-400" />
                <div>
                  <h3 className="mb-1 font-semibold text-white">AI 分析总结</h3>
                  <p className="text-sm leading-relaxed text-gray-300">{result.summary}</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <AnalysisStats result={result} />

            {/* Category axes */}
            <div className="mb-8">
              <h2 className="mb-4 text-xl font-bold text-white">信息链分析</h2>
              <p className="mb-6 text-sm text-gray-400">
                每条轴线代表一个领域。从左到右，账号从信息源头（上游）到信息末端（下游）排列。
                点击圆点查看详情。
                <span className="text-red-400"> 红色标记</span>的账号建议取关。
              </p>

              {result.categories.map(category => (
                <InfoChainAxis
                  key={category.id}
                  categoryLabel={category.label}
                  emoji={category.emoji}
                  color={category.color}
                  accounts={category.accounts}
                />
              ))}
            </div>

            {/* Unfollow recommendations */}
            <div className="mb-8">
              <h2 className="mb-4 text-xl font-bold text-white">取关建议</h2>
              <UnfollowPanel accounts={result.recommendedUnfollows} />
            </div>
          </motion.div>
        )}
      </div>
    </main>
  )
}
