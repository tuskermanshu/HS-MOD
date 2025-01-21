import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useSettings } from '@/store/settings'
import { memo, useCallback, useEffect } from 'react'
import SettingInput from './components/SettingInput'
import SettingSwitch from './components/SettingSwitch'

// 皮肤设置卡片组件
const SkinCard = memo(({ config, onUpdateConfig }: {
  config: Record<string, any>
  onUpdateConfig: (key: string, value: any) => void
}) => {
  return (
    <Card className="border-none shadow-none">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold tracking-tight">皮肤设置</CardTitle>
        <CardDescription className="text-sm text-muted-foreground max-w-[600px]">
          游戏内皮肤和装饰物品配置
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 pr-8">
        <SettingInput
          label="金币皮肤ID"
          type="number"
          value={config.Coin || '-1'}
          onChange={value => onUpdateConfig('Coin', value)}
          description="-1表示不修改（通过游戏内断线模拟实时更新）"
        />

        <SettingInput
          label="卡背ID"
          type="number"
          value={config['Card Back'] || '-1'}
          onChange={value => onUpdateConfig('Card Back', value)}
          description="-1表示不修改（立即生效）"
        />

        <SettingInput
          label="对战面板ID"
          type="number"
          value={config['Battle Board'] || '-1'}
          onChange={value => onUpdateConfig('Battle Board', value)}
          description="-1表示不修改（实验性功能，酒馆可能会卡死）"
        />
      </CardContent>
    </Card>
  )
})
SkinCard.displayName = 'SkinCard'

// 酒馆皮肤卡片组件
const TavernCard = memo(({ config, onUpdateConfig }: {
  config: Record<string, any>
  onUpdateConfig: (key: string, value: any) => void
}) => {
  return (
    <Card className="border-none shadow-none">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold tracking-tight">酒馆设置</CardTitle>
        <CardDescription className="text-sm text-muted-foreground max-w-[600px]">
          酒馆战棋相关皮肤配置
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 pr-8">
        <SettingInput
          label="酒馆对战面板ID"
          type="number"
          value={config['Tavern Battle Board'] || '-1'}
          onChange={value => onUpdateConfig('Tavern Battle Board', value)}
          description="-1表示不修改（实验性功能，酒馆可能会卡死）"
        />

        <SettingInput
          label="酒馆击杀特效ID"
          type="number"
          value={config['Tavern Kill Effect'] || '-1'}
          onChange={value => onUpdateConfig('Tavern Kill Effect', value)}
          description="-1表示不修改（实验性功能，酒馆可能会卡死）"
        />

        <SettingInput
          label="鲍勃ID"
          type="number"
          value={config.Bob || '-1'}
          onChange={value => onUpdateConfig('Bob', value)}
          description="-1表示不修改（实验性功能，酒馆可能会卡死）"
        />
      </CardContent>
    </Card>
  )
})
TavernCard.displayName = 'TavernCard'

// 英雄皮肤卡片组件
const HeroCard = memo(({ config, onUpdateConfig }: {
  config: Record<string, any>
  onUpdateConfig: (key: string, value: any) => void
}) => {
  return (
    <Card className="border-none shadow-none">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold tracking-tight">英雄设置</CardTitle>
        <CardDescription className="text-sm text-muted-foreground max-w-[600px]">
          英雄皮肤相关配置
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 pr-8">
        <SettingSwitch
          id="default-hero"
          label="默认英雄皮肤"
          description="尽可能将对手的英雄皮肤替换为默认皮肤"
          value={config['Default Hero'] === 'true'}
          onChange={checked => onUpdateConfig('Default Hero', String(checked))}
        />

        <SettingInput
          label="英雄ID"
          type="number"
          value={config.Hero || '-1'}
          onChange={value => onUpdateConfig('Hero', value)}
          description="-1表示不修改（谨慎使用，非挂机不建议。优先级低于默认英雄。通常从HsSkins.cfg加载英雄皮肤，然后按F4更新。如果在游戏中，还需要游戏内断线模拟）"
        />

        <SettingInput
          label="对手英雄ID"
          type="number"
          value={config['Opponent Hero'] || '-1'}
          onChange={value => onUpdateConfig('Opponent Hero', value)}
          description="-1表示不修改（谨慎使用，非挂机不建议。优先级低于默认英雄）"
        />
      </CardContent>
    </Card>
  )
})
HeroCard.displayName = 'HeroCard'

// 主组件
export function SkinSettings() {
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
    <div className="space-y-6 max-w-[700px]">
      <SkinCard config={config} onUpdateConfig={handleUpdateConfig} />
      <TavernCard config={config} onUpdateConfig={handleUpdateConfig} />
      <HeroCard config={config} onUpdateConfig={handleUpdateConfig} />
    </div>
  )
}
