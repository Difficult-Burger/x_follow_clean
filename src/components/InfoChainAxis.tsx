'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CategorizedAccount } from '@/lib/types'
import { ChevronDown, ExternalLink, UserMinus, Users, MessageSquare } from 'lucide-react'
import { createPortal } from 'react-dom'

function getPositionColor(position: number): string {
  if (position <= 30) return 'text-emerald-600'
  if (position <= 60) return 'text-amber-600'
  if (position <= 80) return 'text-orange-600'
  return 'text-rose-600'
}

function getPositionBg(position: number): string {
  if (position <= 30) return 'bg-emerald-50 border-emerald-200'
  if (position <= 60) return 'bg-amber-50 border-amber-200'
  if (position <= 80) return 'bg-orange-50 border-orange-200'
  return 'bg-rose-50 border-rose-200'
}

function getDotColor(position: number): string {
  if (position <= 30) return 'bg-emerald-500'
  if (position <= 60) return 'bg-amber-500'
  if (position <= 80) return 'bg-orange-500'
  return 'bg-rose-500'
}

function getDashColor(position: number): string {
  if (position <= 30) return 'border-emerald-300'
  if (position <= 60) return 'border-amber-300'
  if (position <= 80) return 'border-orange-300'
  return 'border-rose-300'
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

function AccountTooltip({
  account,
  onClose,
  anchorRef,
}: {
  account: CategorizedAccount
  onClose: () => void
  anchorRef: React.RefObject<HTMLDivElement>
}) {
  const [pos, setPos] = useState({ top: 0, left: 0 })
  const tooltipRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!anchorRef.current) return
    const rect = anchorRef.current.getBoundingClientRect()
    setPos({
      top: rect.top - 8,
      left: Math.min(Math.max(rect.left + rect.width / 2, 160), window.innerWidth - 160),
    })
  }, [anchorRef])

  const content = (
    <motion.div
      ref={tooltipRef}
      initial={{ opacity: 0, y: 6, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      className="fixed z-[9999] w-72 rounded-xl border border-gray-200 bg-white p-4 shadow-xl"
      style={{
        top: pos.top,
        left: pos.left,
        transform: 'translate(-50%, -100%)',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="mb-2.5 flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-semibold text-gray-900">{account.displayName}</span>
            {account.verified && (
              <svg className="h-3.5 w-3.5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
              </svg>
            )}
          </div>
          <span className="text-xs text-gray-400">@{account.handle}</span>
        </div>
        <button onClick={onClose} className="rounded p-0.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      <p className="mb-2.5 text-xs leading-relaxed text-gray-500">{account.bio}</p>

      <div className="mb-2.5 flex gap-4 text-[11px] text-gray-400">
        <span className="flex items-center gap-1">
          <Users className="h-3 w-3" /> {formatCount(account.followerCount)} 粉丝
        </span>
        <span className="flex items-center gap-1">
          <MessageSquare className="h-3 w-3" /> {formatCount(account.tweetCount)} 推文
        </span>
      </div>

      <div className="mb-2.5 rounded-lg bg-gray-50 p-2.5">
        <div className="mb-1 flex items-center justify-between text-xs">
          <span className="text-gray-500">信息链位置</span>
          <span className={`font-medium ${getPositionColor(account.chainPosition)}`}>
            {getPositionLabel(account.chainPosition)} ({account.chainPosition}%)
          </span>
        </div>
        <div className="h-1.5 rounded-full bg-gray-200">
          <div
            className="axis-gradient h-full rounded-full"
            style={{ width: `${account.chainPosition}%` }}
          />
        </div>
      </div>

      <p className="mb-2.5 text-xs text-gray-500">
        <span className="font-medium text-gray-700">分析：</span>{account.chainReason}
      </p>

      {account.unfollowRecommended && (
        <div className="mb-2.5 flex items-center gap-1.5 rounded-lg bg-rose-50 px-2.5 py-2 text-[11px] text-rose-600">
          <UserMinus className="h-3 w-3 flex-shrink-0" />
          <span>{account.unfollowReason}</span>
        </div>
      )}

      <a
        href={`https://x.com/${account.handle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-gray-500 transition hover:bg-gray-50 hover:text-gray-700"
      >
        查看主页 <ExternalLink className="h-3 w-3" />
      </a>
    </motion.div>
  )

  if (typeof document === 'undefined') return null
  return createPortal(content, document.body)
}

function AccountCard({
  account,
  side,
  isSelected,
  onSelect,
}: {
  account: CategorizedAccount
  side: 'top' | 'bottom'
  isSelected: boolean
  onSelect: (id: string | null) => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className="absolute flex flex-col items-center"
      style={{
        left: `${account.chainPosition}%`,
        transform: 'translateX(-50%)',
        [side === 'top' ? 'bottom' : 'top']: '0',
        width: '100px',
      }}
    >
      {/* Card (above) or dashed line first (below) */}
      {side === 'top' ? (
        <>
          <div ref={cardRef}>
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => { e.stopPropagation(); onSelect(isSelected ? null : account.id) }}
              className={`mb-1 w-full rounded-lg border px-2 py-1.5 text-left transition ${getPositionBg(account.chainPosition)} ${
                isSelected ? 'ring-2 ring-blue-400 ring-offset-1' : ''
              } ${account.unfollowRecommended ? 'border-rose-300' : ''}`}
            >
              <p className="truncate text-[11px] font-medium text-gray-800">{account.displayName}</p>
              <p className="truncate text-[10px] text-gray-400">@{account.handle}</p>
            </motion.button>
          </div>
          {/* Dashed line down to axis */}
          <div className={`w-px border-l border-dashed ${getDashColor(account.chainPosition)}`} style={{ height: '20px' }} />
          {/* Arrow point */}
          <div className={`h-1.5 w-1.5 rotate-45 ${getDotColor(account.chainPosition)}`} style={{ marginTop: '-2px' }} />
        </>
      ) : (
        <>
          {/* Arrow point */}
          <div className={`h-1.5 w-1.5 rotate-45 ${getDotColor(account.chainPosition)}`} style={{ marginBottom: '-2px' }} />
          {/* Dashed line up to card */}
          <div className={`w-px border-l border-dashed ${getDashColor(account.chainPosition)}`} style={{ height: '20px' }} />
          <div ref={cardRef}>
            <motion.button
              whileHover={{ y: 2 }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => { e.stopPropagation(); onSelect(isSelected ? null : account.id) }}
              className={`mt-1 w-full rounded-lg border px-2 py-1.5 text-left transition ${getPositionBg(account.chainPosition)} ${
                isSelected ? 'ring-2 ring-blue-400 ring-offset-1' : ''
              } ${account.unfollowRecommended ? 'border-rose-300' : ''}`}
            >
              <p className="truncate text-[11px] font-medium text-gray-800">{account.displayName}</p>
              <p className="truncate text-[10px] text-gray-400">@{account.handle}</p>
            </motion.button>
          </div>
        </>
      )}

      <AnimatePresence>
        {isSelected && (
          <AccountTooltip
            account={account}
            onClose={() => onSelect(null)}
            anchorRef={cardRef as React.RefObject<HTMLDivElement>}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default function InfoChainAxis({
  categoryLabel,
  emoji,
  accounts,
}: {
  categoryLabel: string
  emoji: string
  color: string
  accounts: CategorizedAccount[]
}) {
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null)
  const [expanded, setExpanded] = useState(true)

  useEffect(() => {
    if (selectedAccount) {
      const handler = () => setSelectedAccount(null)
      document.addEventListener('click', handler)
      return () => document.removeEventListener('click', handler)
    }
  }, [selectedAccount])

  const sorted = [...accounts].sort((a, b) => a.chainPosition - b.chainPosition)

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="card mb-4 overflow-visible rounded-xl"
    >
      {/* Category header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between px-5 py-3.5 text-left transition hover:bg-gray-50"
      >
        <div className="flex items-center gap-2.5">
          <span className="text-xl">{emoji}</span>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">{categoryLabel}</h3>
            <p className="text-xs text-gray-400">{accounts.length} 个账号</p>
          </div>
        </div>
        <ChevronDown
          className={`h-4 w-4 text-gray-400 transition-transform ${expanded ? '' : '-rotate-90'}`}
        />
      </button>

      {expanded && (
        <div className="px-5 pb-5">
          {/* Axis labels */}
          <div className="mb-1 flex justify-between text-[10px] font-medium">
            <span className="text-emerald-600">◀ 上游（信息源头）</span>
            <span className="text-rose-500">下游（信息末端）▶</span>
          </div>

          {/* Main axis area */}
          <div className="relative" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
            {/* Top accounts */}
            <div className="pointer-events-auto absolute left-0 right-0" style={{ top: '0', height: '80px' }}>
              {sorted.filter((_, i) => i % 2 === 0).map((account) => (
                <AccountCard
                  key={account.id}
                  account={account}
                  side="top"
                  isSelected={selectedAccount === account.id}
                  onSelect={setSelectedAccount}
                />
              ))}
            </div>

            {/* Axis line */}
            <div className="relative">
              <div className="axis-gradient h-[3px] w-full rounded-full" />
              {/* Tick marks */}
              {[0, 25, 50, 75, 100].map(tick => (
                <div
                  key={tick}
                  className="absolute -top-1 h-[11px] w-px bg-gray-300"
                  style={{ left: `${tick}%` }}
                />
              ))}
              {/* Dot markers on axis */}
              {sorted.map(account => (
                <div
                  key={account.id + '-dot'}
                  className={`absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full ${getDotColor(account.chainPosition)} ring-2 ring-white`}
                  style={{ left: `${account.chainPosition}%` }}
                />
              ))}
            </div>

            {/* Bottom accounts */}
            <div className="pointer-events-auto absolute left-0 right-0" style={{ bottom: '0', height: '80px' }}>
              {sorted.filter((_, i) => i % 2 !== 0).map((account) => (
                <AccountCard
                  key={account.id}
                  account={account}
                  side="bottom"
                  isSelected={selectedAccount === account.id}
                  onSelect={setSelectedAccount}
                />
              ))}
            </div>
          </div>

          {/* Scale */}
          <div className="flex justify-between text-[10px] text-gray-400">
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
