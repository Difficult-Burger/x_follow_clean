'use client'

import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import HowItWorks from '@/components/HowItWorks'
import HandleInput from '@/components/HandleInput'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <HowItWorks />
      <HandleInput />

      <footer className="border-t border-white/5 py-8 text-center text-sm text-gray-600">
        <p>X Follow Clean — 用 AI 清理你的信息流噪音</p>
        <p className="mt-1">Powered by Claude AI</p>
      </footer>
    </main>
  )
}
