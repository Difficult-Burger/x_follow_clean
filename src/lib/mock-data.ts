import { TwitterAccount } from './types'

export const MOCK_ACCOUNTS: TwitterAccount[] = [
  // === AI/ML Category ===
  {
    id: '1',
    handle: 'kaborathy',
    displayName: 'Andrej Karpathy',
    avatar: '',
    bio: 'Building Eureka Labs. Previously Director of AI at Tesla, founding team OpenAI. Stanford CS PhD.',
    followerCount: 980000,
    followingCount: 520,
    tweetCount: 3200,
    verified: true,
    recentTweets: [
      { id: 't1', text: 'New blog post: "Deep dive into tokenization" — exploring how BPE, WordPiece and Unigram compare in practice for LLMs. Key finding: the tokenizer is criminally under-explored.', timestamp: '2025-03-15T10:00:00Z', retweetCount: 5200, likeCount: 28000, isRetweet: false, isQuote: false },
      { id: 't2', text: 'Released a minimal GPT implementation in 200 lines of Python. No dependencies beyond PyTorch. Great for learning.', timestamp: '2025-03-10T14:00:00Z', retweetCount: 8300, likeCount: 41000, isRetweet: false, isQuote: false },
    ]
  },
  {
    id: '2',
    handle: 'ylecun',
    displayName: 'Yann LeCun',
    avatar: '',
    bio: 'VP & Chief AI Scientist at Meta. Turing Award Laureate. Professor at NYU.',
    followerCount: 750000,
    followingCount: 1200,
    tweetCount: 15000,
    verified: true,
    recentTweets: [
      { id: 't3', text: 'New paper: "A Path Towards Autonomous Machine Intelligence" — proposing a new architecture for world models that goes beyond autoregressive LLMs.', timestamp: '2025-03-14T09:00:00Z', retweetCount: 3800, likeCount: 18000, isRetweet: false, isQuote: false },
      { id: 't4', text: 'AGI will not come from scaling LLMs. We need new architectures that can plan and reason about the physical world.', timestamp: '2025-03-12T11:00:00Z', retweetCount: 2100, likeCount: 12000, isRetweet: false, isQuote: false },
    ]
  },
  {
    id: '3',
    handle: 'elonmusk',
    displayName: 'Elon Musk',
    avatar: '',
    bio: 'Owner of X. CEO of Tesla & SpaceX. Technoking.',
    followerCount: 180000000,
    followingCount: 800,
    tweetCount: 45000,
    verified: true,
    recentTweets: [
      { id: 't5', text: 'Grok 3 is now the most powerful AI system in the world. Coming soon to all X users.', timestamp: '2025-03-16T08:00:00Z', retweetCount: 45000, likeCount: 280000, isRetweet: false, isQuote: false },
      { id: 't6', text: 'xAI will open source Grok. AI should be for everyone.', timestamp: '2025-03-11T15:00:00Z', retweetCount: 32000, likeCount: 190000, isRetweet: false, isQuote: false },
    ]
  },
  {
    id: '4',
    handle: 'QbitAI',
    displayName: '量子位',
    avatar: '',
    bio: '量子位，关注AI行业最新动态。报道AI技术、产品、公司、人物、政策。',
    followerCount: 520000,
    followingCount: 380,
    tweetCount: 28000,
    verified: false,
    recentTweets: [
      { id: 't7', text: '【重磅】OpenAI发布GPT-5！多模态能力大幅提升，推理速度快3倍 #AI #OpenAI #GPT5', timestamp: '2025-03-15T03:00:00Z', retweetCount: 1200, likeCount: 3500, isRetweet: false, isQuote: false },
      { id: 't8', text: '刚刚！谷歌Gemini 2.0正式发布，一文看懂所有更新 👉 [链接]', timestamp: '2025-03-14T06:00:00Z', retweetCount: 800, likeCount: 2100, isRetweet: false, isQuote: false },
    ]
  },
  {
    id: '5',
    handle: 'ai_daily_digest',
    displayName: 'AI每日速递',
    avatar: '',
    bio: '每天为你精选AI领域最值得关注的新闻和论文📰 转载为主',
    followerCount: 45000,
    followingCount: 2200,
    tweetCount: 18000,
    verified: false,
    recentTweets: [
      { id: 't9', text: 'RT @kaborathy: New blog post: "Deep dive into tokenization"...', timestamp: '2025-03-15T12:00:00Z', retweetCount: 120, likeCount: 450, isRetweet: true, isQuote: false },
      { id: 't10', text: '今日AI新闻汇总🧵\n1. OpenAI发布GPT-5\n2. Google更新Gemini\n3. Meta开源新模型\n4. Anthropic融资消息\n（以上消息来源各官方账号）', timestamp: '2025-03-14T23:00:00Z', retweetCount: 340, likeCount: 1200, isRetweet: false, isQuote: false },
    ]
  },
  {
    id: '6',
    handle: 'ai_marketing_cn',
    displayName: 'AI营销号Pro',
    avatar: '',
    bio: '震惊！AI又双叒叕颠覆了！关注我获取最新AI财富密码💰',
    followerCount: 120000,
    followingCount: 4500,
    tweetCount: 35000,
    verified: false,
    recentTweets: [
      { id: 't11', text: '🚨紧急！GPT-5刚刚发布！99%的人还不知道的10个隐藏功能！错过就亏大了！速看！👇👇👇', timestamp: '2025-03-15T05:00:00Z', retweetCount: 2800, likeCount: 8500, isRetweet: false, isQuote: false },
      { id: 't12', text: '震惊！用这个AI工具，月入10万不是梦！我已经用它赚了50万了！评论区扣1教你怎么做！', timestamp: '2025-03-13T09:00:00Z', retweetCount: 1500, likeCount: 6200, isRetweet: false, isQuote: false },
    ]
  },
  {
    id: '7',
    handle: 'demaborthy',
    displayName: 'Demis Hassabis',
    avatar: '',
    bio: 'CEO of Google DeepMind. Nobel Laureate. Building AI to advance science.',
    followerCount: 420000,
    followingCount: 380,
    tweetCount: 2100,
    verified: true,
    recentTweets: [
      { id: 't13', text: 'Excited to share our latest breakthrough: AlphaFold 3 can now predict the structure of virtually all molecular interactions. Paper in Nature.', timestamp: '2025-03-13T10:00:00Z', retweetCount: 12000, likeCount: 55000, isRetweet: false, isQuote: false },
      { id: 't14', text: 'The future of AI is not just about language. Its about understanding the physical world and solving real scientific problems.', timestamp: '2025-03-08T14:00:00Z', retweetCount: 4200, likeCount: 22000, isRetweet: false, isQuote: false },
    ]
  },
  {
    id: '8',
    handle: 'ai_copypaste',
    displayName: 'AI资讯搬运工',
    avatar: '',
    bio: '搬运海外AI最新资讯 | 翻译+整理 | 关注不迷路',
    followerCount: 32000,
    followingCount: 1800,
    tweetCount: 22000,
    verified: false,
    recentTweets: [
      { id: 't15', text: '【翻译】Karpathy最新博客《深入理解Tokenization》全文翻译，建议收藏！🔖\n原文发表于2天前，以下是完整中文翻译...', timestamp: '2025-03-17T02:00:00Z', retweetCount: 280, likeCount: 950, isRetweet: false, isQuote: false },
      { id: 't16', text: 'RT @QbitAI: 【重磅】OpenAI发布GPT-5！', timestamp: '2025-03-15T04:00:00Z', retweetCount: 50, likeCount: 180, isRetweet: true, isQuote: false },
    ]
  },

  // === Web3/Crypto Category ===
  {
    id: '9',
    handle: 'VitalikButerin',
    displayName: 'vitalik.eth',
    avatar: '',
    bio: 'Ethereum co-founder. Building decentralized systems.',
    followerCount: 5200000,
    followingCount: 280,
    tweetCount: 12000,
    verified: true,
    recentTweets: [
      { id: 't17', text: 'New blog post on the future of account abstraction and what it means for Ethereum UX. ERC-4337 is just the beginning.', timestamp: '2025-03-14T11:00:00Z', retweetCount: 8500, likeCount: 35000, isRetweet: false, isQuote: false },
      { id: 't18', text: 'Published my thoughts on the trade-offs between L1 scaling and L2 approaches. TL;DR: both matter, but in different ways.', timestamp: '2025-03-10T09:00:00Z', retweetCount: 5200, likeCount: 22000, isRetweet: false, isQuote: false },
    ]
  },
  {
    id: '10',
    handle: 'caborather',
    displayName: 'CZ 🔶',
    avatar: '',
    bio: 'Ex-CEO Binance. Building.',
    followerCount: 9800000,
    followingCount: 450,
    tweetCount: 8500,
    verified: true,
    recentTweets: [
      { id: 't19', text: 'Working on education initiatives. Crypto adoption is still early. Focus on building, not trading.', timestamp: '2025-03-15T07:00:00Z', retweetCount: 6200, likeCount: 28000, isRetweet: false, isQuote: false },
      { id: 't20', text: '4.', timestamp: '2025-03-12T12:00:00Z', retweetCount: 15000, likeCount: 85000, isRetweet: false, isQuote: false },
    ]
  },
  {
    id: '11',
    handle: 'crypto_daily_cn',
    displayName: '币圈日报',
    avatar: '',
    bio: '每日加密货币新闻速递 | BTC ETH SOL | 行情分析',
    followerCount: 85000,
    followingCount: 3200,
    tweetCount: 42000,
    verified: false,
    recentTweets: [
      { id: 't21', text: '🔥 今日行情速览：\nBTC: $98,500 (+2.3%)\nETH: $3,850 (+1.8%)\nSOL: $285 (+5.1%)\n\n大盘普涨，山寨季要来了？', timestamp: '2025-03-16T01:00:00Z', retweetCount: 450, likeCount: 1800, isRetweet: false, isQuote: false },
      { id: 't22', text: 'RT @VitalikButerin: New blog post on the future of account abstraction...', timestamp: '2025-03-14T13:00:00Z', retweetCount: 80, likeCount: 320, isRetweet: true, isQuote: false },
    ]
  },
  {
    id: '12',
    handle: 'web3_shill_master',
    displayName: 'Web3财富密码💎',
    avatar: '',
    bio: '百倍币猎手🎯 | 带你上车 | 不是投资建议（但其实就是）',
    followerCount: 68000,
    followingCount: 5500,
    tweetCount: 55000,
    verified: false,
    recentTweets: [
      { id: 't23', text: '🚀🚀🚀 这个币要起飞了！上车最后机会！我已经all in了！\n\n不是投资建议哈（但你不买会后悔的）\n\n#100x #moonshot #DYOR', timestamp: '2025-03-16T03:00:00Z', retweetCount: 1200, likeCount: 4500, isRetweet: false, isQuote: false },
      { id: 't24', text: '恭喜昨天跟单的兄弟们！涨了15%！接下来目标100%！还没上车的抓紧！', timestamp: '2025-03-15T08:00:00Z', retweetCount: 800, likeCount: 3200, isRetweet: false, isQuote: false },
    ]
  },

  // === Tech / Software Engineering ===
  {
    id: '13',
    handle: 'kelseyhightower',
    displayName: 'Kelsey Hightower',
    avatar: '',
    bio: 'Retired, but still building things. Kubernetes, Go, Cloud Native.',
    followerCount: 320000,
    followingCount: 680,
    tweetCount: 9500,
    verified: true,
    recentTweets: [
      { id: 't25', text: 'The best infrastructure is invisible. If your developers are thinking about Kubernetes, you have already failed at platform engineering.', timestamp: '2025-03-14T16:00:00Z', retweetCount: 4500, likeCount: 22000, isRetweet: false, isQuote: false },
      { id: 't26', text: 'Hot take: most companies dont need microservices. A well-structured monolith will outperform a poorly designed distributed system every time.', timestamp: '2025-03-11T09:00:00Z', retweetCount: 8200, likeCount: 38000, isRetweet: false, isQuote: false },
    ]
  },
  {
    id: '14',
    handle: 'techbro_repost',
    displayName: '技术圈搬运',
    avatar: '',
    bio: '搬运硅谷最新技术动态 | 翻译科技大佬推文 | 互联网行业观察',
    followerCount: 28000,
    followingCount: 2800,
    tweetCount: 32000,
    verified: false,
    recentTweets: [
      { id: 't27', text: 'RT @kelseyhightower: The best infrastructure is invisible...', timestamp: '2025-03-14T18:00:00Z', retweetCount: 45, likeCount: 180, isRetweet: true, isQuote: false },
      { id: 't28', text: '【翻译】Kelsey Hightower: "最好的基础设施是无形的。如果你的开发者在思考K8s，你的平台工程已经失败了。"\n\n这话说得太对了👏', timestamp: '2025-03-14T19:00:00Z', retweetCount: 120, likeCount: 520, isRetweet: false, isQuote: false },
    ]
  },

  // === International Politics ===
  {
    id: '15',
    handle: 'policy_analyst',
    displayName: 'Dr. Sarah Chen',
    avatar: '',
    bio: 'Senior Fellow at Brookings. International relations, US-China policy. Author of "The New Cold War".',
    followerCount: 180000,
    followingCount: 920,
    tweetCount: 8200,
    verified: true,
    recentTweets: [
      { id: 't29', text: 'New analysis: The semiconductor export controls are reshaping global supply chains in ways that policymakers did not anticipate. Thread 🧵', timestamp: '2025-03-15T14:00:00Z', retweetCount: 3200, likeCount: 12000, isRetweet: false, isQuote: false },
      { id: 't30', text: 'Published my latest policy brief on the implications of the AUKUS submarine deal for Indo-Pacific security architecture.', timestamp: '2025-03-12T10:00:00Z', retweetCount: 1800, likeCount: 7500, isRetweet: false, isQuote: false },
    ]
  },
  {
    id: '16',
    handle: 'geopolitics_hot',
    displayName: '国际局势观察室',
    avatar: '',
    bio: '国际政治 | 地缘博弈 | 大国关系 | 每日更新',
    followerCount: 95000,
    followingCount: 1500,
    tweetCount: 25000,
    verified: false,
    recentTweets: [
      { id: 't31', text: '刚刚！美国宣布新一轮对华芯片限制！影响几何？一文看懂👇', timestamp: '2025-03-15T16:00:00Z', retweetCount: 650, likeCount: 2800, isRetweet: false, isQuote: false },
      { id: 't32', text: 'RT @policy_analyst: New analysis: The semiconductor export controls...', timestamp: '2025-03-15T15:00:00Z', retweetCount: 90, likeCount: 380, isRetweet: true, isQuote: false },
    ]
  },
  {
    id: '17',
    handle: 'politics_clickbait',
    displayName: '震惊国际',
    avatar: '',
    bio: '每天带你看世界大事！关注国际风云变幻！',
    followerCount: 180000,
    followingCount: 4200,
    tweetCount: 48000,
    verified: false,
    recentTweets: [
      { id: 't33', text: '🔴突发！美国这一招让全世界都震惊了！中国霸气回应：不惧任何挑战！网友怒赞！速看！', timestamp: '2025-03-16T02:00:00Z', retweetCount: 3500, likeCount: 12000, isRetweet: false, isQuote: false },
      { id: 't34', text: '太狠了！这个国家竟然对美国说不！背后的原因让人深思... 点赞收藏不迷路', timestamp: '2025-03-15T05:00:00Z', retweetCount: 2800, likeCount: 9500, isRetweet: false, isQuote: false },
    ]
  },

  // === Finance / Investment ===
  {
    id: '18',
    handle: 'ray_dalio',
    displayName: 'Ray Dalio',
    avatar: '',
    bio: 'Founder of Bridgewater Associates. Author of Principles.',
    followerCount: 3200000,
    followingCount: 150,
    tweetCount: 4500,
    verified: true,
    recentTweets: [
      { id: 't35', text: 'The current debt cycle is at a critical juncture. Published my analysis of what this means for the global economy and asset prices over the next 5 years.', timestamp: '2025-03-13T12:00:00Z', retweetCount: 8500, likeCount: 42000, isRetweet: false, isQuote: false },
    ]
  },
  {
    id: '19',
    handle: 'finance_guru_cn',
    displayName: '理财大师说',
    avatar: '',
    bio: '教你理财 | 财务自由之路 | 普通人也能年入百万',
    followerCount: 150000,
    followingCount: 3800,
    tweetCount: 38000,
    verified: false,
    recentTweets: [
      { id: 't36', text: '巴菲特都在用的5个投资秘诀！第3个99%的人不知道！快转发给身边的朋友！', timestamp: '2025-03-15T04:00:00Z', retweetCount: 1800, likeCount: 6500, isRetweet: false, isQuote: false },
    ]
  },

  // === Lifestyle / Entertainment ===
  {
    id: '20',
    handle: 'travel_adventures',
    displayName: 'World Nomad 🌍',
    avatar: '',
    bio: 'Full-time traveler | 50 countries | Photography | Digital nomad life',
    followerCount: 250000,
    followingCount: 1200,
    tweetCount: 15000,
    verified: false,
    recentTweets: [
      { id: 't37', text: 'Just arrived in Patagonia. The landscapes here are unlike anything I have ever seen. Thread of my favorite shots 📸🧵', timestamp: '2025-03-14T20:00:00Z', retweetCount: 2800, likeCount: 18000, isRetweet: false, isQuote: false },
    ]
  },
]
