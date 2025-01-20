import { Label } from '@radix-ui/react-label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@radix-ui/react-select'
import { memo } from 'react'

interface SettingSelectProps {
  label: string
  description: string
  value: string
  onChange: (value: string) => void
  options: Array<{ value: string, label: string }>
  placeholder: string
  className?: string
}

const SettingSelect = memo(({
  label,
  description,
  value,
  onChange,
  options,
  placeholder,
  className = 'w-[60%]',
}: SettingSelectProps) => (
  <div className="space-y-2">
    <div className="space-y-0.5">
      <Label className="text-base">{label}</Label>
      <p className="text-[13px] text-muted-foreground">{description}</p>
    </div>
    <div className={className}>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-9">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  </div>
))
SettingSelect.displayName = 'SettingSelect'

export default SettingSelect
