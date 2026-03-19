'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CategorizedAccount } from '@/lib/types'
import { ChevronRight, ExternalLink, UserMinus, Users, MessageSquare } from 'lucide-react'

function getPositionColor(position: number): string {
  if (position <= 30) return 'bg-green-500'
  if (position <= 60) return 'bg-yellow-500'
  if (position <= 80) return 'bg-orange-500'
  return 'bg-red-500'
}

function getPositionLabel(position: number): string {
  if (position <= 20) return '源头'
  if (position <= 40) return '上游'
  if (position <= 60) return '中游'
  if (position <= 80) return '下游'
  return '末端'
}

function formatCount(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M'
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K'
  return String(n)
}

function AccountTooltip({ account, onClose }: { account: CategorizedAccount; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="absolute bottom-full left-1/2 z-50 mb-3 w-72 -translate-x-1/2 rounded-xl border border-white/10 bg-gray-900/95 p-4 shadow-2xl backdrop-blur-xl"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="mb-3 flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-white">{account.displayName}</span>
            {account.verified && (
              <svg className="h-4 w-4 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
              </svg>
            )}
          </div>
          <span className="text-sm text-gray-400">@{account.handle}</span>
        </div>
        <button onClick={onClose} className="text-gray-500 hover:text-white">✕</button>
      </div>

      <p className="mb-3 text-xs leading-relaxed text-gray-300">{account.bio}</p>

      <div className="mb-3 flex gap-4 text-xs text-gray-400">
        <span className="flex items-center gap-1">
          <Users className="h-3 w-3" /> {formatCount(account.followerCount)}
        </span>
        <span className="flex items-center gap-1">
          <MessageSquare className="h-3 w-3" /> {formatCount(account.tweetCount)}
        </span>
      </div>

      <div className="mb-3 rounded-lg bg-white/5 p-2.5">
        <div className="mb-1 flex items-center justify-between text-xs">
          <span className="text-gray-400">信息链位置</span>
          <span className={`font-medium ${
            account.chainPosition <= 30 ? 'text-green-400' :
            account.chainPosition <= 60 ? 'text-yellow-400' :
            account.chainPosition <= 80 ? 'text-orange-400' : 'text-red-400'
          }`}>
            {getPositionLabel(account.chainPosition)} ({account.chainPosition}%)
          </span>
        </div>
        <div className="h-1.5 rounded-full bg-white/10">
          <div
            className="axis-gradient h-full rounded-full transition-all"
            style={{ width: `${account.chainPosition}%` }}
          />
        </div>
      </div>

      <p className="mb-3 text-xs text-gray-400">
        <span className="font-medium text-gray-300">分析：</span> {account.chainReason}
      </p>

      {account.unfollowRecommended && (
        <div className="flex items-center gap-2 rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-400">
          <UserMinus className="h-3.5 w-3.5 flex-shrink-0" />
          <span>{account.unfollowReason}</span>
        </div>
      )}

      <a
        href={`https://x.com/${account.handle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 flex items-center justify-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-gray-400 transition hover:border-white/20 hover:text-white"
      >
        查看主页 <ExternalLink className="h-3 w-3" />
      </a>
    </motion.div>
  )
}

export default function InfoChainAxis({
  categoryLabel,
  emoji,
  color,
  accounts,
}: {
  categoryLabel: string
  emoji: string
  color: string
  accounts: CategorizedAccount[]
}) {
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null)
  const [expanded, setExpanded] = useState(true)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card mb-6 overflow-hidden rounded-2xl"
    >
      {/* Category header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between px-6 py-4 text-left transition hover:bg-white/5"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{emoji}</span>
          <div>
            <h3 className="text-lg font-bold text-white">{categoryLabel}</h3>
            <p className="text-sm text-gray-400">{accounts.length} 个账号</p>
          </div>
        </div>
        <ChevronRight
          className={`h-5 w-5 text-gray-400 transition-transform ${expanded ? 'rotate-90' : ''}`}
        />
      </button>

      {expanded && (
        <div className="px-6 pb-6">
          {/* Axis labels */}
          <div className="mb-2 flex justify-between text-xs text-gray-500">
            <span className="text-green-400">◀ 上游（信息源头）</span>
            <span className="text-red-400">下游（信息末端）▶</span>
          </div>

          {/* Axis line */}
          <div className="relative mb-8">
            <div className="axis-gradient h-1.5 w-full rounded-full opacity-60" />

            {/* Tick marks */}
            <div className="absolute -top-1 left-0 h-3.5 w-px bg-green-500/50" />
            <div className="absolute -top-1 left-1/4 h-3.5 w-px bg-yellow-500/30" />
            <div className="absolute -top-1 left-1/2 h-3.5 w-px bg-yellow-500/50" />
            <div className="absolute -top-1 left-3/4 h-3.5 w-px bg-orange-500/30" />
            <div className="absolute -top-1 right-0 h-3.5 w-px bg-red-500/50" />

            {/* Account dots */}
            {accounts.map((account, i) => (
              <div
                key={account.id}
                className="absolute"
                style={{
                  left: `${account.chainPosition}%`,
                  top: '-8px',
                  transform: 'translateX(-50%)',
                }}
              >
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedAccount(
                      selectedAccount === account.id ? null : account.id
                    )}
                    className={`relative h-6 w-6 rounded-full border-2 border-gray-900 ${getPositionColor(account.chainPosition)} shadow-lg transition-all ${
                      account.unfollowRecommended ? 'ring-2 ring-red-500/50' : ''
                    } ${selectedAccount === account.id ? 'ring-2 ring-white/50 scale-125' : ''}`}
                    title={`@${account.handle}`}
                  >
                    <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-white">
                      {account.displayName.charAt(0)}
                    </span>
                  </motion.button>

                  {/* Handle label */}
                  <div className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] ${
                    i % 2 === 0 ? 'top-8' : 'top-8 mt-3'
                  } ${account.unfollowRecommended ? 'text-red-400' : 'text-gray-500'}`}>
                    @{account.handle.length > 12 ? account.handle.substring(0, 12) + '…' : account.handle}
                  </div>

                  {/* Tooltip */}
                  {selectedAccount === account.id && (
                    <AccountTooltip
                      account={account}
                      onClose={() => setSelectedAccount(null)}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Scale labels */}
          <div className="flex justify-between text-[10px] text-gray-600">
            <span>0</span>
            <span>25</span>
            <span>50</span>
            <span>75</span>
            <span>100</span>
          </div>
        </div>
      )}
    </motion.div>
  )
}
