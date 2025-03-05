import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { logsService } from '@/services/logs'
import { AlertCircle } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ProcessContentCheck() {
  const [showDialog, setShowDialog] = useState(false)
  const [gamePath, setGamePath] = useState('')
  const [installing, setInstalling] = useState(false)
  const [installSuccess, setInstallSuccess] = useState(false)

  const checkContent = async () => {
    try {
      // 获取游戏路径
      const res = await logsService.getGamePath() // 获取游戏路径
      console.warn(res)
      if (res) {
        res.filesExist ? setShowDialog(false) : setShowDialog(true)
        setGamePath(res.path)
      }
    }
    catch (error) {
      console.error('发生错误:', error)
      return false
    }
  }

  const installFiles = async () => {
    try {
      setInstalling(true)
      // 调用安装插件的服务
      await logsService.installFiles()
      setInstallSuccess(true)
      // 安装成功后重新检查
      await checkContent()
      setInstalling(false)
    }
    catch (error) {
      console.error('安装失败:', error)
      setInstalling(false)
    }
  }

  useEffect(() => {
    // 初始检查
    checkContent()

    // 每30秒检查一次
    const interval = setInterval(checkContent, 30000)

    return () => clearInterval(interval)
  }, [])

  if (!showDialog) {
    return null
  }

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
          {showDialog && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>进程未运行</AlertTitle>
              <AlertDescription>
                检测到主要插件未安装到
                {' '}
                {gamePath}
                ，是否自动安装？
              </AlertDescription>
            </Alert>
          )}
          {installSuccess && (
            <Alert>
              <AlertTitle>安装成功</AlertTitle>
              <AlertDescription>
                插件已成功安装，请重启游戏
              </AlertDescription>
            </Alert>
          )}
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={installFiles}
              disabled={installing}
            >
              {installing ? '安装中...' : '安装'}
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
