import fs from 'node:fs'
import path from 'node:path'
import { app } from 'electron'
import Store from 'electron-store'
import yaml from 'js-yaml'

interface StoreConfig {
  api: {
    host: string
    port: number
  }
}

class Config {
  private store: any
  private isDev: boolean

  constructor() {
    this.isDev = !app.isPackaged
    this.store = new Store({
      name: 'hsmod-config', // 配置文件名
      defaults: this.loadDefaultConfig(),
    })
  }

  private loadDefaultConfig(): StoreConfig {
    try {
      const configPath = path.join(process.env.APP_ROOT || '', 'config', 'config.yaml')
      const configFile = fs.readFileSync(configPath, 'utf8')
      const config = yaml.load(configFile) as any

      // 根据环境返回对应配置
      return this.isDev ? config.development : config.production
    }
    catch (error) {
      console.error('Failed to load config file:', error)
      // 返回默认配置
      return {
        api: {
          host: 'http://127.0.0.1',
          port: this.isDev ? 58744 : 55665,
        },
      }
    }
  }

  get apiUrl() {
    const api = this.store.get('api')
    return `${api.host}:${api.port}`
  }

  // 获取配置
  get<K extends keyof StoreConfig>(key: K): StoreConfig[K] {
    return this.store.get(key)
  }

  // 设置配置
  set<K extends keyof StoreConfig>(key: K, value: StoreConfig[K]) {
    return this.store.set(key, value)
  }
}

export const config = new Config()
