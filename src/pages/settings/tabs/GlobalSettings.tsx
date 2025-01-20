import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { useSettings } from '@/store/settings'
import { memo, useCallback, useEffect } from 'react'
import SettingSelect from './components/SettingSelect'
import SettingSwitch from './components/SettingSwitch'

// 常量配置
const CONSTANTS = {
  LANGUAGE_OPTIONS: [
    { value: 'zhCN', label: '简体中文' },
    { value: 'enUS', label: 'English' },
  ],
  TEMPLATE_OPTIONS: [
    { value: 'DoNothing', label: '暂无模板' },
    { value: 'AwayFromKeyboard', label: '远离键盘' },
    { value: 'AntiAwayFromKeyboard', label: '不远离键盘' },
  ],
  FRAME_RATE_OPTIONS: [
    { value: '30', label: '30 FPS' },
    { value: '60', label: '60 FPS' },
    { value: '120', label: '120 FPS' },
    { value: '144', label: '144 FPS' },
    { value: '240', label: '240 FPS' },
  ],
  SPEED_MULTIPLIER: {
    MIN: -32,
    MAX: 32,
    STEP: 1,
  },
} as const

const SpeedMultiplierSlider = memo(({ value, onChange }: { value: number, onChange: (value: number) => void }) => {
  const handleChange = useCallback((values: number[]) => {
    onChange(values[0])
  }, [onChange])

  return (
    <div className="space-y-2">
      <div className="space-y-0.5">
        <Label className="text-base">速度倍率</Label>
        <p className="text-[13px] text-muted-foreground">设置游戏速度倍率</p>
      </div>
      <div className="w-full">
        <div className="flex flex-col space-y-4">
          <Slider
            min={CONSTANTS.SPEED_MULTIPLIER.MIN}
            max={CONSTANTS.SPEED_MULTIPLIER.MAX}
            step={CONSTANTS.SPEED_MULTIPLIER.STEP}
            value={[value]}
            onValueChange={handleChange}
            className="w-[60%]"
          />
          <span className="text-sm text-muted-foreground">
            当前值:
            {value}
          </span>
        </div>
      </div>
    </div>
  )
})
SpeedMultiplierSlider.displayName = 'SpeedMultiplierSlider'

// 卡片组件
const SystemStatusCard = memo(({ config, onUpdateConfig }: {
  config: Record<string, any>
  onUpdateConfig: (key: string, value: any) => void
}) => {
  const handleHsModStatusChange = useCallback((value: boolean) => {
    onUpdateConfig('HsMod Status', value ? 'true' : 'false')
  }, [onUpdateConfig])

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold tracking-tight">系统状态</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          基础系统配置和状态显示
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 pt-3">
        <SettingSwitch
          id="hsmod-status"
          label="HsMod 状态"
          description="启用或禁用 HsMod"
          value={config['HsMod Status'] === 'true'}
          onChange={handleHsModStatusChange}
        />
        <SettingSelect
          label="语言设置"
          description="选择界面显示语言"
          value={config['HsMod Language']}
          onChange={(value: string) => onUpdateConfig('HsMod Language', value)}
          options={[...CONSTANTS.LANGUAGE_OPTIONS]}
          placeholder="选择语言"
        />
        <SettingSelect
          label="配置模板"
          description="选择预设配置模板"
          value={config['Configuration Template']}
          onChange={(value: string) => onUpdateConfig('Configuration Template', value)}
          options={[...CONSTANTS.TEMPLATE_OPTIONS]}
          placeholder="选择模板"
        />
      </CardContent>
    </Card>
  )
})
SystemStatusCard.displayName = 'SystemStatusCard'

const PerformanceCard = memo(({ config, onUpdateConfig }: {
  config: Record<string, any>
  onUpdateConfig: (key: string, value: any) => void
}) => {
  return (
    <Card className="border-none shadow-none">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold tracking-tight">性能设置</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          游戏性能和显示相关配置
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 pt-3">
        <SettingSwitch
          id="shortcut-status"
          label="快捷键状态"
          description="启用或禁用快捷键功能"
          value={config['Shortcut Status'] === 'true'}
          onChange={value => onUpdateConfig('Shortcut Status', String(value))}
        />
        <SettingSwitch
          id="speed-gear"
          label="速度齿轮状态"
          description="启用或禁用速度调节功能"
          value={config['Speed Gear Status'] === 'true'}
          onChange={value => onUpdateConfig('Speed Gear Status', String(value))}
        />
        <SpeedMultiplierSlider
          value={config['Speed Multiplier'] || 0}
          onChange={value => onUpdateConfig('Speed Multiplier', value)}
        />
        <SettingSwitch
          id="show-fps"
          label="显示 FPS"
          description="显示游戏帧率信息"
          value={config['Show FPS'] === 'true'}
          onChange={value => onUpdateConfig('Show FPS', String(value))}
        />
        <SettingSelect
          label="游戏帧率"
          description="设置游戏目标帧率"
          value={String(config['Game Frame Rate'])}
          onChange={value => onUpdateConfig('Game Frame Rate', Number(value))}
          options={[...CONSTANTS.FRAME_RATE_OPTIONS]}
          placeholder="选择帧率"
        />
      </CardContent>
    </Card>
  )
})
PerformanceCard.displayName = 'PerformanceCard'

// 主组件
export function GlobalSettings() {
  const { config, loadConfig, checkStatus, isConnected, updateConfig } = useSettings()

  const handleUpdateConfig = useCallback((key: string, value: any) => {
    updateConfig(key, value)
  }, [updateConfig])

  useEffect(() => {
    loadConfig()
    const checkInterval = setInterval(checkStatus, 30000)
    return () => clearInterval(checkInterval)
  }, [loadConfig, checkStatus])

  // if (loading)
  //   return <div>Loading...</div>
  if (!isConnected)
    return <div>未连接到 HsMod 服务</div>

  return (
    <div className="space-y-6">
      <SystemStatusCard config={config} onUpdateConfig={handleUpdateConfig} />
      <PerformanceCard config={config} onUpdateConfig={handleUpdateConfig} />
    </div>
  )
}
