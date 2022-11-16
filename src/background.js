'use strict'


import { app, protocol, BrowserWindow, dialog, ipcRenderer } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
// import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'

const ipcMain = require('electron').ipcMain
const path = require('path')
var fs = require('fs')


const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
	{ scheme: 'app', privileges: { secure: true, standard: true } }
])


async function createWindow() {
	// Create the browser window.
	var win = new BrowserWindow({
		width: 1500,
		height: 900,
		frame: false,
		webPreferences: {
			// Use pluginOptions.nodeIntegration, leave this alone
			// See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
			nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
			contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
			preload: path.join(__dirname, 'preload.js'),
			webSecurity: false,
			devTools: true
		}
	})


	ipcMain.handle('minimize', () => win.minimize())
	ipcMain.handle('maximize', () => win.isMaximized() ? win.unmaximize() : win.maximize())
	ipcMain.handle('close', () => {win.webContents.closeDevTools(); win.close()})

	ipcMain.handle('getPathToExecutable', async () => app.getPath('exe'))
	ipcMain.handle('selectFolder', async () => dialog.showOpenDialog({properties: ['openDirectory']}))

	ipcMain.handle('updateLocalLibrary', async () => win.webContents.send('updateLocalLibrary', null))


	if (process.env.WEBPACK_DEV_SERVER_URL) {
		// Load the url of the dev server if in development mode
		await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
		// if (!process.env.IS_TEST) win.webContents.openDevTools()
	} else {
		createProtocol('app')
		// Load the index.html when not in development
		win.loadURL('app://./index.html')
	}


	// Emitted when the window is closed.
	win.on('closed', function () {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		win = null
	})

	isDevelopment && !process.env.IS_TEST ? win.webContents.openDevTools() : {}
}


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
	if (BrowserWindow.getAllWindows().length === 0) createWindow()
})


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
	if (isDevelopment && !process.env.IS_TEST) {
		// Install Vue Devtools
		// try {
		//   await installExtension(VUEJS3_DEVTOOLS)
		// } catch (e) {
		//   console.error('Vue Devtools failed to install:', e.toString())
		// }
	}
	createWindow()
})


// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
	if (process.platform === 'win32') {
		process.on('message', (data) => {
			if (data === 'graceful-exit') {
				app.quit()
			}
		})
	} else {
		process.on('SIGTERM', () => {
			app.quit()
		})
	}
}
