import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { memo } from 'react'

// 开关组件
const SettingSwitch = memo(({
  id,
  label,
  description,
  value,
  onChange,
}: {
  id: string
  label: string
  description: string
  value: boolean
  onChange: (value: boolean) => void
}) => (
  <div className="flex items-center justify-between space-x-2">
    <div className="space-y-0.5">
      <Label className="text-base" htmlFor={id}>{label}</Label>
      <p className="text-[13px] text-muted-foreground">
        {description}
      </p>
    </div>
    <Switch
      id={id}
      checked={value}
      onCheckedChange={onChange}
    />
  </div>
))
SettingSwitch.displayName = 'SettingSwitch'

export default SettingSwitch
