import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { logsService } from '@/services/logs'
import { AlertCircle, FolderCog } from 'lucide-react'
import { useCallback, useState } from 'react'

export function ProcessContentCheck() {
  const [showDialog, setShowDialog] = useState(true)
  const [gamePath, setGamePath] = useState('')
  const [manualPathRequired, setManualPathRequired] = useState(true)
  const [checkingPath, setCheckingPath] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [needsInstall, setNeedsInstall] = useState(false)
  const [installing, setInstalling] = useState(false)
  const [installSuccess, setInstallSuccess] = useState<boolean | null>(null)

  const checkContent = useCallback(async (providedPath?: string) => {
    const pathToUse = providedPath || gamePath
    if (!pathToUse) {
      setManualPathRequired(true)
      setShowDialog(true)
      setGamePath('')
      setErrorMessage(null)
      setNeedsInstall(false)
      setInstallSuccess(null)
      return
    }

    setCheckingPath(true)
    setErrorMessage(null)
    setNeedsInstall(false)
    setInstallSuccess(null)
    if (providedPath)
      setGamePath(providedPath)

    try {
      const checkRes = await logsService.checkFilesExistAtPath(pathToUse)
      if (checkRes.filesExist) {
        setShowDialog(false)
        setManualPathRequired(false)
        setGamePath(pathToUse)
      }
      else {
        setShowDialog(true)
        setManualPathRequired(false)
        setNeedsInstall(true)
        setGamePath(pathToUse)
      }
    }
    catch (error: any) {
      console.error('检查路径时发生错误:', error)
      setErrorMessage(`检查路径时出错: ${error.message || error}`)
      setManualPathRequired(true)
      setShowDialog(true)
      setGamePath('')
      setNeedsInstall(false)
    }
    finally {
      setCheckingPath(false)
    }
  }, [gamePath])

  const handleSelectPath = async () => {
    setErrorMessage(null)
    setNeedsInstall(false)
    setInstallSuccess(null)
    setCheckingPath(true)
    try {
      const selectedPath = await logsService.selectGamePathManually()
      if (selectedPath) {
        await checkContent(selectedPath)
      }
      else {
        setCheckingPath(false)
      }
    }
    catch (error: any) {
      console.error('选择路径时出错:', error)
      setErrorMessage(`选择路径失败: ${error.message || error}`)
      setManualPathRequired(true)
      setShowDialog(true)
      setCheckingPath(false)
      setNeedsInstall(false)
    }
  }

  const installFiles = async () => {
    if (!gamePath || needsInstall === false) {
      setErrorMessage('游戏路径无效或文件已存在，无法安装。')
      return
    }
    setInstalling(true)
    setErrorMessage(null)
    setInstallSuccess(null)
    try {
      await logsService.installFiles(gamePath)
      setInstallSuccess(true)
      setNeedsInstall(false)
      await checkContent()
    }
    catch (error: any) {
      console.error('安装失败:', error)
      setErrorMessage(`安装失败: ${error.message || error}`)
      setInstallSuccess(false)
      setNeedsInstall(true)
    }
    finally {
      setInstalling(false)
    }
  }

  return (
    <Dialog
      open={showDialog}
      onOpenChange={(open) => {
        setShowDialog(open)
        if (!open) {
          setErrorMessage(null)
        }
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>需要指定游戏路径</DialogTitle>
          <DialogDescription>
            请选择您的炉石传说安装文件夹。应用需要此路径来验证文件。
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {errorMessage && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>错误</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          {manualPathRequired && !checkingPath && (
            <Alert variant="default">
              <FolderCog className="h-4 w-4" />
              <AlertTitle>请指定游戏路径</AlertTitle>
              <AlertDescription>
                请手动选择您的炉石传说安装文件夹。
              </AlertDescription>
            </Alert>
          )}

          {!manualPathRequired && needsInstall && !checkingPath && !installing && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>缺少插件文件</AlertTitle>
              <AlertDescription>
                在路径
                {' '}
                <code>{gamePath}</code>
                {' '}
                下未检测到所需插件文件。是否立即安装？
              </AlertDescription>
            </Alert>
          )}

          {checkingPath && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>请稍候</AlertTitle>
              <AlertDescription>正在检查路径...</AlertDescription>
            </Alert>
          )}

          {installing && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>请稍候</AlertTitle>
              <AlertDescription>正在安装插件文件...</AlertDescription>
            </Alert>
          )}

          {installSuccess === true && !installing && (
            <Alert variant="default">
              <AlertTitle>安装成功</AlertTitle>
              <AlertDescription>
                插件已成功安装到
                {' '}
                <code>{gamePath}</code>
                。请重启游戏以生效。
              </AlertDescription>
            </Alert>
          )}

          {gamePath && !manualPathRequired && !checkingPath && (
            <Alert variant="default">
              <AlertTitle>路径已设置</AlertTitle>
              <AlertDescription>
                当前使用路径:
                {' '}
                <code>{gamePath}</code>
              </AlertDescription>
            </Alert>
          )}

          <div className="flex justify-end space-x-2 pt-4">
            {manualPathRequired && (
              <Button
                variant="default"
                onClick={handleSelectPath}
                disabled={checkingPath || installing}
              >
                <FolderCog className="mr-2 h-4 w-4" />
                选择路径
              </Button>
            )}

            {!manualPathRequired && needsInstall && (
              <Button
                variant="destructive"
                onClick={installFiles}
                disabled={installing || checkingPath}
              >
                {installing ? '安装中...' : '立即安装'}
              </Button>
            )}

            <Button variant="ghost" onClick={() => setShowDialog(false)} disabled={checkingPath || installing}>
              关闭
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
