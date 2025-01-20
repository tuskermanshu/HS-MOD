import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useSettings } from '@/store/settings'
import { memo, useCallback, useEffect } from 'react'
import SettingSelect from './components/SettingSelect'
import SettingSwitch from './components/SettingSwitch'

// 游戏功能卡片组件
const GameFeaturesCard = memo(({ config, onUpdateConfig }: {
  config: Record<string, any>
  onUpdateConfig: (key: string, value: any) => void
}) => {
  return (
    <Card className="border-none shadow-none">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold tracking-tight">游戏功能</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          游戏基础功能和对战相关设置
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 pt-3">
        <SettingSwitch
          id="quick-battle"
          label="快速对战"
          description="启用酒馆或佣兵AI快速对战模式"
          value={config['Quick Battle'] === 'true'}
          onChange={checked => onUpdateConfig('Quick Battle', String(checked))}
        />

        <SettingSwitch
          id="show-full-name"
          label="显示完整名称"
          description="显示对手的完整战网名称，同时允许添加当前对手"
          value={config['Show Full Name'] === 'true'}
          onChange={checked => onUpdateConfig('Show Full Name', String(checked))}
        />

        <SettingSwitch
          id="show-ladder-rank"
          label="显示天梯等级"
          description="显示对手的传说前天梯等级"
          value={config['Show Ladder Rank'] === 'true'}
          onChange={checked => onUpdateConfig('Show Ladder Rank', String(checked))}
        />

        <SettingSwitch
          id="card-tracker"
          label="卡牌追踪"
          description="预测对手的卡牌并提供提示（如选择；可能识别错误）"
          value={config['Card Tracker'] === 'true'}
          onChange={checked => onUpdateConfig('Card Tracker', String(checked))}
        />

        <SettingSwitch
          id="card-reveal"
          label="显示已知卡牌"
          description="显示已知卡牌的正面（可能导致炉石自动断线重连）"
          value={config['Card Reveal'] === 'true'}
          onChange={checked => onUpdateConfig('Card Reveal', String(checked))}
        />

        <SettingSwitch
          id="skip-hero-intro"
          label="跳过英雄介绍"
          description="跳过英雄介绍动画"
          value={config['Skip Hero Intro'] === 'true'}
          onChange={checked => onUpdateConfig('Skip Hero Intro', String(checked))}
        />
      </CardContent>
    </Card>
  )
})
GameFeaturesCard.displayName = 'GameFeaturesCard'

// 表情系统卡片组件
const EmoteSystemCard = memo(({ config, onUpdateConfig }: {
  config: Record<string, any>
  onUpdateConfig: (key: string, value: any) => void
}) => {
  return (
    <Card className="border-none shadow-none">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold tracking-tight">表情系统</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          表情和互动相关设置
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 pt-3">
        <SettingSwitch
          id="unlimited-emote"
          label="无限表情"
          description="允许无限制使用表情（最小延迟1.5秒）"
          value={config['Unlimited Emote'] === 'true'}
          onChange={checked => onUpdateConfig('Unlimited Emote', String(checked))}
        />

        <SettingSwitch
          id="thinking-emote"
          label="思考表情"
          description="允许使用思考表情"
          value={config['Thinking Emote'] === 'true'}
          onChange={checked => onUpdateConfig('Thinking Emote', String(checked))}
        />
      </CardContent>
    </Card>
  )
})
EmoteSystemCard.displayName = 'EmoteSystemCard'

// 特效设置卡片组件
const EffectsCard = memo(({ config, onUpdateConfig }: {
  config: Record<string, any>
  onUpdateConfig: (key: string, value: any) => void
}) => {
  const cardStateOptions = [
    { value: 'Default', label: '默认' },
    { value: 'OnlyMy', label: '仅自己' },
    { value: 'All', label: '全部' },
    { value: 'Disabled', label: '禁用' },
  ]

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold tracking-tight">特效设置</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          卡牌特效和视觉效果设置
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 pt-3">
        <SettingSwitch
          id="opponent-card-effects"
          label="对手卡牌特效"
          description="显示对手的卡牌特效（覆盖所有配置）"
          value={config['Opponent Card Effects'] === 'true'}
          onChange={checked => onUpdateConfig('Opponent Card Effects', String(checked))}
        />

        <SettingSwitch
          id="signature-effects"
          label="签名特效"
          description="在最高卡牌特效中显示替代卡图（仅影响最高卡牌特效）"
          value={config['Signature Effects'] === 'true'}
          onChange={checked => onUpdateConfig('Signature Effects', String(checked))}
        />

        <SettingSelect
          label="金卡特效"
          description="强制使用金卡特效"
          value={config['Golden Card Effects'] || 'Default'}
          onChange={value => onUpdateConfig('Golden Card Effects', value)}
          options={cardStateOptions}
          placeholder="选择特效模式"
        />

        <SettingSelect
          label="最高特效"
          description="强制使用最高特效（优先级：钻石>签名>金色>普通）"
          value={config['Highest Card Effects'] || 'Default'}
          onChange={value => onUpdateConfig('Highest Card Effects', value)}
          options={cardStateOptions}
          placeholder="选择特效模式"
        />
      </CardContent>
    </Card>
  )
})
EffectsCard.displayName = 'EffectsCard'

// 主组件
export function HearthstoneSettings() {
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
      <GameFeaturesCard config={config} onUpdateConfig={handleUpdateConfig} />
      <EmoteSystemCard config={config} onUpdateConfig={handleUpdateConfig} />
      <EffectsCard config={config} onUpdateConfig={handleUpdateConfig} />
    </div>
  )
}
