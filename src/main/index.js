'use strict'

import { ipcMain, app, BrowserWindow } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    icon: 'src/renderer/assets/logo.png',
    width: 1000,
    height: 720,
    minWidth: 500,
    minHeight: 200,
    frame: false
  })

  mainWindow.loadURL(winURL)
  mainWindow.setTitle('表格转换工具')
  mainWindow.setIcon('src/renderer/assets/switch_128px.ico')
  mainWindow.setOverlayIcon('src/renderer/assets/excel_128px.ico', '表格转换工具')

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * 用渲染子进程，向主进程发起通信，以实现用渲染出来的替换原有窗口的 最大化、最小化、关闭 按钮。
 * 这三个按钮使用渲染子进程做出来的，真正实现这些功能，还得让主进程来。所以需要向主进程发消息，来让主进程实现关闭
 */
function winClose () {
  // On OS X it is common for applications and their menu bar
  mainWindow.close()
}
function winMinimize () {
  mainWindow.minimize()
}
function winMaximize () {
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize()
  } else {
    mainWindow.maximize()
  }
}

ipcMain.on('window-all-closed', (event, arg) => {
  winClose()// prints "ping"
})

ipcMain.on('window-all-minimize', (event, arg) => {
  winMinimize()// prints "ping"
})

ipcMain.on('window-all-maximize', (event, arg) => {
  winMaximize()// prints "ping"
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
