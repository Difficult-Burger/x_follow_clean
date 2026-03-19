export interface TwitterAccount {
  id: string
  handle: string
  displayName: string
  avatar: string
  bio: string
  followerCount: number
  followingCount: number
  tweetCount: number
  verified: boolean
  recentTweets: Tweet[]
}

export interface Tweet {
  id: string
  text: string
  timestamp: string
  retweetCount: number
  likeCount: number
  isRetweet: boolean
  isQuote: boolean
}

export interface CategorizedAccount extends TwitterAccount {
  category: string
  categoryLabel: string
  chainPosition: number // 0-100, 0=upstream, 100=downstream
  chainReason: string
  unfollowRecommended: boolean
  unfollowReason: string
}

export interface CategoryGroup {
  id: string
  label: string
  emoji: string
  color: string
  accounts: CategorizedAccount[]
}

export interface AnalysisResult {
  handle: string
  totalFollowing: number
  categories: CategoryGroup[]
  summary: string
  recommendedUnfollows: CategorizedAccount[]
}
