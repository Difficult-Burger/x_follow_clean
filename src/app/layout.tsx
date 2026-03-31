import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'X Follow Clean - 智能清理你的关注列表',
  description: '分析你的 X (Twitter) 关注列表，识别信息链上下游，推荐取关低价值账号',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="font-sans antialiased bg-gray-50 text-gray-900">{children}</body>
    </html>
  )
}
