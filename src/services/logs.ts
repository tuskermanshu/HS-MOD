export const logsService = {
  // 获取 BepInEx 日志
  async getBepInExLog() {
    return window.electron.ipcRenderer.invoke('logs:getBepInEx')
  },

  // 获取最近的 BepInEx 日志
  async getRecentBepInExLog() {
    return window.electron.ipcRenderer.invoke('logs:getRecentBepInEx')
  },

  // 获取皮肤日志
  async getSkinsLog() {
    return window.electron.ipcRenderer.invoke('logs:getSkins')
  },

  // 获取对局日志
  async getMatchLog() {
    return window.electron.ipcRenderer.invoke('logs:getMatch')
  },

  // 获取佣兵日志
  async getMercenariesLog() {
    return window.electron.ipcRenderer.invoke('logs:getMercenaries')
  },

  // 获取进程和登录状态
  async getProcessStatus() {
    return window.electron.ipcRenderer.invoke('logs:getProcessStatus')
  },

  // 检查指定路径下插件文件是否存在
  async checkFilesExistAtPath(path: string): Promise<{ filesExist: boolean }> {
    return window.electron.ipcRenderer.invoke('logs:checkFilesExistAtPath', { path })
  },

  // 打开目录选择对话框让用户手动选择路径
  async selectGamePathManually(): Promise<string | null> {
    return window.electron.ipcRenderer.invoke('logs:selectGamePathManually')
  },

  // 自动安装插件到指定路径
  async installFiles(gamePath: string): Promise<void> {
    return window.electron.ipcRenderer.invoke('installFiles', { gamePath })
  },
}
