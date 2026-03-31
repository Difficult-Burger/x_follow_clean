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
    <section id="start" className="py-16">
      <div className="mx-auto max-w-lg px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card rounded-2xl p-8"
        >
          <div className="mb-6 text-center">
            <h2 className="mb-1.5 text-xl font-bold text-gray-900">开始分析</h2>
            <p className="text-sm text-gray-500">
              输入你的 X 用户名，AI 将自动分析关注列表
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base text-gray-400">
                @
              </span>
              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                placeholder="your_handle"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-9 pr-4 text-base text-gray-900 placeholder-gray-400 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={!handle.trim() || loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  分析中...
                </>
              ) : (
                <>
                  开始分析
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <p className="mt-4 text-center text-[11px] text-gray-400">
            当前版本使用模拟数据演示 · 确保关注列表已设为公开
          </p>
        </motion.div>
      </div>
    </section>
  )
}
