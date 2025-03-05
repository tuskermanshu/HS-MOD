import { constants, promises as fsPromises } from 'node:fs'
import path from 'node:path'
import regedit from 'regedit'

async function getGamePath(): Promise<string> {
  const regPath = 'HKLM\\SOFTWARE\\WOW6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Hearthstone'

  return new Promise((resolve, reject) => {
    // 确保回调函数参数的类型是正确的
    regedit.list([regPath], (err, result) => {
      if (err || !result[regPath]) {
        reject(new Error('Failed to get game path from registry'))
      }
      else {
        resolve(String(result[regPath].values.InstallLocation.value))
      }
    })
  })
}

async function checkFilesExist(gamePath: string, fileArr: Array<string>): Promise<boolean> {
  const fileCheckResults = await Promise.all(fileArr.map(async (fileItem) => {
    const subDirectoryPath = path.join(gamePath, fileItem)
    try {
      await fsPromises.access(subDirectoryPath, constants.F_OK)
      return true
    }
    catch {
      return false
    }
  }))

  return fileCheckResults.every(result => result === true)
}

export default { getGamePath, checkFilesExist }
