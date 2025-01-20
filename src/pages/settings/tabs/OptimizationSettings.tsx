import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'

export function OptimizationSettings() {
  return (
    <div className="space-y-6">
      {/* 消息与提示 */}
      <Card className="border-none shadow-none">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-semibold tracking-tight">消息与提示</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            游戏内消息和提示设置
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 pt-3">
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label className="text-base" htmlFor="in-game-messages">游戏内消息</Label>
              <p className="text-[13px] text-muted-foreground">
                显示游戏内消息（广告、削弱补丁、天梯结算信息等）
              </p>
            </div>
            <Switch id="in-game-messages" defaultChecked />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label className="text-base" htmlFor="popup-messages">弹窗消息</Label>
              <p className="text-[13px] text-muted-foreground">
                显示游戏弹窗消息提示
              </p>
            </div>
            <Switch id="popup-messages" defaultChecked />
          </div>

          <div className="space-y-2">
            <div className="space-y-0.5">
              <Label className="text-base">弹窗响应方式</Label>
              <p className="text-[13px] text-muted-foreground">
                设置弹窗的自动响应方式
              </p>
            </div>
            <div className="w-[60%]">
              <Select defaultValue="DONOTHING">
                <SelectTrigger className="h-9">
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
          </div>
        </CardContent>
      </Card>

      {/* 游戏优化 */}
      <Card className="border-none shadow-none">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-semibold tracking-tight">游戏优化</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            游戏性能和运行优化设置
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 pt-3">
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label className="text-base" htmlFor="quick-battle">快速对战</Label>
              <p className="text-[13px] text-muted-foreground">
                加快对战速度，减少等待时间
              </p>
            </div>
            <Switch id="quick-battle" />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label className="text-base" htmlFor="auto-box">自动开盒</Label>
              <p className="text-[13px] text-muted-foreground">
                自动开启获得的卡包
              </p>
            </div>
            <Switch id="auto-box" />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label className="text-base" htmlFor="error-exit">报错退出</Label>
              <p className="text-[13px] text-muted-foreground">
                发生错误时自动退出游戏
              </p>
            </div>
            <Switch id="error-exit" />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label className="text-base" htmlFor="idle-disconnect">无操作掉线</Label>
              <p className="text-[13px] text-muted-foreground">
                长时间无操作时自动断开连接
              </p>
            </div>
            <Switch id="idle-disconnect" />
          </div>

          <div className="space-y-2">
            <div className="space-y-0.5">
              <Label className="text-base">无操作时间</Label>
              <p className="text-[13px] text-muted-foreground">
                设置无操作自动断开的时间（秒）
              </p>
            </div>
            <div className="w-[40%]">
              <Input type="number" min="0" placeholder="请输入时间（秒）" className="h-9" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 设备模拟 */}
      <Card className="border-none shadow-none">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-semibold tracking-tight">设备模拟</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            设备类型和系统模拟配置
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 pt-3">
          <div className="space-y-2">
            <div className="space-y-0.5">
              <Label className="text-base">设备类型</Label>
              <p className="text-[13px] text-muted-foreground">
                选择要模拟的设备类型
              </p>
            </div>
            <div className="w-[60%]">
              <Select defaultValue="Default">
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="选择设备类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Default">默认</SelectItem>
                  <SelectItem value="Phone">手机</SelectItem>
                  <SelectItem value="Tablet">平板</SelectItem>
                  <SelectItem value="Desktop">桌面</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <div className="space-y-0.5">
              <Label className="text-base">系统类型</Label>
              <p className="text-[13px] text-muted-foreground">
                选择要模拟的系统类型
              </p>
            </div>
            <div className="w-[60%]">
              <Select defaultValue="Default">
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="选择系统类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Default">默认</SelectItem>
                  <SelectItem value="iOS">iOS</SelectItem>
                  <SelectItem value="Android">Android</SelectItem>
                  <SelectItem value="Windows">Windows</SelectItem>
                  <SelectItem value="macOS">macOS</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <div className="space-y-0.5">
              <Label className="text-base">分辨率</Label>
              <p className="text-[13px] text-muted-foreground">
                选择要模拟的设备分辨率
              </p>
            </div>
            <div className="w-[60%]">
              <Select defaultValue="Default">
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="选择分辨率" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Default">默认</SelectItem>
                  <SelectItem value="1920x1080">1920x1080</SelectItem>
                  <SelectItem value="2560x1440">2560x1440</SelectItem>
                  <SelectItem value="3840x2160">3840x2160</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label className="text-base" htmlFor="force-window">强制窗口模式</Label>
              <p className="text-[13px] text-muted-foreground">
                强制游戏以窗口模式运行
              </p>
            </div>
            <Switch id="force-window" />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label className="text-base" htmlFor="disable-fullscreen">禁用全屏</Label>
              <p className="text-[13px] text-muted-foreground">
                禁止游戏进入全屏模式
              </p>
            </div>
            <Switch id="disable-fullscreen" />
          </div>
        </CardContent>
      </Card>

      {/* 性能优化 */}
      <Card className="border-none shadow-none">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-semibold tracking-tight">性能优化</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            游戏性能和优化相关配置
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 pt-3">
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label className="text-base" htmlFor="app-focus">应用程序焦点</Label>
              <p className="text-[13px] text-muted-foreground">
                失去焦点时暂停游戏
              </p>
            </div>
            <Switch id="app-focus" />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label className="text-base" htmlFor="low-quality">低画质模式</Label>
              <p className="text-[13px] text-muted-foreground">
                降低画质以提升性能
              </p>
            </div>
            <Switch id="low-quality" />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label className="text-base" htmlFor="disable-animation">禁用动画</Label>
              <p className="text-[13px] text-muted-foreground">
                关闭游戏中的动画效果
              </p>
            </div>
            <Switch id="disable-animation" />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label className="text-base" htmlFor="reduce-effects">降低特效</Label>
              <p className="text-[13px] text-muted-foreground">
                降低游戏特效质量
              </p>
            </div>
            <Switch id="reduce-effects" />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label className="text-base" htmlFor="error-exit">报错退出</Label>
              <p className="text-[13px] text-muted-foreground">
                发生错误时自动退出游戏
              </p>
            </div>
            <Switch id="error-exit" />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label className="text-base" htmlFor="idle-disconnect">无操作掉线</Label>
              <p className="text-[13px] text-muted-foreground">
                长时间无操作时断开连接
              </p>
            </div>
            <Switch id="idle-disconnect" />
          </div>
        </CardContent>
      </Card>

      {/* 其他优化 */}
      <Card className="border-none shadow-none">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-semibold tracking-tight">其他优化</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            其他游戏优化设置
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 pt-3">
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label className="text-base" htmlFor="show-card-quantity">显示卡牌数量</Label>
              <p className="text-[13px] text-muted-foreground">
                收藏卡牌数量大于等于10时显示数量
              </p>
            </div>
            <Switch id="show-card-quantity" />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label className="text-base" htmlFor="show-card-id">显示卡牌ID</Label>
              <p className="text-[13px] text-muted-foreground">
                右键选择卡牌时显示并复制CardID
              </p>
            </div>
            <Switch id="show-card-id" />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label className="text-base" htmlFor="deck-share-code">移除套牌分享码检查</Label>
              <p className="text-[13px] text-muted-foreground">
                移除套牌分享码检查
              </p>
            </div>
            <Switch id="deck-share-code" />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label className="text-base" htmlFor="show-concede">允许0-0投降</Label>
              <p className="text-[13px] text-muted-foreground">
                允许在0-0时投降套牌
              </p>
            </div>
            <Switch id="show-concede" />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label className="text-base" htmlFor="allow-disconnect">允许断线</Label>
              <p className="text-[13px] text-muted-foreground">
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
