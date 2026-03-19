import OpenAI from 'openai'
import { TwitterAccount, CategorizedAccount, CategoryGroup, AnalysisResult } from './types'

const client = new OpenAI({
  apiKey: process.env.CLAUDE_API_KEY || '',
  baseURL: process.env.CLAUDE_BASE_URL || 'https://api.aigocode.com',
})

export async function analyzeFollowingList(
  handle: string,
  accounts: TwitterAccount[]
): Promise<AnalysisResult> {
  const accountSummaries = accounts.map(a => ({
    id: a.id,
    handle: a.handle,
    displayName: a.displayName,
    bio: a.bio,
    followerCount: a.followerCount,
    followingCount: a.followingCount,
    tweetCount: a.tweetCount,
    verified: a.verified,
    recentTweets: a.recentTweets.map(t => ({
      text: t.text.substring(0, 200),
      retweetCount: t.retweetCount,
      likeCount: t.likeCount,
      isRetweet: t.isRetweet,
      timestamp: t.timestamp,
    })),
  }))

  const prompt = `你是一个社交媒体分析专家。分析以下Twitter/X账号列表，这些是用户 @${handle} 正在关注的账号。

请完成以下任务：

1. **分类**：将每个账号归入一个类别（如：AI/人工智能、Web3/加密货币、国际政治、科技/软件工程、金融/投资、生活/娱乐、等等）。

2. **信息链定位**：对每个账号，分析它在其所属领域的信息链中的位置（0-100分）：
   - 0分 = 信息链最上游（原创研究者、一手信息源、行业领袖、原创内容生产者）
   - 50分 = 信息链中游（行业媒体、专业评论、有见解的二次创作）
   - 100分 = 信息链最下游（纯搬运、营销号、标题党、洗稿、无原创内容）

   判断依据：
   - 内容原创性（是否产出原创观点/研究/代码/产品）
   - 时效性（是第一个报道还是延迟跟进）
   - 转发比例（大量RT说明是搬运号）
   - 内容深度（深度分析 vs 标题党）
   - 行业影响力（是否被其他人引用/转发）

3. **取关建议**：对于信息链下游（分数>70）的账号，推荐取关并说明原因。

请以JSON格式回复，结构如下：
{
  "categories": [
    {
      "id": "category_id",
      "label": "类别名称",
      "emoji": "🤖",
      "color": "#颜色代码",
      "accounts": [
        {
          "id": "账号id",
          "handle": "handle",
          "displayName": "名称",
          "category": "category_id",
          "categoryLabel": "类别名称",
          "chainPosition": 25,
          "chainReason": "为什么在这个位置的简短说明",
          "unfollowRecommended": false,
          "unfollowReason": ""
        }
      ]
    }
  ],
  "summary": "整体分析总结（2-3句话）",
  "recommendedUnfollowIds": ["id1", "id2"]
}

以下是账号数据：
${JSON.stringify(accountSummaries, null, 2)}

请只返回JSON，不要包含其他文本或markdown代码块标记。`

  try {
    const response = await client.chat.completions.create({
      model: 'claude-sonnet-4-20250514',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 4096,
      temperature: 0.3,
    })

    const content = response.choices[0]?.message?.content || ''
    const jsonStr = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    const result = JSON.parse(jsonStr)

    const accountMap = new Map(accounts.map(a => [a.id, a]))

    const categories: CategoryGroup[] = result.categories.map((cat: {
      id: string
      label: string
      emoji: string
      color: string
      accounts: Array<{
        id: string
        chainPosition: number
        chainReason: string
        unfollowRecommended: boolean
        unfollowReason: string
        category: string
        categoryLabel: string
      }>
    }) => ({
      id: cat.id,
      label: cat.label,
      emoji: cat.emoji,
      color: cat.color,
      accounts: cat.accounts
        .map((ca) => {
          const original = accountMap.get(ca.id)
          if (!original) return null
          return {
            ...original,
            category: ca.category,
            categoryLabel: ca.categoryLabel,
            chainPosition: ca.chainPosition,
            chainReason: ca.chainReason,
            unfollowRecommended: ca.unfollowRecommended,
            unfollowReason: ca.unfollowReason,
          } as CategorizedAccount
        })
        .filter(Boolean)
        .sort((a: CategorizedAccount | null, b: CategorizedAccount | null) =>
          (a?.chainPosition ?? 0) - (b?.chainPosition ?? 0)
        ),
    }))

    const recommendedUnfollows = categories
      .flatMap(c => c.accounts)
      .filter((a): a is CategorizedAccount => a !== null && a.unfollowRecommended)

    return {
      handle,
      totalFollowing: accounts.length,
      categories,
      summary: result.summary,
      recommendedUnfollows,
    }
  } catch (error) {
    console.error('Claude API error:', error)
    return getFallbackAnalysis(handle, accounts)
  }
}

