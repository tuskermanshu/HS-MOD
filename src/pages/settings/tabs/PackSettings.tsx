import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useSettings } from '@/store/settings'
import { memo, useCallback, useEffect } from 'react'
import SettingInput from './components/SettingInput'
import SettingSelect from './components/SettingSelect'
import SettingSwitch from './components/SettingSwitch'

const deviceTemplateOptions = [
  { value: 'Default', label: '默认' },
  { value: 'iPad', label: 'iPad' },
  { value: 'iPhone', label: 'iPhone' },
  { value: 'Phone', label: '手机' },
  { value: 'Tablet', label: '平板' },
  { value: 'HuaweiPhone', label: '华为手机' },
  { value: 'Custom', label: '自定义' },
]

const deviceOSOptions = [
  { value: 'PC', label: 'PC' },
  { value: 'Mac', label: 'Mac' },
  { value: 'iOS', label: 'iOS' },
  { value: 'Android', label: 'Android' },
]

const screenSizeOptions = [
  { value: 'Phone', label: '手机' },
  { value: 'MiniTablet', label: '小平板' },
  { value: 'Tablet', label: '平板' },
  { value: 'PC', label: 'PC' },
]

const packTypeOptions = [
  { value: 'CLASSIC', label: '经典' },
  { value: 'GOLDEN_CLASSIC_PACK', label: '黄金经典' },
  { value: 'STANDARD_PACK', label: '标准' },
  { value: 'WILD_PACK', label: '狂野' },
  { value: 'GOLDEN_STANDARD_PACK', label: '黄金标准' },
  { value: 'WILD_WEST', label: '狂野西部' },
  { value: 'SPACE', label: '太空' },
]

const qualityTypeOptions = [
  { value: 'NORMAL', label: '普通' },
  { value: 'GOLDEN', label: '金色' },
  { value: 'DIAMOND', label: '钻石' },
  { value: 'SIGNATURE', label: '签名' },
]

const rarityTypeOptions = [
  { value: 'COMMON', label: '普通' },
  { value: 'RARE', label: '稀有' },
  { value: 'EPIC', label: '史诗' },
  { value: 'LEGENDARY', label: '传说' },
]

// 设备模拟卡片组件
const DeviceSimulationCard = memo(({ config, onUpdateConfig }: {
  config: Record<string, any>
  onUpdateConfig: (key: string, value: any) => void
}) => {
  return (
    <Card className="border-none shadow-none">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold tracking-tight">设备模拟</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          （重启炉石后生效）模拟设备以用于卡包和卡背收藏
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 pr-8">
        <SettingSelect
          label="设备模拟模板"
          value={config['Device Simulation Template'] || 'Default'}
          onChange={value => onUpdateConfig('Device Simulation Template', value)}
          options={deviceTemplateOptions}
          description="选择要模拟的设备类型"
          placeholder=""
        />

        <SettingSelect
          label="模拟设备系统"
          value={config['Simulated Device OS'] || 'PC'}
          onChange={value => onUpdateConfig('Simulated Device OS', value)}
          options={deviceOSOptions}
          description="当设备模拟模板设置为自定义时生效"
          placeholder=""
        />

        <SettingSelect
          label="设备屏幕尺寸"
          value={config['Device Screen Size'] || 'PC'}
          onChange={value => onUpdateConfig('Device Screen Size', value)}
          options={screenSizeOptions}
          description="当设备模拟模板设置为自定义时生效"
          placeholder=""
        />

        <SettingInput
          label="模拟设备型号"
          type="text"
          value={config['Device Model'] || 'HsMod'}
          onChange={value => onUpdateConfig('Device Model', value)}
          description="当设备模拟模板设置为自定义时生效"
        />
      </CardContent>
    </Card>
  )
})
DeviceSimulationCard.displayName = 'DeviceSimulationCard'

// 卡包模拟卡片组件
const PackSimulationCard = memo(({ config, onUpdateConfig }: {
  config: Record<string, any>
  onUpdateConfig: (key: string, value: any) => void
}) => {
  return (
    <Card className="border-none shadow-none">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold tracking-tight">卡包模拟</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          卡包开启模拟配置
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 pr-8">

        <SettingSwitch
          id="simulate-pack"
          label="模拟开包"
          description="启用模拟开包功能（建议修改后重启炉石，启用可能导致开包统计异常）"
          value={config['Simulate Pack Opening'] === 'true'}
          onChange={checked => onUpdateConfig('Simulate Pack Opening', String(checked))}
        />

        <SettingInput
          label="模拟卡包数量"
          type="number"
          value={config.Count || '233'}
          onChange={value => onUpdateConfig('Count', value)}
          description="设置模拟的卡包数量"
        />

        <SettingSelect
          label="卡包类型"
          value={config.Type || 'GOLDEN_CLASSIC_PACK'}
          onChange={value => onUpdateConfig('Type', value)}
          options={packTypeOptions}
          description="模拟的卡包类型（替换卡包图标）"
          placeholder=""
        />

        <SettingSwitch
          label="随机结果"
          value={config['Random Result'] === 'true'}
          onChange={checked => onUpdateConfig('Random Result', String(checked))}
          description="启用随机结果"
          id=""
        />

        <SettingSwitch
          label="随机稀有度"
          value={config['Random Rarity'] === 'true'}
          onChange={checked => onUpdateConfig('Random Rarity', String(checked))}
          description="随机化卡牌稀有度（基于随机结果）"
          id=""
        />

        <SettingSelect
          label="指定稀有度"
          value={config['Rarity Type'] || 'LEGENDARY'}
          onChange={value => onUpdateConfig('Rarity Type', value)}
          options={rarityTypeOptions}
          description="指定随机稀有度（基于随机稀有度）"
          placeholder=""
        />

        <SettingSwitch
          label="随机品质"
          value={config['Random Quality'] === 'true'}
          onChange={checked => onUpdateConfig('Random Quality', String(checked))}
          description="随机化卡牌品质（基于随机结果）"
          id=""
        />

        <SettingSelect
          label="指定品质"
          value={config['Quality Type'] || 'GOLDEN'}
          onChange={value => onUpdateConfig('Quality Type', value)}
          options={qualityTypeOptions}
          description="指定卡牌品质（基于随机品质）"
          placeholder=""
        />

        <SettingSwitch
          label="随机额外特效"
          value={config['Random Additional Effects'] === 'true'}
          onChange={checked => onUpdateConfig('Random Additional Effects', String(checked))}
          description="在随机品质中包含钻石或签名特效（基于随机品质）"
          id=""
        />
      </CardContent>
    </Card>
  )
})
PackSimulationCard.displayName = 'PackSimulationCard'

// 主组件
export function PackSettings() {
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
      <DeviceSimulationCard config={config} onUpdateConfig={handleUpdateConfig} />
      <PackSimulationCard config={config} onUpdateConfig={handleUpdateConfig} />
    </div>
  )
}
