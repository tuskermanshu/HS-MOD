import fs from 'node:fs'
import path from 'node:path'
import AdmZip from 'adm-zip'
import { app, dialog, ipcMain } from 'electron'
import { config } from './config'

// 检查文件是否存在 - 优化版本使用Promise.all并减少IO操作
async function checkFilesExist(gamePath: string, fileArr: Array<string>): Promise<boolean> {
  if (!gamePath || !fileArr.length)
    return false

  try {
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
  catch (_error) {
    return false
  }
}

// 缓存已知路径的检查结果
const pathChecksCache = new Map<string, boolean>()

// 用于存储ZIP文件位置的缓存
let zipFileCache: { path: string, resourcePath: string } | null = null

export function setupLogsHandlers() {
  // 获取 BepInEx 日志
  ipcMain.handle('logs:getBepInEx', async () => {
    try {
      const response = await fetch(`${config.apiUrl}/bepinex.log`)
      return await response.text()
    }
    catch (_error) {
      throw new Error('获取日志失败')
    }
  })

  // 获取最近的 BepInEx 日志
  ipcMain.handle('logs:getRecentBepInEx', async () => {
    try {
      const response = await fetch(`${config.apiUrl}/bepinex.min.log`)
      return await response.text()
    }
    catch (_error) {
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
      throw error instanceof Error ? error : new Error('获取皮肤信息失败')
    }
  })

  // 获取对局日志
  ipcMain.handle('logs:getMatch', async () => {
    try {
      const response = await fetch(`${config.apiUrl}/match.log`)
      return await response.text()
    }
    catch (_error) {
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
      throw error instanceof Error ? error : new Error('获取佣兵信息失败')
    }
  })

  // 获取进程和登录状态
  /*
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
      throw error instanceof Error ? error : new Error('获取状态失败')
    }
  })
  */

  // 检查指定路径下文件是否存在 - 带缓存
  ipcMain.handle('logs:checkFilesExistAtPath', async (_event, { path: filePath }: { path: string }) => {
    try {
      // 检查缓存
      if (pathChecksCache.has(filePath)) {
        return { filesExist: pathChecksCache.get(filePath) }
      }

      // 需要检查的文件列表，可以是文件也可以是文件夹
      const fileArr = ['BepInEx', 'doorstop_config.ini', 'winhttp.dll']
      const filesExist = await checkFilesExist(filePath, fileArr)

      // 缓存结果
      pathChecksCache.set(filePath, filesExist)
      return { filesExist }
    }
    catch (_error) {
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

  // 使用 ipcMain 处理异步操作，并优化资源查找
  ipcMain.handle('installFiles', async (_event, { gamePath }: { gamePath: string }) => {
    try {
      if (!gamePath) {
        throw new Error('游戏路径未提供')
      }

      // 使用缓存的zip文件位置
      let resourcesStorePath = ''
      let zipPath = ''

      // 如果缓存存在，则使用缓存的值
      if (zipFileCache) {
        resourcesStorePath = zipFileCache.resourcePath
        zipPath = zipFileCache.path
      }
      else {
        // 确定资源文件路径 - 可能的资源路径列表，按优先级排序
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

        // 尝试所有可能的路径，直到找到一个包含需要的ZIP文件的路径
        let zipExists = false
        for (const testPath of possiblePaths) {
          const testZipPath = path.join(testPath, 'BepInEx_win_x86_5.4.23.2.zip')
          if (fs.existsSync(testZipPath)) {
            resourcesStorePath = testPath
            zipPath = testZipPath
            zipExists = true

            // 缓存找到的位置
            zipFileCache = {
              path: zipPath,
              resourcePath: resourcesStorePath,
            }
            break
          }
        }

        // 如果所有路径都没找到ZIP文件
        if (!zipExists) {
          throw new Error(`安装文件失败: 核心ZIP文件缺失 (BepInEx_win_x86_5.4.23.2.zip)`)
        }
      }

      // 创建 zip 对象并解压文件到游戏安装目录
      const zip = new AdmZip(zipPath)
      zip.extractAllTo(gamePath, true)

      // 使用Promise.all并行创建所需文件夹和复制文件
      await Promise.all([
        // 创建 unstripped_corlib 文件夹
        createDirIfNotExists(path.join(gamePath, 'BepInEx', 'unstripped_corlib')),
        // 创建 plugins 文件夹
        createDirIfNotExists(path.join(gamePath, 'BepInEx', 'plugins')),
      ])

      // 获取 HsMod.dll 文件并复制到 plugins 文件夹中
      const pluginsPath = path.join(gamePath, 'BepInEx', 'plugins')
      const dllSourcePath = path.join(resourcesStorePath, 'HsMod.dll')
      const dllDestPath = path.join(pluginsPath, 'HsMod.dll')

      if (fs.existsSync(dllSourcePath)) {
        fs.copyFileSync(dllSourcePath, dllDestPath)
      }

      // 获取 UnstrippedCorlib 下的所有 DLL 文件
      const sourceDir = path.join(resourcesStorePath, 'UnstrippedCorlib')

      // 检查 UnstrippedCorlib 目录是否存在
      if (!fs.existsSync(sourceDir)) {
        throw new Error('安装文件失败: UnstrippedCorlib 目录缺失')
      }

      const files = fs.readdirSync(sourceDir)
      const dllFiles = files.filter(file => file.endsWith('.dll'))
      const unstrippedCorlibPath = path.join(gamePath, 'BepInEx', 'unstripped_corlib')

      // 并行复制所有DLL文件
      await Promise.all(
        dllFiles.map((file) => {
          const srcFile = path.join(sourceDir, file)
          const destFile = path.join(unstrippedCorlibPath, file)
          return fs.promises.copyFile(srcFile, destFile)
        }),
      )

      // 修改 doorstop_config.ini 文件
      const iniFilePath = path.join(gamePath, 'doorstop_config.ini')
      if (fs.existsSync(iniFilePath)) {
        const iniContent = fs.readFileSync(iniFilePath, 'utf-8')

        // 使用更健壮的正则表达式，避免意外替换
        const modifiedContent = iniContent.replace(
          /^dll_search_path_override\s*=\s*(?:\S.*)?$/m, // 匹配整行，忽略前后空格
          'dll_search_path_override = BepInEx\\\\unstripped_corlib',
        )

        // 仅当内容实际变化时才写入文件
        if (modifiedContent !== iniContent) {
          fs.writeFileSync(iniFilePath, modifiedContent)
        }
      }

      return { success: true } // 返回成功状态
    }
    catch (error) {
      // 抛出更具体的错误信息给渲染进程
      throw new Error(`安装文件失败: ${error instanceof Error ? error.message : String(error)}`)
    }
  })
}

// 帮助函数：创建目录如果不存在
async function createDirIfNotExists(dirPath: string): Promise<void> {
  try {
    await fs.promises.access(dirPath, fs.constants.F_OK)
  }
  catch {
    await fs.promises.mkdir(dirPath, { recursive: true })
  }
}
