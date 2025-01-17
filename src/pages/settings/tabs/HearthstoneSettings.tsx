import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function HearthstoneSettings() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>游戏功能</CardTitle>
          <CardDescription>基础游戏功能设置</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-1">
              <Label htmlFor="quick-battle">快速对战</Label>
              <p className="text-sm text-muted-foreground">
                启用酒馆或佣兵AI快速对战模式
              </p>
            </div>
            <Switch id="quick-battle" />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-1">
              <Label htmlFor="show-full-name">显示完整名称</Label>
              <p className="text-sm text-muted-foreground">
                显示对手的完整战网ID
              </p>
            </div>
            <Switch id="show-full-name" />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-1">
              <Label htmlFor="show-rank">显示天梯等级</Label>
              <p className="text-sm text-muted-foreground">
                显示对手的传说前天梯等级
              </p>
            </div>
            <Switch id="show-rank" />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-1">
              <Label htmlFor="card-tracker">卡牌追踪</Label>
              <p className="text-sm text-muted-foreground">
                预测对手卡牌并提供提示
              </p>
            </div>
            <Switch id="card-tracker" />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-1">
              <Label htmlFor="card-reveal">显示已知卡牌</Label>
              <p className="text-sm text-muted-foreground">
                已知卡牌正面朝上显示
              </p>
            </div>
            <Switch id="card-reveal" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>特效设置</CardTitle>
          <CardDescription>游戏特效相关设置</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-1">
              <Label htmlFor="opponent-effects">对手卡牌特效</Label>
              <p className="text-sm text-muted-foreground">
                显示对手的卡牌特效（覆盖所有配置）
              </p>
            </div>
            <Switch id="opponent-effects" />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-1">
              <Label htmlFor="signature-effects">签名特效</Label>
              <p className="text-sm text-muted-foreground">
                在最高卡牌特效中显示签名特效
              </p>
            </div>
            <Switch id="signature-effects" />
          </div>

          <div className="space-y-2">
            <Label>金卡特效</Label>
            <Select defaultValue="Default">
              <SelectTrigger>
                <SelectValue placeholder="选择特效设置" />
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
            <Label>最高品质特效</Label>
            <Select defaultValue="Default">
              <SelectTrigger>
                <SelectValue placeholder="选择特效设置" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Default">默认</SelectItem>
                <SelectItem value="OnlyMy">仅自己</SelectItem>
                <SelectItem value="All">全部</SelectItem>
                <SelectItem value="Disabled">禁用</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>表情系统</CardTitle>
          <CardDescription>表情和互动相关设置</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-1">
              <Label htmlFor="unlimited-emote">无限表情</Label>
              <p className="text-sm text-muted-foreground">
                允许无限使用表情（最小间隔1.5秒）
              </p>
            </div>
            <Switch id="unlimited-emote" />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-1">
              <Label htmlFor="thinking-emote">思考表情</Label>
              <p className="text-sm text-muted-foreground">
                允许思考表情
              </p>
            </div>
            <Switch id="thinking-emote" defaultChecked />
          </div>

          <div className="space-y-2">
            <Label>表情限制</Label>
            <Select defaultValue="-1">
              <SelectTrigger>
                <SelectValue placeholder="选择限制次数" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="-1">无限制</SelectItem>
                <SelectItem value="0">完全禁用</SelectItem>
                <SelectItem value="3">3次</SelectItem>
                <SelectItem value="5">5次</SelectItem>
                <SelectItem value="10">10次</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              每局接收表情限制次数，超出后屏蔽对手表情
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 