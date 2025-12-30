// preload.js
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  ping: () => ipcRenderer.invoke('ping')
})

// 这里的这个名字不能重复 要不然会报错
contextBridge.exposeInMainWorld('electronAPI1', {
  openFile: () => ipcRenderer.invoke('dialog:openFile')
})

// 大概流程是  
// 1.在主进程(index.js)调用系统级别方法 （打开本地文件 获取机器码 等系统api） ipcMain.handle
// 2.预加载进程(preload.js)调用主进程方法  ipcRenderer.invoke  并且暴露出给渲染进程使用
// 3.渲染进程(renderer.js)调用预加载进程方法  const content = await window.electronAPI1.openFile()