import type { Match } from '../types'
import { GAME_MODES } from '../types'

interface MatchLogViewProps {
  content: string
}

export function MatchLogView({ content }: MatchLogViewProps) {
  const parseMatches = (content: string): Match[] => {
    if (!content)
      return []

    const lines = content.split('\n')
    const matches: Match[] = []

    for (let i = 0; i < lines.length; i += 3) {
      const date = lines[i]?.trim()
      const time = lines[i + 1]?.trim()
      const details = lines[i + 2]?.trim()

      if (!date || !time || !details)
        continue

      const [period, ...rest] = details.split(',')
      if (rest.length < 5)
        continue

      const [result, score, mode, opponent, id] = rest

      // 处理游戏模式显示
      const gameMode = mode.replace('FT_', '').replace('GT_', '')
      const formattedMode = GAME_MODES[gameMode as keyof typeof GAME_MODES] || gameMode

      matches.push({ date, time, period, result, score, mode: formattedMode, opponent, id })
    }

    return matches
  }

  const getResultClass = (result: string) => {
    switch (result) {
      case '胜利':
        return 'text-green-500 font-medium'
      case '失败':
        return 'text-red-500 font-medium'
      default:
        return 'text-yellow-500 font-medium'
    }
  }

  const matches = parseMatches(content)

  return (
    <div className="space-y-1">
      {matches.map((match, index) => (
        <div key={index} className="flex items-center py-1.5 px-2 hover:bg-accent/5 rounded-md">
          <div className="w-32 shrink-0">
            <span className="text-sm text-muted-foreground">
              {match.date}
              {' '}
              {match.time}
              {match.period}
            </span>
          </div>
          <div className="w-16 shrink-0">
            <span className={getResultClass(match.result)}>{match.result}</span>
          </div>
          <div className="w-16 shrink-0">
            <span className="text-muted-foreground">
              {match.score !== '-' ? match.score : ''}
            </span>
          </div>
          <div className="w-20 shrink-0">
            <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10">
              {match.mode}
            </span>
          </div>
          <div className="flex-1 flex items-center justify-between">
            <span className="font-medium">{match.opponent}</span>
            <span className="text-xs text-muted-foreground">
              {match.id.includes('=>') ? match.id.split('=>')[0] : match.id}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
