import { ipcMain } from 'electron'
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
      if (!response.ok)
        throw new Error('获取状态失败')

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
}
