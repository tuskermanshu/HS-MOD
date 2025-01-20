import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'

export function PackSettings() {
  return (
    <div className="space-y-6">
      {/* 开包设置 */}
      <Card className="border-none shadow-none">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-semibold tracking-tight">开包设置</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            卡包开启相关配置
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 pt-3">
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label className="text-base" htmlFor="quick-open">快速开包</Label>
              <p className="text-[13px] text-muted-foreground">
                跳过开包动画直接显示结果
              </p>
            </div>
            <Switch id="quick-open" />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label className="text-base" htmlFor="auto-open">自动开包</Label>
              <p className="text-[13px] text-muted-foreground">
                自动开启获得的卡包
              </p>
            </div>
            <Switch id="auto-open" />
          </div>

          <div className="space-y-2">
            <div className="space-y-0.5">
              <Label className="text-base">开包延迟</Label>
              <p className="text-[13px] text-muted-foreground">
                设置自动开包的延迟时间（毫秒）
              </p>
            </div>
            <div className="w-[40%]">
              <Input
                type="number"
                min="0"
                placeholder="请输入延迟时间"
                className="h-9"
              />
            </div>
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label className="text-base" htmlFor="skip-animation">跳过动画</Label>
              <p className="text-[13px] text-muted-foreground">
                跳过开包过程中的动画效果
              </p>
            </div>
            <Switch id="skip-animation" />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label className="text-base" htmlFor="auto-confirm">自动确认</Label>
              <p className="text-[13px] text-muted-foreground">
                自动确认开包结果
              </p>
            </div>
            <Switch id="auto-confirm" />
          </div>
        </CardContent>
      </Card>

      {/* 模拟设置 */}
      <Card className="border-none shadow-none">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-semibold tracking-tight">模拟设置</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            卡包模拟相关配置
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 pt-3">
          <div className="space-y-2">
            <div className="space-y-0.5">
              <Label className="text-base">模拟开包状态</Label>
              <p className="text-[13px] text-muted-foreground">
                设置模拟开包的结果状态
              </p>
            </div>
            <div className="w-[60%]">
              <Select defaultValue="Default">
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="选择模拟状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Default">默认</SelectItem>
                  <SelectItem value="Success">成功</SelectItem>
                  <SelectItem value="Failed">失败</SelectItem>
                  <SelectItem value="Random">随机</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <div className="space-y-0.5">
              <Label className="text-base">模拟卡包数量</Label>
              <p className="text-[13px] text-muted-foreground">
                设置要模拟开启的卡包数量
              </p>
            </div>
            <div className="w-[40%]">
              <Input
                type="number"
                min="1"
                placeholder="请输入卡包数量"
                className="h-9"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="space-y-0.5">
              <Label className="text-base">卡包类型</Label>
              <p className="text-[13px] text-muted-foreground">
                选择要模拟开启的卡包类型
              </p>
            </div>
            <div className="w-[60%]">
              <Select defaultValue="Classic">
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="选择卡包类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Classic">经典卡包</SelectItem>
                  <SelectItem value="Latest">最新扩展包</SelectItem>
                  <SelectItem value="Golden">黄金卡包</SelectItem>
                  <SelectItem value="Random">随机卡包</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label className="text-base" htmlFor="save-results">保存结果</Label>
              <p className="text-[13px] text-muted-foreground">
                保存模拟开包的结果记录
              </p>
            </div>
            <Switch id="save-results" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
