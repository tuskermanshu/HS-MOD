import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

export function GlobalSettings() {
  const [speedMultiplier, setSpeedMultiplier] = useState(10)

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>基础设置</CardTitle>
          <CardDescription>调整应用的基本运行参数</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="hsmod-status">HsMod 状态</Label>
            <Switch id="hsmod-status" />
          </div>

          <div className="space-y-2">
            <Label>语言设置</Label>
            <Select defaultValue="enUS">
              <SelectTrigger>
                <SelectValue placeholder="选择语言" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="enUS">English (US)</SelectItem>
                <SelectItem value="enGB">English (GB)</SelectItem>
                <SelectItem value="zhCN">简体中文</SelectItem>
                <SelectItem value="zhTW">繁體中文</SelectItem>
                <SelectItem value="jaJP">日本語</SelectItem>
                <SelectItem value="koKR">한국어</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>配置模板</Label>
            <Select defaultValue="DoNothing">
              <SelectTrigger>
                <SelectValue placeholder="选择配置模板" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DoNothing">不执行操作</SelectItem>
                <SelectItem value="AwayFromKeyboard">挂机模式</SelectItem>
                <SelectItem value="AntiAwayFromKeyboard">反挂机模式</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="shortcut-status">快捷键状态</Label>
            <Switch id="shortcut-status" />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="speed-gear">速度齿轮状态</Label>
            <Switch id="speed-gear" />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>速度倍率</Label>
              <span className="text-sm text-muted-foreground">{speedMultiplier}x</span>
            </div>
            <Slider
              value={[speedMultiplier]}
              onValueChange={([value]) => setSpeedMultiplier(value)}
              max={32}
              min={-32}
              step={1}
              className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
            />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="show-fps">显示 FPS</Label>
            <Switch id="show-fps" />
          </div>

          <div className="space-y-2">
            <Label>游戏帧率</Label>
            <Select defaultValue="-1">
              <SelectTrigger>
                <SelectValue placeholder="选择帧率" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="-1">默认</SelectItem>
                <SelectItem value="30">30 FPS</SelectItem>
                <SelectItem value="60">60 FPS</SelectItem>
                <SelectItem value="120">120 FPS</SelectItem>
                <SelectItem value="144">144 FPS</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 