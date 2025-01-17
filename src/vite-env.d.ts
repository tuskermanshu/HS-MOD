// vite-env.d.ts
/// <reference types="vite/client" />

interface Window {
  ipcRenderer: {
    on(channel: string, func: (...args: any[]) => void): void;
    off(channel: string, func: (...args: any[]) => void): void;
    send(channel: string, ...args: any[]): void;
    invoke(channel: string, ...args: any[]): Promise<any>;
  }
}
