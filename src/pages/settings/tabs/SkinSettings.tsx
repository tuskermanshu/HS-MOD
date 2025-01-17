import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

export function SkinSettings() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>皮肤设置</CardTitle>
          <CardDescription>游戏皮肤相关设置</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-1">
              <Label htmlFor="enable-skins">启用皮肤</Label>
              <p className="text-sm text-muted-foreground">
                启用自定义皮肤功能
              </p>
            </div>
            <Switch id="enable-skins" defaultChecked />
          </div>

          <div className="space-y-2">
            <Label>默认皮肤</Label>
            <Select defaultValue="default">
              <SelectTrigger>
                <SelectValue placeholder="选择默认皮肤" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">默认</SelectItem>
                <SelectItem value="classic">经典</SelectItem>
                <SelectItem value="modern">现代</SelectItem>
                <SelectItem value="custom">自定义</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="skin-path">皮肤路径</Label>
            <Input id="skin-path" placeholder="输入自定义皮肤路径" />
            <p className="text-sm text-muted-foreground">
              自定义皮肤文件的存放路径
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>卡牌皮肤</CardTitle>
          <CardDescription>卡牌皮肤显示设置</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-1">
              <Label htmlFor="card-back">自定义卡背</Label>
              <p className="text-sm text-muted-foreground">
                启用自定义卡背显示
              </p>
            </div>
            <Switch id="card-back" />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-1">
              <Label htmlFor="card-portrait">自定义卡牌肖像</Label>
              <p className="text-sm text-muted-foreground">
                启用自定义卡牌肖像显示
              </p>
            </div>
            <Switch id="card-portrait" />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-1">
              <Label htmlFor="premium-effects">高级特效</Label>
              <p className="text-sm text-muted-foreground">
                启用高级卡牌特效
              </p>
            </div>
            <Switch id="premium-effects" defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>界面皮肤</CardTitle>
          <CardDescription>游戏界面皮肤设置</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-1">
              <Label htmlFor="custom-background">自定义背景</Label>
              <p className="text-sm text-muted-foreground">
                启用自定义游戏背景
              </p>
            </div>
            <Switch id="custom-background" />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-1">
              <Label htmlFor="custom-board">自定义对战面板</Label>
              <p className="text-sm text-muted-foreground">
                启用自定义对战面板
              </p>
            </div>
            <Switch id="custom-board" />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-1">
              <Label htmlFor="custom-ui">自定义UI元素</Label>
              <p className="text-sm text-muted-foreground">
                启用自定义UI界面元素
              </p>
            </div>
            <Switch id="custom-ui" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 