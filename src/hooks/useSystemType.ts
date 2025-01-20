import { useEffect, useState } from 'react'

export function useSystemType() {
  const [systemType, setSystemType] = useState<string>('')

  useEffect(() => {
    const handleSystemType = (type: string) => {
      setSystemType(type)
    }

    window.electron.ipcRenderer.on('system-type', handleSystemType)

    return () => {
      // contextBridge 会自动处理清理工作
    }
  }, [])

  return { systemType }
}
