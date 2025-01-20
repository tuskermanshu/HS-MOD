import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { memo } from 'react'

const SettingInput = memo(({
  label,
  description,
  value,
  onChange,
  type = 'text',
  placeholder,
  className = 'w-[80%]',
  min,
  max,
}: {
  label: string
  description: string
  value: string | number
  onChange: (value: string) => void
  type?: string
  placeholder?: string
  className?: string
  min?: number
  max?: number
}) => (
  <div className="space-y-2">
    <div className="space-y-0.5">
      <Label className="text-base">{label}</Label>
      <p className="text-[13px] text-muted-foreground">{description}</p>
    </div>
    <div className={className}>
      <Input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-9"
        min={min}
        max={max}
      />
    </div>
  </div>
))
SettingInput.displayName = 'SettingInput'

export default SettingInput
