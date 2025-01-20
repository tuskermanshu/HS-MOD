export const settingsService = {
  // 全局设置
  async setHsmodStatus(status: boolean) {
    return await window.electron.ipcRenderer.invoke('settings:setHsmodStatus', status)
  },

  async setLanguage(language: string) {
    return await window.electron.ipcRenderer.invoke('settings:setLanguage', language)
  },

  // 游戏设置
  async setQuickBattle(enabled: boolean) {
    return await window.electron.ipcRenderer.invoke('settings:setQuickBattle', enabled)
  },

  // 开包设置
  async setAutoOpen(enabled: boolean, delay: number) {
    return await window.electron.ipcRenderer.invoke('settings:setAutoOpen', { enabled, delay })
  },

  async getConfig() {
    return await window.electron.ipcRenderer.invoke('settings:getConfig')
  },

  async checkStatus() {
    return await window.electron.ipcRenderer.invoke('settings:checkStatus')
  },

  async updateConfig(key: string, value: string | number | boolean) {
    return await window.electron.ipcRenderer.invoke('settings:updateConfig', { key, value })
  },

  parseConfig(settings: string) {
    const configObject: Record<string, any> = {}

    settings.split('\n').forEach((line) => {
      const trimmedLine = line.trim()
      if (!trimmedLine || trimmedLine.startsWith('#') || !trimmedLine.includes('=')) {
        return
      }

      const [key, value] = trimmedLine.split('=').map(part => part.trim())
      configObject[key] = this.parseValue(value)
    })

    return configObject
  },

  parseValue(value: string) {
    if (!Number.isNaN(Number(value)))
      return Number(value)
    return value
  },

  // ... 其他服务函数
}
