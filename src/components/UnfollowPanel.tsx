'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CategorizedAccount } from '@/lib/types'
import { UserMinus, AlertTriangle, ExternalLink, Check } from 'lucide-react'

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
      className="card overflow-hidden rounded-xl"
    >
      <div className="border-b border-gray-100 px-5 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="inline-flex rounded-lg bg-rose-50 p-2 text-rose-600">
              <UserMinus className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">建议取关</h3>
              <p className="text-xs text-gray-500">{accounts.length} 个账号处于信息链下游</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <button
              onClick={selectAll}
              className="rounded px-2 py-1 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
            >
              全选
            </button>
            <button
              onClick={deselectAll}
              className="rounded px-2 py-1 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
            >
              全不选
            </button>
          </div>
        </div>
      </div>

      <div className="max-h-80 overflow-y-auto">
        {accounts
          .sort((a, b) => b.chainPosition - a.chainPosition)
          .map((account) => (
            <div
              key={account.id}
              className="flex items-center gap-3 border-b border-gray-50 px-5 py-3 transition hover:bg-gray-50"
            >
              <button
                onClick={() => toggleAccount(account.id)}
                className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border transition ${
                  selectedIds.has(account.id)
                    ? 'border-rose-500 bg-rose-500 text-white'
                    : 'border-gray-300 bg-white'
                }`}
              >
                {selectedIds.has(account.id) && <Check className="h-3 w-3" />}
              </button>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="truncate text-sm font-medium text-gray-900">
                    {account.displayName}
                  </span>
                  <span className="flex-shrink-0 text-xs text-gray-400">
                    @{account.handle}
                  </span>
                  <span className="flex-shrink-0 rounded-full bg-rose-100 px-1.5 py-0.5 text-[10px] font-medium text-rose-600">
                    {account.chainPosition}%
                  </span>
                </div>
                <p className="mt-0.5 truncate text-[11px] text-gray-400">
                  {account.unfollowReason || account.chainReason}
                </p>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-gray-400">
                <span>{formatCount(account.followerCount)} 粉丝</span>
                <a
                  href={`https://x.com/${account.handle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 transition hover:text-gray-600"
                >
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          ))}
      </div>

      <div className="border-t border-gray-100 px-5 py-3">
        <AnimatePresence>
          {!showConfirm ? (
            <motion.button
              key="unfollow-btn"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowConfirm(true)}
              disabled={selectedIds.size === 0}
              className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-rose-50 py-2.5 text-sm font-medium text-rose-600 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <UserMinus className="h-3.5 w-3.5" />
              一键取关 {selectedIds.size} 个账号
            </motion.button>
          ) : (
            <motion.div
              key="confirm-panel"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-2.5"
            >
              <div className="flex items-start gap-2 rounded-lg bg-amber-50 p-3 text-xs text-amber-700">
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
                <p>
                  一键取关需要授权 X 账号。此为演示版本，暂不支持实际操作。
                  可手动前往 X 取关。
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 rounded-lg border border-gray-200 py-2 text-xs text-gray-600 transition hover:bg-gray-50"
                >
                  返回
                </button>
                <button
                  className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-gray-900 py-2 text-xs text-white transition hover:bg-gray-800"
                  onClick={() => {
                    const handles = accounts
                      .filter(a => selectedIds.has(a.id))
                      .map(a => `@${a.handle}`)
                    navigator.clipboard?.writeText(handles.join('\n'))
                    alert('已复制取关列表到剪贴板！')
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
