import fs from 'node:fs'
import path from 'node:path'
import { ipcMain } from 'electron'
import { config } from './config'

// 配置文件路径
export const CONFIG_PATH = path.join(process.env.APPDATA || process.env.HOME || '', '.hsmod', 'hsmod.cfg')

export function setupSettingsHandlers() {
  console.warn('Setting up settings handlers...')

  // 获取配置
  ipcMain.handle('settings:getConfig', async () => {
    console.warn('Handling getConfig request')
    try {
      const response = await fetch(`${config.apiUrl}/hsmod.cfg`)
      const configData = await response.text()
      return configData
    }
    catch (error) {
      console.error('Failed to read config:', error)
      throw error
    }
  })

  // 更新配置
  ipcMain.handle('settings:updateConfig', async (_, { key, value }) => {
    try {
      const response = await fetch(`${config.apiUrl}/config`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key, value }),
      })

      if (!response.ok) {
        throw new Error('Failed to update config')
      }

      return { success: true }
    }
    catch (error) {
      console.error('Failed to update config:', error)
      throw error
    }
  })

  // 检查服务状态
  ipcMain.handle('settings:checkStatus', async () => {
    try {
      const response = await fetch(`${config.apiUrl}/alive`)
      const data = await response.json()
      return data
    }
    catch (error) {
      console.error('Failed to check status:', error)
      throw error
    }
  })

  // 全局设置
  ipcMain.handle('settings:setHsmodStatus', async (_, status: boolean) => {
    try {
      // 实际的 HsMod 启用/禁用逻辑
      return { success: true, status }
    }
    catch (error) {
      console.error('Failed to set HsMod status:', error)
      throw error
    }
  })

  ipcMain.handle('settings:setLanguage', async (_, language: string) => {
    try {
      // 语言切换逻辑
      return { success: true, language }
    }
    catch (error) {
      console.error('Failed to set language:', error)
      throw error
    }
  })

  // 游戏设置
  ipcMain.handle('settings:setQuickBattle', async (_, enabled: boolean) => {
    try {
      // 快速对战设置逻辑
      return { success: true, enabled }
    }
    catch (error) {
      console.error('Failed to set quick battle:', error)
      throw error
    }
  })

  // 开包设置
  ipcMain.handle('settings:setAutoOpen', async (_, { enabled, delay }: { enabled: boolean, delay: number }) => {
    try {
      // 自动开包设置逻辑
      return { success: true, enabled, delay }
    }
    catch (error) {
      console.error('Failed to set auto open:', error)
      throw error
    }
  })
}

export async function saveSettings(settings: any) {
  // 保存设置到配置文件
  const configPath = path.join(process.env.APPDATA || process.env.HOME || '', '.hsmod', 'config.json')
  await fs.promises.writeFile(configPath, JSON.stringify(settings, null, 2))
}

export async function loadSettings() {
  // 从配置文件加载设置
  const configPath = path.join(process.env.APPDATA || process.env.HOME || '', '.hsmod', 'config.json')
  try {
    const data = await fs.promises.readFile(configPath, 'utf-8')
    return JSON.parse(data)
  }
  catch {
    return {}
  }
}
