import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

export function PackSettings() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>开包设置</CardTitle>
          <CardDescription>卡包开启相关设置</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-1">
              <Label htmlFor="quick-pack-opening">快速开包</Label>
              <p className="text-sm text-muted-foreground">
                启用快速开包模式
              </p>
            </div>
            <Switch id="quick-pack-opening" />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-1">
              <Label htmlFor="auto-pack-opening">自动开包</Label>
              <p className="text-sm text-muted-foreground">
                自动开启卡包
              </p>
            </div>
            <Switch id="auto-pack-opening" />
          </div>

          <div className="space-y-2">
            <Label>开包延迟（毫秒）</Label>
            <Slider
              defaultValue={[500]}
              max={2000}
              min={0}
              step={100}
              className="w-full"
            />
            <p className="text-sm text-muted-foreground">
              设置自动开包时的延迟时间
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>卡包模拟</CardTitle>
          <CardDescription>卡包开启模拟设置</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-1">
              <Label htmlFor="pack-simulation">启用卡包模拟</Label>
              <p className="text-sm text-muted-foreground">
                启用卡包开启模拟功能
              </p>
            </div>
            <Switch id="pack-simulation" />
          </div>

          <div className="space-y-2">
            <Label>模拟品质</Label>
            <Select defaultValue="random">
              <SelectTrigger>
                <SelectValue placeholder="选择卡牌品质" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="random">随机</SelectItem>
                <SelectItem value="normal">普通</SelectItem>
                <SelectItem value="rare">稀有</SelectItem>
                <SelectItem value="epic">史诗</SelectItem>
                <SelectItem value="legendary">传说</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-1">
              <Label htmlFor="golden-simulation">金卡模拟</Label>
              <p className="text-sm text-muted-foreground">
                模拟开出金卡
              </p>
            </div>
            <Switch id="golden-simulation" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 