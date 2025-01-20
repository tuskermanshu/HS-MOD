import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useSettings } from '@/store/settings'
import { memo, useCallback, useEffect } from 'react'
import SettingInput from './components/SettingInput'
import SettingSwitch from './components/SettingSwitch'

// 开发设置卡片组件
const DevelopmentCard = memo(({ config, onUpdateConfig }: {
  config: Record<string, any>
  onUpdateConfig: (key: string, value: any) => void
}) => {
  return (
    <Card className="border-none shadow-none">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold tracking-tight">开发设置</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          开发相关配置和调试选项
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 pt-3">
        <SettingInput
          label="炉石日志"
          description="炉石进程日志文件路径（相对于炉石）"
          value={config['Hearthstone Log'] || ''}
          onChange={value => onUpdateConfig('Hearthstone Log', value)}
          placeholder="输入日志文件路径"
        />

        <SettingInput
          label="对局日志"
          description="炉石对局日志文件路径（相对于炉石）"
          value={config['Match Log'] || ''}
          onChange={value => onUpdateConfig('Match Log', value)}
          placeholder="输入对局日志路径"
        />

        <SettingInput
          label="自动退出计时器"
          description="游戏结束后自动退出的等待时间（秒），x<=0 禁用此选项"
          value={config['Auto Quit Timer'] || 0}
          onChange={value => onUpdateConfig('Auto Quit Timer', Number(value))}
          type="number"
          className="w-[40%]"
          min={0}
        />

        <SettingInput
          label="Web服务器端口"
          description="Web服务器监听端口"
          value={config['Web Server Port'] || 58744}
          onChange={value => onUpdateConfig('Web Server Port', Number(value))}
          type="number"
          className="w-[40%]"
          min={1}
          max={65535}
        />

        <SettingInput
          label="网页背景图片"
          description="设置Web页面背景图片"
          value={config['Web Page Background Image'] || ''}
          onChange={value => onUpdateConfig('Web Page Background Image', value)}
          placeholder="输入背景图片URL"
        />

        <SettingSwitch
          id="simulate-pack"
          label="模拟开包"
          description="启用模拟开包功能（建议修改后重启炉石，启用可能导致开包统计异常）"
          value={config['Simulate Pack Opening'] === 'true'}
          onChange={checked => onUpdateConfig('Simulate Pack Opening', String(checked))}
        />

        <SettingSwitch
          id="webshell"
          label="Webshell"
          description="Webshell 开关"
          value={config.Webshell === 'true'}
          onChange={checked => onUpdateConfig('Webshell', String(checked))}
        />

        <SettingSwitch
          id="internal-mode"
          label="内部模式"
          description="切换到内部模式（需要重启炉石）"
          value={config['Internal Mode'] === 'true'}
          onChange={checked => onUpdateConfig('Internal Mode', String(checked))}
        />
      </CardContent>
    </Card>
  )
})
DevelopmentCard.displayName = 'DevelopmentCard'

// 主组件
export function DevelopmentSettings() {
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
      <DevelopmentCard config={config} onUpdateConfig={handleUpdateConfig} />
    </div>
  )
}
