import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { logsService } from '@/services/logs'
import { AlertCircle, X } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ProcessStatusCheck() {
  const [showDialog, setShowDialog] = useState(false)
  const [status, setStatus] = useState<{ pid: number | null, login: boolean }>({
    pid: null,
    login: false,
  })

  const checkStatus = async () => {
    try {
      const result = await logsService.getProcessStatus()
      setStatus(result)

      // 如果进程不存在或未登录，显示弹窗
      if (!result.pid || !result.login)
        setShowDialog(true)
    }
    catch (error) {
      setStatus({ pid: null, login: false })
      console.error(error)
      setShowDialog(true)
    }
  }

  useEffect(() => {
    // 初始检查
    checkStatus()

    // 每30秒检查一次
    const interval = setInterval(checkStatus, 30000)

    return () => clearInterval(interval)
  }, [])

  if (!showDialog)
    return null

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>状态异常</DialogTitle>
          <DialogDescription>
            检测到炉石传说状态异常，请检查以下信息：
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {!status.pid && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>进程未运行</AlertTitle>
              <AlertDescription>
                未检测到炉石传说进程，请确保游戏已启动。
              </AlertDescription>
            </Alert>
          )}
          {status.pid && !status.login && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>未登录</AlertTitle>
              <AlertDescription>
                炉石传说未登录，请先登录游戏。
              </AlertDescription>
            </Alert>
          )}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => checkStatus()}>
              重新检查
            </Button>
            <Button variant="ghost" onClick={() => setShowDialog(false)}>
              关闭
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
