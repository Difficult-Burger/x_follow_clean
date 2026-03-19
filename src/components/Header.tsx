'use client'

import { motion } from 'framer-motion'
import { Scissors } from 'lucide-react'

export default function Header() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
            <Scissors className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold text-white">
            X Follow <span className="gradient-text">Clean</span>
          </span>
        </a>
        <nav className="flex items-center gap-6">
          <a href="#how-it-works" className="text-sm text-gray-400 transition hover:text-white">
            工作原理
          </a>
          <a href="#start" className="text-sm text-gray-400 transition hover:text-white">
            开始分析
          </a>
        </nav>
      </div>
    </motion.header>
  )
}
