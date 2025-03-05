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

  // 获取炉石传说安装路径
  async getGamePath(){
    return window.electron.ipcRenderer.invoke('getGamePath')
  },

  // 自动安装插件
  async installFiles(){
    return window.electron.ipcRenderer.invoke('installFiles')
  },
}
