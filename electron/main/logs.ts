import fs from 'node:fs'
import path from 'node:path'
import AdmZip from 'adm-zip'
import { ipcMain } from 'electron'
import regedit from 'regedit'
import gameService from '../../src/services/gameService'
import { config } from './config'

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

  ipcMain.handle('getGamePath', async () => {
    try {
      // 游戏安装路径对应的注册表路径,获取游戏安装路径
      const gamePath = await gameService.getGamePath()
      console.warn(gamePath)
      // 需要检查的文件列表，可以是文件也可以是文件夹
      const fileArr = ['BepInEx', 'doorstop_config.ini']

      // 检查是否所有文件都存在
      const filesExist = await gameService.checkFilesExist(gamePath, fileArr)

      // 返回包含游戏路径和文件检查结果的对象
      return {
        path: gamePath,
        filesExist,
      }
    }
    catch (error) {
      console.error(error)
      throw new Error('获取文件路径失败')
    }
  })

  // 使用 ipcMain 处理异步操作
  ipcMain.handle('installFiles', async () => {
    try {
      // 游戏安装路径对应的注册表路径,获取游戏安装路径
      const regPath = 'HKLM\\SOFTWARE\\WOW6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Hearthstone'

      // 通过 Promise 包装异步的 regedit.list 调用
      const getGamePath = new Promise<string>((resolve, reject) => {
        regedit.list([regPath], (err, result) => {
          if (err || !result[regPath]) {
            reject(new Error('Failed to get game path from registry'))
          }
          else {
            resolve(String(result[regPath].values.InstallLocation.value))
          }
        })
      })

      const gamePath = await getGamePath
      if (gamePath) {
        // 确保使用正确的路径，解析相对路径为绝对路径
        const zipPath = path.resolve('src', 'store', 'BepInEx_win_x86_5.4.23.2.zip')

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
          console.warn(`新文件夹已创建：${pluginsPath}`)
        }

        // 获取 HsMod.dll 文件并复制到 plugins 文件夹中
        const dllSourcePath = path.resolve('src', 'store', 'HsMod.dll')
        const dllDestPath = path.join(pluginsPath, 'HsMod.dll')
        if (fs.existsSync(dllSourcePath)) {
          fs.copyFileSync(dllSourcePath, dllDestPath)
        }
        else {
          console.warn('未找到 HsMod.dll 文件')
        }

        // 获取 HsMod/UnstrippedCorlib 下的所有 DLL 文件
        const sourceDir = path.resolve('src', 'store', 'UnstrippedCorlib')
        const files = fs.readdirSync(sourceDir)
        const dllFiles = files.filter(file => file.endsWith('.dll'))

        // 将 DLL 文件复制到 unstripped_corlib 目录
        dllFiles.forEach((file) => {
          const srcFile = path.join(sourceDir, file)
          const destFile = path.join(unstrippedCorlibPath, file)
          fs.copyFileSync(srcFile, destFile)
          console.warn(`已复制文件：${file}`)
        })

        // 修改 doorstop_config.ini 文件
        const iniFilePath = path.join(gamePath, 'doorstop_config.ini')
        if (fs.existsSync(iniFilePath)) {
          const iniContent = fs.readFileSync(iniFilePath, 'utf-8')

          // 修改 dll_search_path_override 的值
          const modifiedContent = iniContent.replace(
            'dll_search_path_override =',
            'dll_search_path_override = BepInEx\\unstripped_corlib',
          )

          // 将修改后的内容写回文件
          fs.writeFileSync(iniFilePath, modifiedContent)
          console.warn('doorstop_config.ini 文件已更新')
        }
        else {
          console.warn('doorstop_config.ini 文件不存在')
        }
      }
      else {
        console.warn('未找到游戏安装路径')
      }
    }
    catch (error) {
      console.error('安装文件时发生错误:', error)
      throw new Error('安装文件失败')
    }
  })
}
