import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { memo } from 'react'

interface SettingInputProps {
  label: string
  description: string
  value: string
  onChange: (value: string) => void
  type?: string
  placeholder?: string
  className?: string
  min?: number
  max?: number
}

const SettingInput = memo(({
  label,
  description,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  className = 'w-[174px] h-[20px]',
  min,
  max,
}: SettingInputProps) => (
  <div className="flex items-center justify-between">
    <div className="space-y-0.5">
      <Label className="text-sm font-medium">{label}</Label>
      <p className="text-[13px] text-muted-foreground">{description}</p>
    </div>
    <Input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      className={className}
      placeholder={placeholder}
      min={min}
      max={max}
    />
  </div>
))

SettingInput.displayName = 'SettingInput'

export default SettingInput
