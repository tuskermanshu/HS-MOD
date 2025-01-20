import { settingsService } from '@/services/settings'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SettingsState {
  // Global Settings
  hsmodStatus: boolean
  language: 'zh_CN' | 'en_US'
  configTemplate: 'default' | 'performance' | 'quality'
  shortcutStatus: boolean
  speedGearStatus: boolean
  speedMultiplier: number
  showFps: boolean
  targetFps: number

  // Hearthstone Settings
  quickBattle: boolean
  skipHeroIntro: boolean
  showFullName: boolean
  showRank: boolean
  showCardCount: boolean
  cardTracking: boolean
  cardReveal: boolean
  showCardId: boolean
  removeShareCheck: boolean
  showSurrender: boolean
  emoteNoCooldown: boolean
  thinkingEmote: boolean
  emoteCount: number
  opponentCardEffect: boolean
  alternativeArtEffect: boolean
  goldCardEffect: 'Default' | 'OnlyMy' | 'All' | 'Disabled'
  maxCardEffect: 'Default' | 'OnlyMy' | 'All' | 'Disabled'

  // Pack Settings
  quickOpen: boolean
  autoOpen: boolean
  openDelay: number
  skipAnimation: boolean
  autoConfirm: boolean
  simulateStatus: 'Default' | 'Success' | 'Failed' | 'Random'
  simulateCount: number
  packType: 'Classic' | 'Latest' | 'Golden' | 'Random'
  saveResults: boolean

  // Development Settings
  logPath: string
  enableLogs: boolean
  debugLogs: boolean
  errorLogs: boolean
  networkLogs: boolean
  autoExitTime: number
  webServerPort: number
  updateChannel: 'stable' | 'beta' | 'dev'
  autoUpdate: boolean
  devTools: boolean

  // Optimization Settings
  deviceType: 'Default' | 'Phone' | 'Tablet' | 'Desktop'
  systemType: 'Default' | 'iOS' | 'Android' | 'Windows' | 'macOS'
  resolution: 'Default' | '1920x1080' | '2560x1440' | '3840x2160'
  forceWindow: boolean
  disableFullscreen: boolean
  appFocus: boolean
  lowQuality: boolean
  disableAnimation: boolean
  reduceEffects: boolean
  errorExit: boolean
  idleDisconnect: boolean
  idleTime: number

  // Actions
  setSettings: (settings: Partial<SettingsState>) => void
  resetSettings: () => void

  // 新增的异步操作
  setHsmodStatus: (status: boolean) => Promise<void>
  setLanguage: (language: 'zh_CN' | 'en_US') => Promise<void>
  setQuickBattle: (enabled: boolean) => Promise<void>
  setAutoOpen: (enabled: boolean, delay: number) => Promise<void>

  config: Record<string | number, any>
  setConfig: (key: string, value: string | number | boolean) => Promise<void>
  loadConfig: () => Promise<void>
  updateConfig: (key: string, value: any) => Promise<void>
  checkStatus: () => Promise<void>

  // 配置数据
  loading: boolean
  error: string | null

  // 状态
  isConnected: boolean
}

const initialState = {
  // Global Settings
  hsmodStatus: false,
  language: 'zh_CN' as const,
  configTemplate: 'default' as const,
  shortcutStatus: false,
  speedGearStatus: false,
  speedMultiplier: 10,
  showFps: false,
  targetFps: 60,

  // ... (其他初始值)
}

export const useSettings = create<SettingsState>()(
  persist(
    set => ({
      ...initialState as any,
      config: {},
      setSettings: settings => set(state => ({ ...state, ...settings })),
      resetSettings: () => set(initialState),

      // 异步操作实现
      setHsmodStatus: async (status) => {
        const result = await settingsService.setHsmodStatus(status)
        if (result.success) {
          set({ hsmodStatus: status })
        }
      },

      setLanguage: async (language) => {
        const result = await settingsService.setLanguage(language)
        if (result.success) {
          set({ language })
        }
      },

      setQuickBattle: async (enabled) => {
        const result = await settingsService.setQuickBattle(enabled)
        if (result.success) {
          set({ quickBattle: enabled })
        }
      },

      setAutoOpen: async (enabled, delay) => {
        const result = await settingsService.setAutoOpen(enabled, delay)
        if (result.success) {
          set({ autoOpen: enabled, openDelay: delay })
        }
      },

      setConfig: async (key, value) => {
        try {
          const result = await settingsService.updateConfig(key, value)
          if (result.success) {
            const config = await settingsService.getConfig()
            const parsedConfig = settingsService.parseConfig(config)
            set({ config: parsedConfig })
          }
        }
        catch (error) {
          console.error('Failed to update config:', error)
        }
      },

      loadConfig: async () => {
        try {
          const config = await settingsService.getConfig()
          const parsedConfig = settingsService.parseConfig(config)
          set({ config: parsedConfig, isConnected: true })
        }
        catch (error) {
          set({ error: String(error), isConnected: false })
          console.error('Failed to load config:', error)
        }
      },
      // 更新配置
      updateConfig: async (key: string, value: any) => {
        try {
          set({ loading: true, error: null })
          await settingsService.updateConfig(key, value)

          // 更新本地状态
          set(state => ({
            config: {
              ...state.config,
              [key]: value,
            },
            loading: false,
          }))
        }
        catch (error) {
          set({ error: String(error), loading: false })
          console.error('Failed to update config:', error)
        }
      },
      // 检查连接状态
      checkStatus: async () => {
        try {
          const status = await settingsService.checkStatus()
          set({ isConnected: true })
          return status
        }
        catch (error) {
          set({ isConnected: false, error: String(error) })
          console.error('Failed to check status:', error)
        }
      },

      // 配置数据
      loading: false,
      error: null,

      // 状态
      isConnected: false,

    }),
    {
      name: 'hsmod-settings',
    },
  ),
)
