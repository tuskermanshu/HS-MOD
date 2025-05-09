import fs from 'node:fs'
import path from 'node:path'
import AdmZip from 'adm-zip'
import { app, dialog, ipcMain } from 'electron'
import { config } from './config'

// 检查文件是否存在
async function checkFilesExist(gamePath: string, fileArr: Array<string>): Promise<boolean> {
  const fileCheckResults = await Promise.all(fileArr.map(async (fileItem) => {
    const subDirectoryPath = path.join(gamePath, fileItem)
    try {
      await fs.promises.access(subDirectoryPath, fs.constants.F_OK)
      return true
    }
    catch {
      return false
    }
  }))

  return fileCheckResults.every(result => result === true)
}

export function setupLogsHandlers() {
  // 获取 BepInEx 日志
  ipcMain.handle('logs:getBepInEx', async () => {
    try {
      const response = await fetch(`${config.apiUrl}/bepinex.log`)
      return await response.text()
    }
    catch (error) {
      console.error('Failed to fetch BepInEx log:', error)
      throw new Error('获取日志失败')
    }
  })

  // 获取最近的 BepInEx 日志
  ipcMain.handle('logs:getRecentBepInEx', async () => {
    try {
      const response = await fetch(`${config.apiUrl}/bepinex.min.log`)
      return await response.text()
    }
    catch (error) {
      console.error('Failed to fetch recent BepInEx log:', error)
      throw new Error('获取最近日志失败')
    }
  })

  // 获取皮肤日志
  ipcMain.handle('logs:getSkins', async () => {
    try {
      const response = await fetch(`${config.apiUrl}/skins.log`)
      if (response.status === 401) {
        throw new Error('需要登录才能查看皮肤信息')
      }
      return await response.text()
    }
    catch (error) {
      console.error('Failed to fetch skins log:', error)
      throw error instanceof Error ? error : new Error('获取皮肤信息失败')
    }
  })

  // 获取对局日志
  ipcMain.handle('logs:getMatch', async () => {
    try {
      const response = await fetch(`${config.apiUrl}/match.log`)
      return await response.text()
    }
    catch (error) {
      console.error('Failed to fetch match log:', error)
      throw new Error('获取对局日志失败')
    }
  })

  // 获取佣兵日志
  ipcMain.handle('logs:getMercenaries', async () => {
    try {
      const response = await fetch(`${config.apiUrl}/mercenaries.log`)
      if (response.status === 401) {
        throw new Error('需要登录才能查看佣兵信息')
      }
      return await response.text()
    }
    catch (error) {
      console.error('Failed to fetch mercenaries log:', error)
      throw error instanceof Error ? error : new Error('获取佣兵信息失败')
    }
  })

  // 获取进程和登录状态
  ipcMain.handle('logs:getProcessStatus', async () => {
    try {
      const response = await fetch(`${config.apiUrl}/alive`)
      if (!response.ok) {
        throw new Error('获取状态失败')
      }

      const data = await response.json()
      return {
        pid: data.pid,
        login: data.login === 'True',
      }
    }
    catch (error) {
      console.error('Failed to fetch process status:', error)
      throw error instanceof Error ? error : new Error('获取状态失败')
    }
  })

  // 检查指定路径下文件是否存在
  ipcMain.handle('logs:checkFilesExistAtPath', async (_event, { path }: { path: string }) => {
    try {
      // 需要检查的文件列表，可以是文件也可以是文件夹
      const fileArr = ['BepInEx', 'doorstop_config.ini', 'winhttp.dll']
      const filesExist = await checkFilesExist(path, fileArr)
      return { filesExist }
    }
    catch (error) {
      console.error('Failed to check files exist at path:', error)
      throw new Error('检查文件失败')
    }
  })

  // 处理手动选择游戏路径的请求
  ipcMain.handle('logs:selectGamePathManually', async () => {
    try {
      const result = await dialog.showOpenDialog({
        properties: ['openDirectory'],
        title: '请选择炉石传说安装文件夹',
      })

      if (result.canceled || result.filePaths.length === 0) {
        return null // User canceled
      }

      const selectedPath = result.filePaths[0]
      // Optional: Add validation here to check if selectedPath seems valid (e.g., contains Hearthstone.exe)
      const exePath = path.join(selectedPath, 'Hearthstone.exe')
      if (!fs.existsSync(exePath)) {
        throw new Error(`选择的路径无效，未在 ${selectedPath} 中找到 Hearthstone.exe`)
      }
      return selectedPath
    }
    catch (error: any) {
      throw new Error(`选择路径失败: ${error.message || error}`)
    }
  })

  // 使用 ipcMain 处理异步操作
  ipcMain.handle('installFiles', async (_event, { gamePath }: { gamePath: string }) => {
    try {
      if (!gamePath) {
        throw new Error('游戏路径未提供')
      }

      // 确定资源文件路径
      // 可能的资源路径列表，按优先级排序
      const possiblePaths = [
        // 开发环境路径
        path.join(process.cwd(), 'src', 'store'),
        path.join(process.cwd(), 'store'),
        // 生产环境常见路径
        path.join(process.resourcesPath, 'store'),
        path.join(process.resourcesPath, 'app.asar.unpacked', 'store'),
        path.join(process.resourcesPath, 'app.asar', 'store'),
        path.join(process.resourcesPath, '..', 'store'),
        // 相对于应用路径
        path.join(app.getAppPath(), 'store'),
        path.join(app.getAppPath(), '..', 'store'),
        path.join(app.getAppPath(), 'resources', 'store'),
        // 相对于可执行文件
        path.join(path.dirname(app.getPath('exe')), 'resources', 'store'),
        path.join(path.dirname(app.getPath('exe')), 'store'),
        path.join(path.dirname(app.getPath('exe')), '..', 'resources', 'store'),
      ].filter(Boolean) // 过滤掉空字符串

      let resourcesStorePath = ''
      let zipPath = ''
      let zipExists = false

      // 尝试所有可能的路径，直到找到一个包含需要的ZIP文件的路径
      for (const testPath of possiblePaths) {
        const testZipPath = path.join(testPath, 'BepInEx_win_x86_5.4.23.2.zip')
        if (fs.existsSync(testZipPath)) {
          resourcesStorePath = testPath
          zipPath = testZipPath
          zipExists = true
          break
        }
      }

      // 如果所有路径都没找到ZIP文件
      if (!zipExists) {
        throw new Error(`安装文件失败: 核心ZIP文件缺失 (BepInEx_win_x86_5.4.23.2.zip)`)
      }

      // 创建 zip 对象
      const zip = new AdmZip(zipPath)

      // 解压文件到游戏安装目录
      zip.extractAllTo(gamePath, true)

      // 创建 unstripped_corlib 文件夹
      const unstrippedCorlibPath = path.join(gamePath, 'BepInEx', 'unstripped_corlib')
      if (!fs.existsSync(unstrippedCorlibPath)) {
        fs.mkdirSync(unstrippedCorlibPath, { recursive: true })
      }

      // 在 BepInEx 中创建 plugins 文件夹
      const pluginsPath = path.join(gamePath, 'BepInEx', 'plugins')
      if (!fs.existsSync(pluginsPath)) {
        fs.mkdirSync(pluginsPath, { recursive: true })
      }

      // 获取 HsMod.dll 文件并复制到 plugins 文件夹中
      const dllSourcePath = path.join(resourcesStorePath, 'HsMod.dll')
      const dllDestPath = path.join(pluginsPath, 'HsMod.dll')
      if (fs.existsSync(dllSourcePath)) {
        fs.copyFileSync(dllSourcePath, dllDestPath)
      }
      else {
        // 注意：如果 HsMod.dll 是可选的或动态生成的，这里的警告可能是正常的
        console.warn(`未在资源目录中找到 HsMod.dll: ${dllSourcePath}`)
      }

      // 获取 UnstrippedCorlib 下的所有 DLL 文件
      const sourceDir = path.join(resourcesStorePath, 'UnstrippedCorlib')

      // 检查 UnstrippedCorlib 目录是否存在
      if (!fs.existsSync(sourceDir)) {
        throw new Error('安装文件失败: UnstrippedCorlib 目录缺失')
      }

      const files = fs.readdirSync(sourceDir)
      const dllFiles = files.filter(file => file.endsWith('.dll'))

      // 将 DLL 文件复制到 unstripped_corlib 目录
      dllFiles.forEach((file) => {
        const srcFile = path.join(sourceDir, file)
        const destFile = path.join(unstrippedCorlibPath, file)
        fs.copyFileSync(srcFile, destFile)
      })

      // 修改 doorstop_config.ini 文件
      const iniFilePath = path.join(gamePath, 'doorstop_config.ini')
      if (fs.existsSync(iniFilePath)) {
        const iniContent = fs.readFileSync(iniFilePath, 'utf-8')

        // 修改 dll_search_path_override 的值
        // 使用更健壮的正则表达式，避免意外替换
        const modifiedContent = iniContent.replace(
          /^dll_search_path_override\s*=\s*(?:\S.*)?$/m, // 匹配整行，忽略前后空格
          'dll_search_path_override = BepInEx\\\\unstripped_corlib',
        )

        // 检查是否真的发生了替换
        if (modifiedContent === iniContent) {
          console.warn(`警告: 未能在 ${iniFilePath} 中找到或替换 'dll_search_path_override ='。文件可能已有修改或格式不同。`)
        }
        else {
          // 将修改后的内容写回文件
          fs.writeFileSync(iniFilePath, modifiedContent)
        }
      }
      else {
        console.warn(`配置文件 ${path.basename(iniFilePath)} 在目标路径中不存在，跳过修改。`)
      }
      return { success: true } // 返回成功状态
    }
    catch (error) {
      // 抛出更具体的错误信息给渲染进程
      throw new Error(`安装文件失败: ${error instanceof Error ? error.message : String(error)}`)
    }
  })
}
