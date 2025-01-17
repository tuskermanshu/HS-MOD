import { useState, useEffect } from 'react'

export function useSystemType() {
  const [systemType, setSystemType] = useState<string>('')

  useEffect(() => {
    const handleSystemType = (_event: any, type: string) => {
      setSystemType(type)
    }

    window.ipcRenderer.on('system-type', handleSystemType)
    return () => {
      window.ipcRenderer.off('system-type', handleSystemType)
    }
  }, [])

  return { systemType }
}