const { app, BrowserWindow, ipcMain , dialog} = require('electron')
const path = require('path')
const fs = require('fs').promises 


// 处理渲染进程发来的 "read-file" 请求
ipcMain.handle('dialog:openFile', async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({})
  if (canceled) return null
  return await fs.readFile(filePaths[0], 'utf8')
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