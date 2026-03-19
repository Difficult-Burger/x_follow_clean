'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CategorizedAccount } from '@/lib/types'
import { UserMinus, AlertTriangle, ChevronDown, ExternalLink, Check } from 'lucide-react'

function formatCount(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M'
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K'
  return String(n)
}

export default function UnfollowPanel({ accounts }: { accounts: CategorizedAccount[] }) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    new Set(accounts.map(a => a.id))
  )
  const [showConfirm, setShowConfirm] = useState(false)

  const toggleAccount = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const selectAll = () => setSelectedIds(new Set(accounts.map(a => a.id)))
  const deselectAll = () => setSelectedIds(new Set())

  if (accounts.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card overflow-hidden rounded-2xl"
    >
      <div className="border-b border-white/10 px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/20 text-red-400">
              <UserMinus className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">建议取关</h3>
              <p className="text-sm text-gray-400">
                {accounts.length} 个账号处于信息链下游
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <button
              onClick={selectAll}
              className="rounded-lg px-3 py-1 text-gray-400 transition hover:bg-white/5 hover:text-white"
            >
              全选
            </button>
            <button
              onClick={deselectAll}
              className="rounded-lg px-3 py-1 text-gray-400 transition hover:bg-white/5 hover:text-white"
            >
              全不选
            </button>
          </div>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {accounts
          .sort((a, b) => b.chainPosition - a.chainPosition)
          .map((account) => (
            <div
              key={account.id}
              className="flex items-center gap-4 border-b border-white/5 px-6 py-4 transition hover:bg-white/5"
            >
              <button
                onClick={() => toggleAccount(account.id)}
                className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border transition ${
                  selectedIds.has(account.id)
                    ? 'border-red-500 bg-red-500 text-white'
                    : 'border-gray-600 bg-transparent'
                }`}
              >
                {selectedIds.has(account.id) && <Check className="h-3.5 w-3.5" />}
              </button>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate font-medium text-white">
                    {account.displayName}
                  </span>
                  <span className="flex-shrink-0 text-sm text-gray-500">
                    @{account.handle}
                  </span>
                  <span className="flex-shrink-0 rounded-full bg-red-500/20 px-2 py-0.5 text-xs text-red-400">
                    {account.chainPosition}%
                  </span>
                </div>
                <p className="mt-0.5 truncate text-xs text-gray-500">
                  {account.unfollowReason || account.chainReason}
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span>{formatCount(account.followerCount)} 粉丝</span>
                <a
                  href={`https://x.com/${account.handle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 transition hover:text-white"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          ))}
      </div>

      <div className="border-t border-white/10 px-6 py-4">
        <AnimatePresence>
          {!showConfirm ? (
            <motion.button
              key="unfollow-btn"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowConfirm(true)}
              disabled={selectedIds.size === 0}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500/20 py-3 font-medium text-red-400 transition hover:bg-red-500/30 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <UserMinus className="h-4 w-4" />
              一键取关 {selectedIds.size} 个账号
              <ChevronDown className="h-4 w-4" />
            </motion.button>
          ) : (
            <motion.div
              key="confirm-panel"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3"
            >
              <div className="flex items-start gap-2 rounded-lg bg-yellow-500/10 p-3 text-sm text-yellow-400">
                <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <p>
                  一键取关功能需要授权你的 X 账号。此为演示版本，
                  暂不支持实际取关操作。你可以手动前往 X 取关这些账号。
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 rounded-xl border border-white/10 py-2.5 text-sm text-gray-400 transition hover:bg-white/5"
                >
                  返回
                </button>
                <button
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white/10 py-2.5 text-sm text-white transition hover:bg-white/20"
                  onClick={() => {
                    const handles = accounts
                      .filter(a => selectedIds.has(a.id))
                      .map(a => `@${a.handle}`)
                    navigator.clipboard?.writeText(handles.join('\n'))
                    alert('已复制取关列表到剪贴板！你可以手动在 X 中取关这些账号。')
                    setShowConfirm(false)
                  }}
                >
                  复制取关列表
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
