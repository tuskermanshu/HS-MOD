import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function DevelopmentSettings() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>开发设置</CardTitle>
          <CardDescription>调整开发相关参数</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>炉石日志路径</Label>
            <Input 
              defaultValue="/Applications/Hearthstone/Hearthstone.app/Contents/../../Logs/Hearthstone"
              placeholder="输入日志路径"
            />
          </div>

          <div className="space-y-2">
            <Label>对战日志路径</Label>
            <Input 
              defaultValue="/Applications/Hearthstone/BepInEx/HsMod/match.log"
              placeholder="输入对战日志路径"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>自动退出计时器</Label>
              <span className="text-sm text-muted-foreground">秒</span>
            </div>
            <Input 
              type="number"
              defaultValue="0"
              placeholder="输入秒数"
            />
            <p className="text-sm text-muted-foreground">设置为0或负数禁用此选项</p>
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-1">
              <Label htmlFor="simulate-pack">模拟开包</Label>
              <p className="text-sm text-muted-foreground">
                启用模拟开包功能（建议重启炉石）
              </p>
            </div>
            <Switch id="simulate-pack" />
          </div>

          <div className="space-y-2">
            <Label>Web服务器端口</Label>
            <Input 
              type="number"
              defaultValue="58744"
              min="1"
              max="65535"
              placeholder="输入端口号"
            />
          </div>

          <div className="space-y-2">
            <Label>网页背景图片</Label>
            <Input 
              defaultValue="https://imgapi.cn/cos.php"
              placeholder="输入图片URL"
            />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-1">
              <Label htmlFor="webshell">Webshell</Label>
              <p className="text-sm text-muted-foreground">
                启用Webshell功能
              </p>
            </div>
            <Switch id="webshell" />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-1">
              <Label htmlFor="internal-mode">内部模式</Label>
              <p className="text-sm text-muted-foreground">
                切换到内部模式（需要重启炉石）
              </p>
            </div>
            <Switch id="internal-mode" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 