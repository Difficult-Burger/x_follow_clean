'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowRight, Loader2 } from 'lucide-react'

export default function HandleInput() {
  const [handle, setHandle] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!handle.trim()) return

    const cleanHandle = handle.replace('@', '').trim()
    setLoading(true)
    router.push(`/analyze?handle=${encodeURIComponent(cleanHandle)}`)
  }

  return (
    <section id="start" className="py-24">
      <div className="mx-auto max-w-2xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-8 sm:p-12"
        >
          <div className="mb-8 text-center">
            <h2 className="mb-3 text-2xl font-bold text-white sm:text-3xl">
              开始分析
            </h2>
            <p className="text-gray-400">
              输入你的 X 用户名，AI 将自动分析你的关注列表
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-gray-500">
                @
              </span>
              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                placeholder="your_handle"
                className="w-full rounded-xl border border-white/10 bg-white/5 py-4 pl-10 pr-4 text-lg text-white placeholder-gray-600 outline-none transition focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={!handle.trim() || loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 py-4 text-lg font-semibold text-white transition-all hover:from-blue-600 hover:to-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  分析中...
                </>
              ) : (
                <>
                  开始分析
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-gray-500">
            当前版本使用模拟数据进行演示。
            确保你的关注列表已设为公开可见。
          </p>
        </motion.div>
      </div>
    </section>
  )
}
