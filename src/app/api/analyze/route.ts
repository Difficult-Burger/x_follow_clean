import { NextRequest, NextResponse } from 'next/server'
import { MOCK_ACCOUNTS } from '@/lib/mock-data'
import { analyzeFollowingList } from '@/lib/claude'

export const maxDuration = 60

export async function POST(request: NextRequest) {
  try {
    const { handle } = await request.json()

    if (!handle || typeof handle !== 'string') {
      return NextResponse.json({ error: 'Please provide a valid X handle' }, { status: 400 })
    }

    const cleanHandle = handle.replace('@', '').trim()
    const accounts = MOCK_ACCOUNTS
    const result = await analyzeFollowingList(cleanHandle, accounts)

    return NextResponse.json(result)
  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      { error: 'Analysis failed. Please try again.' },
      { status: 500 }
    )
  }
}
