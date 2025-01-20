import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useSettings } from '@/store/settings'
import { memo, useCallback, useEffect } from 'react'
import SettingSwitch from './components/SettingSwitch'

// 好友设置卡片组件
const FriendsCard = memo(({ config, onUpdateConfig }: {
  config: Record<string, any>
  onUpdateConfig: (key: string, value: any) => void
}) => {
  return (
    <Card className="border-none shadow-none">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold tracking-tight">好友设置</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          管理好友相关功能和观战设置
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 pt-3">
        <SettingSwitch
          id="auto-report"
          label="自动举报"
          description="对手昵称违规、作弊、脚本或恶意投降时自动举报"
          value={config['Auto Report'] === 'true'}
          onChange={checked => onUpdateConfig('Auto Report', String(checked))}
        />

        <SettingSwitch
          id="spectate-cards"
          label="观战显示卡牌"
          description="在观战模式中显示（轮换）对手的卡牌（未经测试）"
          value={config['Spectate Display Cards'] === 'true'}
          onChange={checked => onUpdateConfig('Spectate Display Cards', String(checked))}
        />
      </CardContent>
    </Card>
  )
})
FriendsCard.displayName = 'FriendsCard'

// 主组件
export function FriendsSettings() {
  const { config, loadConfig, checkStatus, isConnected, updateConfig } = useSettings()

  const handleUpdateConfig = useCallback((key: string, value: any) => {
    updateConfig(key, value)
  }, [updateConfig])

  useEffect(() => {
    loadConfig()
    const checkInterval = setInterval(checkStatus, 30000)
    return () => clearInterval(checkInterval)
  }, [loadConfig, checkStatus])

  if (!isConnected)
    return <div>未连接到 HsMod 服务</div>

  return (
    <div className="space-y-6">
      <FriendsCard config={config} onUpdateConfig={handleUpdateConfig} />
    </div>
  )
}
