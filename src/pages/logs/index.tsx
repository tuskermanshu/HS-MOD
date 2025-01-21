import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { logsService } from "@/services/logs"
import { useEffect, useState } from "react"

export function Logs() {
  const [activeTab, setActiveTab] = useState('bepinex')
  const [logContent, setLogContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchLog = async (type: string) => {
    setLoading(true)
    setError(null)
    try {
      let content = ''
      switch (type) {
        case 'bepinex':
          content = await logsService.getBepInExLog()
          break
        case 'bepinex-recent':
          content = await logsService.getRecentBepInExLog()
          break
        case 'skins':
          content = await logsService.getSkinsLog()
          break
        case 'match':
          content = await logsService.getMatchLog()
          break
        case 'mercenaries':
          content = await logsService.getMercenariesLog()
          break
      }

      setLogContent(content)
    } catch (err) {
      setError(err instanceof Error ? err.message : '获取日志失败')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // 首次加载
    fetchLog(activeTab)

    // 设置30秒自动刷新
    const intervalId = setInterval(() => {
      fetchLog(activeTab)
    }, 30000)

    // 清理定时器
    return () => clearInterval(intervalId)
  }, [activeTab])

  return (
    <div className="h-full w-full">
      <div className="p-6 space-y-6 mt-2" >
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">日志查看</h2>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col flex-1">
          <div className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
            <div className="w-[730px]   mx-auto">
              <TabsList className="flex w-[712px] h-12 overflow-x-auto space-x-4 p-2 [&::-webkit-scrollbar]:hidden justify-around">
                <TabsTrigger value="bepinex" className="flex-1  px-8 py-3">
                  完整日志
                </TabsTrigger>
                <TabsTrigger value="bepinex-recent" className="flex-1  px-8 py-3">
                  最近日志
                </TabsTrigger>
                <TabsTrigger value="match" className="flex-1  px-8 py-3">
                  对局日志
                </TabsTrigger>
                <TabsTrigger value="skins" className="flex-1  px-8 py-3">
                  皮肤信息
                </TabsTrigger>
                <TabsTrigger value="mercenaries" className="flex-1  px-8 py-3">
                  佣兵信息
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <div className="flex-1 w-full mt-4">
            <div className="w-[730px] mx-auto">
              <Card className="w-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="space-y-1">
                    <CardTitle>日志内容</CardTitle>
                    <CardDescription >
                      {activeTab === 'bepinex' && 'BepInEx 完整日志'}
                      {activeTab === 'bepinex-recent' && 'BepInEx 最近日志（最后666行）'}
                      {activeTab === 'skins' && '皮肤信息（需要登录）'}
                      {activeTab === 'match' && '对局日志'}
                      {activeTab === 'mercenaries' && '佣兵信息（需要登录）'}
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => fetchLog(activeTab)}
                    disabled={loading}
                  >
                    刷新
                  </Button>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[600px] w-full rounded-md border p-4">
                    { error ? (
                      <div className="flex items-center justify-center h-full">
                        <p className="text-destructive">{error}</p>
                      </div>
                    ) : !logContent ? (
                      <div className="flex items-center justify-center h-full">
                        <p className="text-muted-foreground">暂无日志内容</p>
                      </div>
                    ) : (
                      <div className="w-full">
                        <pre className="text-sm font-mono w-full" style={{ 
                          whiteSpace: 'pre-wrap',
                          wordBreak: 'break-all',
                          overflowWrap: 'break-word',
                          width: '100%',
                          maxWidth: '100%',
                          display: 'block'
                        }}>
                          {logContent}
                        </pre>
                      </div>
                    )}
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  )
} 