'use client'

import { Suspense } from 'react'
import AnalyzeContent from './AnalyzeContent'

export default function AnalyzePage() {
  return (
    <Suspense fallback={<AnalyzeLoading />}>
      <AnalyzeContent />
    </Suspense>
  )
}

function AnalyzeLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-blue-500" />
        <p className="text-gray-400">加载中...</p>
      </div>
    </main>
  )
}
