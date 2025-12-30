const { app, BrowserWindow, ipcMain , dialog} = require('electron')
const path = require('path')
const fs = require('fs').promises 


// 处理渲染进程发来的 "read-file" 请求
ipcMain.handle('dialog:openFile', async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({})
  if (canceled) return null
  return await fs.readFile(filePaths[0], 'utf8')
})

ipcMain.handle('dialog:saveFile', async (event, content) => {
  const result = await dialog.showSaveDialog({
    title: '保存文件',
    defaultPath: 'untitled.txt',
    filters: [
      { name: 'Text Files', extensions: ['txt'] },
      { name: 'All Files', extensions: ['*'] }
    ]
  })

  if (result.canceled || !result.filePath) {
    return { success: false, message: '用户取消了保存' }
  }

  try {
    await fs.writeFile(result.filePath, content, 'utf8')
    return { success: true, filePath: result.filePath }
  } catch (err) {
    console.error('保存失败:', err)
    return { success: false, message: err.message }
  }
})


// 注册 ping 处理
ipcMain.handle('ping', async (event) => {
  console.log('get  ping request!!!')
  return 'pong'
})

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true // 必须为 true（默认值）
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})