import type { setupLogsHandlers as SetupLogsHandlersType } from './logs'
import type { setupSettingsHandlers as SetupSettingsHandlersType } from './settings'
import type { update as UpdateType } from './update'
import { createRequire } from 'node:module'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { app, BrowserWindow, ipcMain, Menu, shell } from 'electron'
import { config } from './config'

// 懒加载模块，仅在需要时导入
let logsHandlers: typeof SetupLogsHandlersType
let settingsHandlers: typeof SetupSettingsHandlersType
let updateModule: typeof UpdateType

const _require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

process.env.APP_ROOT = path.join(__dirname, '../..')
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')
export const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, 'public')
  : RENDERER_DIST

// 禁用硬件加速 - 仅在Windows 7上
if (os.release().startsWith('6.1'))
  app.disableHardwareAcceleration()

// 设置应用ID - 仅在Windows上
if (process.platform === 'win32')
  app.setAppUserModelId(app.getName())

// 确保只有一个实例运行
if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

// 禁用默认菜单以提升启动速度
Menu.setApplicationMenu(null)

let win: BrowserWindow | null = null
const preload = path.join(__dirname, '../preload/index.cjs')
const indexHtml = path.join(RENDERER_DIST, 'index.html')

async function createWindow() {
  // 首先创建窗口，然后再加载其他模块
  win = new BrowserWindow({
    title: 'Main window',
    width: 794,
    height: 572,
    resizable: false,
    useContentSize: true,
    center: true,
    webPreferences: {
      preload,
      nodeIntegration: false,
      contextIsolation: true,
      devTools: process.env.NODE_ENV === 'development',
    },
  })

  // 现在可以加载URL或文件了
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  }
  else {
    win.loadFile(indexHtml, { hash: '/' })
  }

  // 仅在开发环境中打开开发者工具
  if (process.env.NODE_ENV === 'development') {
    win.webContents.openDevTools()
  }

  // 当窗口完成加载后，再执行这些任务
  win.webContents.on('did-finish-load', () => {
    // 获取并转换系统类型为友好名称
    const platform = os.platform()
    const systemType = platform === 'darwin'
      ? 'Mac'
      : platform === 'win32'
        ? 'Windows'
        : platform === 'linux' ? 'Linux' : platform

    // 发送友好的系统名称到渲染进程
    win?.webContents.send('system-type', systemType)

    // 延迟加载其他处理程序
    setTimeout(() => {
      setupHandlers()
    }, 500)
  })

  win.webContents.setWindowOpenHandler((details: { url: string }) => {
    if (details.url.startsWith('https:'))
      shell.openExternal(details.url)
    return { action: 'deny' }
  })
}

// 懒加载和设置处理程序
async function setupHandlers() {
  // 动态导入模块
  if (!settingsHandlers) {
    const settingsModule = await import('./settings')
    settingsHandlers = settingsModule.setupSettingsHandlers
    settingsHandlers()
  }

  if (!logsHandlers) {
    const logsModule = await import('./logs')
    logsHandlers = logsModule.setupLogsHandlers
    logsHandlers()
  }

  if (!updateModule && win) {
    const updateImport = await import('./update')
    updateModule = updateImport.update
    updateModule(win)
  }
}

// 应用准备就绪
app.whenReady().then(() => {
  // 首先注册基本的IPC处理器
  ipcMain.handle('config:getApiUrl', () => config.apiUrl)

  // 创建窗口 - 这是最优先的任务
  createWindow()
})

app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin')
    app.quit()
})

app.on('second-instance', () => {
  if (win) {
    if (win.isMinimized())
      win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  }
  else {
    createWindow()
  }
})

ipcMain.handle('open-win', (_, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  if (VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${VITE_DEV_SERVER_URL}#${arg}`)
  }
  else {
    childWindow.loadFile(indexHtml, { hash: arg })
  }
})
