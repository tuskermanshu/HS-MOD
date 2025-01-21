import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { useSettings } from '@/store/settings'
import { memo, useCallback, useEffect } from 'react'
import SettingSelect from './components/SettingSelect'
import SettingSwitch from './components/SettingSwitch'

// 选项常量
const deviceTemplateOptions = [
  { value: 'Default', label: '默认' },
  { value: 'iPad', label: 'iPad' },
  { value: 'iPhone', label: 'iPhone' },
  { value: 'Phone', label: '手机' },
  { value: 'Tablet', label: '平板' },
  { value: 'HuaweiPhone', label: '华为手机' },
  { value: 'Custom', label: '自定义' },
]

const deviceOsOptions = [
  { value: 'PC', label: 'PC' },
  { value: 'Mac', label: 'Mac' },
  { value: 'iOS', label: 'iOS' },
  { value: 'Android', label: 'Android' },
]

const screenSizeOptions = [
  { value: 'Phone', label: '手机' },
  { value: 'MiniTablet', label: '小型平板' },
  { value: 'Tablet', label: '平板' },
  { value: 'PC', label: 'PC' },
]

const popupResponseOptions = [
  { value: 'OK', label: '确定' },
  { value: 'CONFIRM', label: '确认' },
  { value: 'CANCEL', label: '取消' },
  { value: 'YES', label: '是' },
  { value: 'DONOTHING', label: '不处理' },
]

// 性能优化卡片组件
const PerformanceCard = memo(({ config, onUpdateConfig }: {
  config: Record<string, any>
  onUpdateConfig: (key: string, value: any) => void
}) => {
  return (
    <Card className="border-none shadow-none">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold tracking-tight">性能优化</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          游戏性能和运行优化设置
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 pr-8">
        <SettingSwitch
          id="in-game-messages"
          label="游戏内消息"
          description="（如果无法打开商店，尝试启用此项）显示游戏内消息（广告、削弱补丁、天梯结算信息等）"
          value={config['In-Game Messages'] === 'true'}
          onChange={checked => onUpdateConfig('In-Game Messages', String(checked))}
        />

        <SettingSwitch
          id="popup-messages"
          label="弹窗消息"
          description="显示弹窗消息"
          value={config['Popup Messages'] === 'true'}
          onChange={checked => onUpdateConfig('Popup Messages', String(checked))}
        />

        <SettingSelect
          label="弹窗响应"
          description="如何响应被阻止的弹窗消息"
          value={config['Popup Response'] || 'DONOTHING'}
          onChange={value => onUpdateConfig('Popup Response', value)}
          options={popupResponseOptions}
          placeholder="选择响应方式"
        />

        <SettingSwitch
          id="application-focus"
          label="应用程序焦点"
          description="isOnApplicationFocus"
          value={config['Application Focus'] === 'true'}
          onChange={checked => onUpdateConfig('Application Focus', String(checked))}
        />

        <SettingSwitch
          id="settlement-display"
          label="结算展示"
          description="显示任务完成、成就奖励、升级提示等（可能导致无奖励提示）"
          value={config['Settlement Display'] === 'true'}
          onChange={checked => onUpdateConfig('Settlement Display', String(checked))}
        />

        <SettingSwitch
          id="auto-exit-error"
          label="报错退出"
          description="自动退出错误"
          value={config['Auto Exit on Error'] === 'true'}
          onChange={checked => onUpdateConfig('Auto Exit on Error', String(checked))}
        />

        <SettingSwitch
          id="allow-disconnect"
          label="允许断线"
          description="（未经测试）允许长时间无操作后断线（启动游戏时配置无法加载）"
          value={config['Allow Disconnect'] === 'true'}
          onChange={checked => onUpdateConfig('Allow Disconnect', String(checked))}
        />
      </CardContent>
    </Card>
  )
})
PerformanceCard.displayName = 'PerformanceCard'

// 主组件
export function OptimizationSettings() {
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
      <PerformanceCard config={config} onUpdateConfig={handleUpdateConfig} />
    </div>
  )
}
