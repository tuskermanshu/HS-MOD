import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function OptimizationSettings() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>消息与提示</CardTitle>
          <CardDescription>游戏内消息和提示设置</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-1">
              <Label htmlFor="in-game-messages">游戏内消息</Label>
              <p className="text-sm text-muted-foreground">
                显示游戏内消息（广告、削弱补丁、天梯结算信息等）
              </p>
            </div>
            <Switch id="in-game-messages" defaultChecked />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-1">
              <Label htmlFor="popup-messages">弹窗消息</Label>
              <p className="text-sm text-muted-foreground">
                显示弹窗消息
              </p>
            </div>
            <Switch id="popup-messages" defaultChecked />
          </div>

          <div className="space-y-2">
            <Label>弹窗响应方式</Label>
            <Select defaultValue="DONOTHING">
              <SelectTrigger>
                <SelectValue placeholder="选择响应方式" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="OK">确定</SelectItem>
                <SelectItem value="CONFIRM">确认</SelectItem>
                <SelectItem value="CANCEL">取消</SelectItem>
                <SelectItem value="YES">是</SelectItem>
                <SelectItem value="DONOTHING">不处理</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>性能优化</CardTitle>
          <CardDescription>游戏性能相关设置</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-1">
              <Label htmlFor="application-focus">应用程序焦点</Label>
              <p className="text-sm text-muted-foreground">
                isOnApplicationFocus
              </p>
            </div>
            <Switch id="application-focus" defaultChecked />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-1">
              <Label htmlFor="settlement-display">结算显示</Label>
              <p className="text-sm text-muted-foreground">
                显示任务完成、成就奖励、升级提示等
              </p>
            </div>
            <Switch id="settlement-display" defaultChecked />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-1">
              <Label htmlFor="auto-open-boxes">自动开启宝箱</Label>
              <p className="text-sm text-muted-foreground">
                自动开启竞技场（对决、佣兵等）宝箱
              </p>
            </div>
            <Switch id="auto-open-boxes" />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-1">
              <Label htmlFor="auto-exit-error">错误自动退出</Label>
              <p className="text-sm text-muted-foreground">
                出现错误时自动退出
              </p>
            </div>
            <Switch id="auto-exit-error" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>其他优化</CardTitle>
          <CardDescription>其他游戏优化设置</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-1">
              <Label htmlFor="show-card-quantity">显示卡牌数量</Label>
              <p className="text-sm text-muted-foreground">
                收藏卡牌数量大于等于10时显示数量
              </p>
            </div>
            <Switch id="show-card-quantity" />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-1">
              <Label htmlFor="show-card-id">显示卡牌ID</Label>
              <p className="text-sm text-muted-foreground">
                右键选择卡牌时显示并复制CardID
              </p>
            </div>
            <Switch id="show-card-id" />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-1">
              <Label htmlFor="deck-share-code">移除套牌分享码检查</Label>
              <p className="text-sm text-muted-foreground">
                移除套牌分享码检查
              </p>
            </div>
            <Switch id="deck-share-code" />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-1">
              <Label htmlFor="show-concede">允许0-0投降</Label>
              <p className="text-sm text-muted-foreground">
                允许在0-0时投降套牌
              </p>
            </div>
            <Switch id="show-concede" />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-1">
              <Label htmlFor="allow-disconnect">允许断线</Label>
              <p className="text-sm text-muted-foreground">
                允许长时间无操作后断线
              </p>
            </div>
            <Switch id="allow-disconnect" defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 