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
  const content = await window.electronAPI1.openFile()
  alert(content || 'No file selected')
}