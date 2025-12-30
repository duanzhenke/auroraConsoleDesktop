document.getElementById('pingBtn').addEventListener('click', async () => {
  try {
    const result = await window.electronAPI.ping()
    document.getElementById('result').textContent = result
    console.log('get result:', result)
  } catch (err) {
    console.error('调用失败:', err)
    document.getElementById('result').textContent = 'Error!'
  }
})
console.log('window.electronAPI =', window.electronAPI1)
document.getElementById('openFileBtn').onclick = async () => {
  const content = await window.electronSaveFile.openFile()
  alert(content || 'No file selected')
}


document.getElementById('saveBtn').addEventListener('click', async () => {
  const content = document.getElementById('editor').value
  const statusEl = document.getElementById('status')

  try {
    const result = await window.electronSaveFile.saveFile(content)
    if (result.success) {
      statusEl.textContent = `✅ 已保存到: ${result.filePath}`
    } else {
      statusEl.textContent = `❌ 保存失败: ${result.message}`
    }
  } catch (err) {
    console.error('调用失败:', err)
    statusEl.textContent = `💥 错误: ${err.message}`
  }
})