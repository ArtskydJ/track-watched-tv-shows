// Modules to control application life and create native browser window
const { app, BrowserWindow, dialog, Menu } = require('electron')
const isDev = require('electron-is-dev')

if (isDev) {
	require('electron-reloader')(module)
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		width: 450 + (isDev ? 600 : 0),
		height: 800,
		minWidth: 300,
		minHeight: 400,

		backgroundColor: '#333',
		show: false,
		webPreferences: {
			devTools: isDev,
			enableRemoteModule: true,
			nodeIntegration: true,
		},
		icon: './icon/icon.png'
	})
	Menu.setApplicationMenu(null)

	// and load the index.html of the app.
	mainWindow.loadFile('app/index.html')

	// Open the DevTools.
	if (isDev) {
		mainWindow.webContents.openDevTools()
	}

	mainWindow.on('ready-to-show', () => {
		mainWindow.show()
	})

	// Emitted when the window is closed.
	mainWindow.on('closed', () => {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null
	})
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) {
		createWindow()
	}
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

exports.selectDirectory = function() {
	return dialog.showOpenDialog(mainWindow, {
		properties: [ 'openDirectory' ]
	})
}
