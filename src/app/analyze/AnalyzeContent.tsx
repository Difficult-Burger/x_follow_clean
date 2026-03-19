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

      if (!res.ok) throw new Error('Analysis failed')
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
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="mb-3 text-sm text-gray-500">请提供 X 用户名</p>
          <a href="/" className="text-sm text-blue-600 hover:underline">返回首页</a>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <Header />

      <div className="mx-auto max-w-5xl px-6 pt-20">
        {/* Page header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <a
              href="/"
              className="mb-1 inline-flex items-center gap-1 text-xs text-gray-400 transition hover:text-gray-600"
            >
              <ArrowLeft className="h-3 w-3" /> 返回首页
            </a>
            <h1 className="text-xl font-bold text-gray-900">
              @{handle} <span className="font-normal text-gray-400">的关注列表分析</span>
            </h1>
          </div>
          {!loading && (
            <button
              onClick={runAnalysis}
              className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-gray-500 transition hover:bg-gray-50 hover:text-gray-700"
            >
              <RefreshCw className="h-3 w-3" /> 重新分析
            </button>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-32"
          >
            <div className="relative mb-6">
              <div className="h-14 w-14 animate-spin rounded-full border-[3px] border-gray-200 border-t-blue-600" />
              <Sparkles className="absolute inset-0 m-auto h-5 w-5 animate-pulse text-blue-500" />
            </div>
            <div className="space-y-2 text-center">
              {LOADING_STEPS.map((step, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: i <= loadingStep ? 1 : 0.3, x: 0 }}
                  className={`flex items-center gap-2 text-sm ${
                    i < loadingStep ? 'text-emerald-600' :
                    i === loadingStep ? 'text-gray-900' : 'text-gray-300'
                  }`}
                >
                  {i < loadingStep ? (
                    <span>✓</span>
                  ) : i === loadingStep ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <span className="text-gray-300">○</span>
                  )}
                  {step.text}
                </motion.p>
              ))}
            </div>
          </motion.div>
        )}

        {/* Error */}
        {error && (
          <div className="card mx-auto max-w-sm rounded-xl p-6 text-center">
            <p className="mb-3 text-sm text-rose-600">{error}</p>
            <button
              onClick={runAnalysis}
              className="rounded-lg bg-gray-900 px-5 py-2 text-xs text-white transition hover:bg-gray-800"
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
            transition={{ duration: 0.4 }}
          >
            {/* Summary */}
            <div className="card mb-6 rounded-xl p-5">
              <div className="flex items-start gap-2.5">
                <div className="inline-flex rounded-lg bg-violet-50 p-1.5 text-violet-600">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="mb-0.5 text-sm font-semibold text-gray-900">AI 分析总结</h3>
                  <p className="text-sm leading-relaxed text-gray-600">{result.summary}</p>
                </div>
              </div>
            </div>

            <AnalysisStats result={result} />

            {/* Category axes */}
            <div className="mb-6">
              <h2 className="mb-1.5 text-base font-bold text-gray-900">信息链分析</h2>
              <p className="mb-5 text-xs text-gray-500">
                每条轴线代表一个领域，从左（上游源头）到右（下游末端）。
                点击账号卡片查看详情。
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

            {/* Unfollow */}
            <div className="mb-6">
              <h2 className="mb-3 text-base font-bold text-gray-900">取关建议</h2>
              <UnfollowPanel accounts={result.recommendedUnfollows} />
            </div>
          </motion.div>
        )}
      </div>
    </main>
  )
}
