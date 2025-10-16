export type Locale = 'se' | 'en' | 'ar' | 'fa' | 'zh' | 'es'

export type StreamNode = 'nodvast' | 'nodsyd' | 'nodost' | 'nodmidd'

export interface Stream {
  id: string
  node: StreamNode
  title: string
  youtubeId: string
  active: boolean
  day: 1 | 2
}

export interface StreamHealth {
  isLive: boolean
  viewerCount: number
  title: string
  thumbnail: string
}
