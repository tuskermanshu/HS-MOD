import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'

export function SkinSettings() {
  return (
    <div className="space-y-6">
      <Card className="border-none shadow-none">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-semibold tracking-tight">皮肤设置</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            游戏皮肤和外观设置
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 pt-3">
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label className="text-base" htmlFor="custom-skin">自定义皮肤</Label>
              <p className="text-[13px] text-muted-foreground">
                启用自定义皮肤功能
              </p>
            </div>
            <Switch id="custom-skin" />
          </div>

          <div className="space-y-2">
            <Label className="text-base">皮肤类型</Label>
            <Select defaultValue="Default">
              <SelectTrigger className="h-9">
                <SelectValue placeholder="选择皮肤类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Default">默认</SelectItem>
                <SelectItem value="Classic">经典</SelectItem>
                <SelectItem value="Modern">现代</SelectItem>
                <SelectItem value="Custom">自定义</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-1">
              <Label htmlFor="card-back">卡背皮肤</Label>
              <p className="text-sm text-muted-foreground">
                启用自定义卡背皮肤
              </p>
            </div>
            <Switch id="card-back" />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-1">
              <Label htmlFor="board-skin">对战面板皮肤</Label>
              <p className="text-sm text-muted-foreground">
                启用自定义对战面板皮肤
              </p>
            </div>
            <Switch id="board-skin" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-none">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-semibold tracking-tight">特效设置</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            游戏特效和动画设置
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 pt-3">
          <div className="space-y-2">
            <Label>金卡特效</Label>
            <Select defaultValue="Default">
              <SelectTrigger>
                <SelectValue placeholder="选择特效模式" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Default">默认</SelectItem>
                <SelectItem value="OnlyMy">仅自己</SelectItem>
                <SelectItem value="All">全部</SelectItem>
                <SelectItem value="Disabled">禁用</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>钻石卡特效</Label>
            <Select defaultValue="Default">
              <SelectTrigger>
                <SelectValue placeholder="选择特效模式" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Default">默认</SelectItem>
                <SelectItem value="OnlyMy">仅自己</SelectItem>
                <SelectItem value="All">全部</SelectItem>
                <SelectItem value="Disabled">禁用</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-1">
              <Label htmlFor="opponent-effects">对手特效</Label>
              <p className="text-sm text-muted-foreground">
                显示对手卡牌特效
              </p>
            </div>
            <Switch id="opponent-effects" />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-1">
              <Label htmlFor="alternative-art">异画特效</Label>
              <p className="text-sm text-muted-foreground">
                显示卡牌异画特效
              </p>
            </div>
            <Switch id="alternative-art" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
