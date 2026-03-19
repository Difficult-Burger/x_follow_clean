'use client'

import { motion } from 'framer-motion'
import { Scissors } from 'lucide-react'

export default function Header() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <a href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-violet-600">
            <Scissors className="h-4 w-4 text-white" />
          </div>
          <span className="text-base font-bold tracking-tight">
            Follow<span className="gradient-text">Clean</span>
          </span>
        </a>
        <nav className="flex items-center gap-5">
          <a href="#how-it-works" className="text-sm text-gray-500 transition hover:text-gray-900">
            工作原理
          </a>
          <a
            href="#start"
            className="rounded-lg bg-gray-900 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            开始分析
          </a>
        </nav>
      </div>
    </motion.header>
  )
}
