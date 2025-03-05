import fs from 'fs';
import path from 'path';
import AdmZip from 'adm-zip';

// 定义函数类型
function extractFiles(gamePath: string, zipPath: string): void {
  const zip = new AdmZip(zipPath);
  zip.extractAllTo(gamePath, true);
}

function createDirIfNotExists(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function copyFile(src: string, dest: string): void {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
  } else {
    console.log(`未找到文件: ${src}`);
  }
}

export default{ extractFiles, createDirIfNotExists, copyFile };
