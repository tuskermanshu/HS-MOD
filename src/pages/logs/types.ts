export type LogTab = string

export interface Match {
  date: string
  time: string
  period: string
  result: string
  score: string
  mode: string
  opponent: string
  id: string
}

export const LOG_TABS = [
  {
    value: 'bepinex' as const,
    label: '完整日志',
    description: 'BepInEx 完整日志',
  },
  {
    value: 'bepinex-recent' as const,
    label: '最近日志',
    description: 'BepInEx 最近日志（最后666行）',
  },
  {
    value: 'match' as const,
    label: '对局日志',
    description: '对局日志',
  },
  {
    value: 'skins' as const,
    label: '皮肤信息',
    description: '皮肤信息（需要登录）',
  },
  {
    value: 'mercenaries' as const,
    label: '佣兵信息',
    description: '佣兵信息（需要登录）',
  },
] as const

export const GAME_MODES = {
  BATTLEGROUNDS: '酒馆战棋',
  STANDARD: '标准模式',
  VS_FRIEND: '好友对战',
  TAVERNBRAWL: '乱斗模式',
} as const

export interface ProcessStatus {
  pid: number
  login: boolean
}
