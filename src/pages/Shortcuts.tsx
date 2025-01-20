import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

export function Shortcuts() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">快捷键设置</h2>
        <p className="text-muted-foreground">自定义应用快捷键</p>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>游戏快捷键</CardTitle>
            <CardDescription>游戏内快捷键设置</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="end-turn">结束回合</Label>
                <Input id="end-turn" defaultValue="Space" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="concede">投降</Label>
                <Input id="concede" defaultValue="Escape" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emote">表情</Label>
                <Input id="emote" defaultValue="E" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="squelch">屏蔽表情</Label>
                <Input id="squelch" defaultValue="Shift+S" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>功能快捷键</CardTitle>
            <CardDescription>辅助功能快捷键设置</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="speed-gear">变速齿轮</Label>
                <Input id="speed-gear" defaultValue="Alt+S" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fps-display">FPS显示</Label>
                <Input id="fps-display" defaultValue="Alt+F" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="quick-pack">快速开包</Label>
                <Input id="quick-pack" defaultValue="Alt+O" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="auto-battle">自动对战</Label>
                <Input id="auto-battle" defaultValue="Alt+B" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>快捷键设置</CardTitle>
            <CardDescription>全局快捷键配置</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between space-x-2">
              <div className="space-y-1">
                <Label htmlFor="enable-shortcuts">启用快捷键</Label>
                <p className="text-sm text-muted-foreground">
                  全局启用/禁用快捷键功能
                </p>
              </div>
              <Switch id="enable-shortcuts" defaultChecked />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <div className="space-y-1">
                <Label htmlFor="override-game">覆盖游戏快捷键</Label>
                <p className="text-sm text-muted-foreground">
                  允许覆盖游戏默认快捷键
                </p>
              </div>
              <Switch id="override-game" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
