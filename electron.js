// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')

function createWindow () {
  let win = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    },
    frame: false,
    transparent: true,
    show: false,
    resizable: false,
  })

  win.once('ready-to-show', () => {
    win1.close()
    win.show();
  })
  //win.setMenu(null);
  // 加载index.html文件
  mainWindow.loadFile(`${__dirname}\\web\\index.html`)
  // win.loadFile('web/index.html');
  // 打开开发者工具
  //win.webContents.openDevTools()
  //接收最大化命令
  ipcMain.on('window-max', function () {
    if (win.isMaximized()) {
      win.restore();
    } else {
      win.maximize();
    }
  })

  //接收最小化命令
  ipcMain.on('window-min', function () {
    win.minimize();
  })

  //接收关闭命令
  ipcMain.on('window-close', function () {
    win.close();
    // if (process.platform !== 'darwin') {
    //     app.quit()
    // }
  })
  // and load the index.html of the app.
  // mainWindow.loadFile('index.html')
 
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
