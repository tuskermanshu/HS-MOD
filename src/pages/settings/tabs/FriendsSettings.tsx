import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function FriendsSettings() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>好友设置</CardTitle>
          <CardDescription>管理好友相关功能</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-1">
              <Label htmlFor="auto-report">自动举报</Label>
              <p className="text-sm text-muted-foreground">
                对手昵称违规、作弊、脚本或恶意投降时自动举报
              </p>
            </div>
            <Switch id="auto-report" />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-1">
              <Label htmlFor="spectate-cards">观战显示卡牌</Label>
              <p className="text-sm text-muted-foreground">
                在观战模式中显示（轮换）对手的卡牌
              </p>
            </div>
            <Switch id="spectate-cards" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 