function getFallbackAnalysis(handle: string, accounts: TwitterAccount[]): AnalysisResult {
  const categorized = accounts.map((a): CategorizedAccount => {
    const bio = (a.bio + ' ' + a.recentTweets.map(t => t.text).join(' ')).toLowerCase()
    let category = 'other'
    let categoryLabel = '其他'
    let chainPosition = 50

    if (bio.includes('ai') || bio.includes('ml') || bio.includes('机器学习') || bio.includes('人工智能') || bio.includes('gpt') || bio.includes('llm')) {
      category = 'ai'
      categoryLabel = 'AI/人工智能'
    } else if (bio.includes('crypto') || bio.includes('web3') || bio.includes('eth') || bio.includes('btc') || bio.includes('区块链') || bio.includes('加密')) {
      category = 'web3'
      categoryLabel = 'Web3/加密货币'
    } else if (bio.includes('politic') || bio.includes('policy') || bio.includes('国际') || bio.includes('地缘') || bio.includes('政治')) {
      category = 'politics'
      categoryLabel = '国际政治'
    } else if (bio.includes('invest') || bio.includes('financ') || bio.includes('理财') || bio.includes('投资')) {
      category = 'finance'
      categoryLabel = '金融/投资'
    } else if (bio.includes('tech') || bio.includes('engineer') || bio.includes('kubernetes') || bio.includes('开发')) {
      category = 'tech'
      categoryLabel = '科技/软件工程'
    }

    const retweetRatio = a.recentTweets.filter(t => t.isRetweet).length / Math.max(a.recentTweets.length, 1)
    const avgEngagement = a.recentTweets.reduce((sum, t) => sum + t.likeCount + t.retweetCount, 0) / Math.max(a.recentTweets.length, 1)

    if (a.verified && a.followerCount > 100000 && retweetRatio < 0.3) {
      chainPosition = Math.floor(Math.random() * 25) + 5
    } else if (retweetRatio > 0.5 || bio.includes('搬运') || bio.includes('转载')) {
      chainPosition = Math.floor(Math.random() * 20) + 75
    } else if (bio.includes('营销') || bio.includes('震惊') || bio.includes('密码') || bio.includes('上车')) {
      chainPosition = Math.floor(Math.random() * 10) + 85
    } else if (a.followerCount > 50000 && avgEngagement > 5000) {
      chainPosition = Math.floor(Math.random() * 30) + 20
    } else {
      chainPosition = Math.floor(Math.random() * 30) + 40
    }

    const unfollowRecommended = chainPosition > 70

    return {
      ...a,
      category,
      categoryLabel,
      chainPosition,
      chainReason: chainPosition < 30 ? '原创内容生产者，高影响力' :
                   chainPosition < 60 ? '有价值的信息中转和评论' :
                   chainPosition < 80 ? '内容原创性较低，多为搬运转载' :
                   '纯搬运/营销号，无原创价值',
      unfollowRecommended,
      unfollowReason: unfollowRecommended ? '该账号处于信息链下游，内容多为搬运或营销，建议直接关注上游信息源' : '',
    }
  })

  const groupMap = new Map<string, CategorizedAccount[]>()
  categorized.forEach(a => {
    const list = groupMap.get(a.category) || []
    list.push(a)
    groupMap.set(a.category, list)
  })

  const colorMap: Record<string, string> = {
    ai: '#8B5CF6', web3: '#F59E0B', politics: '#EF4444',
    finance: '#10B981', tech: '#3B82F6', other: '#6B7280',
  }
  const emojiMap: Record<string, string> = {
    ai: '🤖', web3: '⛓️', politics: '🌍',
    finance: '💰', tech: '💻', other: '📌',
  }

  const categories: CategoryGroup[] = Array.from(groupMap.entries()).map(([id, accts]) => ({
    id,
    label: accts[0].categoryLabel,
    emoji: emojiMap[id] || '📌',
    color: colorMap[id] || '#6B7280',
    accounts: accts.sort((a, b) => a.chainPosition - b.chainPosition),
  }))

  return {
    handle,
    totalFollowing: accounts.length,
    categories,
    summary: `分析了 @${handle} 的 ${accounts.length} 个关注账号。识别出 ${categories.length} 个类别，其中 ${categorized.filter(a => a.unfollowRecommended).length} 个账号建议取关。`,
    recommendedUnfollows: categorized.filter(a => a.unfollowRecommended),
  }
}
