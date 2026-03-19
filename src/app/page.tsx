'use client'

import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import HowItWorks from '@/components/HowItWorks'
import HandleInput from '@/components/HandleInput'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection />
      <HowItWorks />
      <HandleInput />

      <footer className="border-t border-gray-100 py-6 text-center text-xs text-gray-400">
        <p>FollowClean — AI 驱动的信息流优化 · Powered by Claude</p>
      </footer>
    </main>
  )
}
