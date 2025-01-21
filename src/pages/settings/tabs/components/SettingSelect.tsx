import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { memo } from 'react'

interface SettingSelectProps {
  label: string
  description: string
  value: string
  onChange: (value: string) => void
  options: Array<{ value: string, label: string }>
  placeholder?: string
}

const SettingSelect = memo(({
  label,
  description,
  value,
  onChange,
  options,
  placeholder = '请选择',
}: SettingSelectProps) => (
  <div className="flex items-center justify-between">
    <div className="space-y-0.5">
      <Label className="text-sm font-medium">
        {label}
      </Label>
      <p className="text-[13px] text-muted-foreground">
        {description}
      </p>
    </div>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map(option => (
          <SelectItem
            key={option.value}
            value={option.value}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
))

SettingSelect.displayName = 'SettingSelect'

export default SettingSelect
