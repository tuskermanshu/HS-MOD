interface IElectronAPI {
  ipcRenderer: {
    invoke: (channel: string, ...args: any[]) => Promise<any>
    on: (channel: string, func: (...args: any[]) => void) => void
    off: (channel: string, func: (...args: any[]) => void) => void
    send: (channel: string, ...args: any[]) => void
  }
}

declare global {
  interface Window {
    electron: IElectronAPI
  }
}

export {}
