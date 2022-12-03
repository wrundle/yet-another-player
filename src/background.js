'use strict'


// import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer';
const { app, protocol, BrowserWindow, dialog, ipcRenderer } = require('electron');
const { createProtocol } = require('vue-cli-plugin-electron-builder/lib');
const ipcMain = require('electron').ipcMain;
const path = require('path');


const isDevelopment = process.env.NODE_ENV !== 'production';


async function createWindow() {

	var win = new BrowserWindow({
		width: 1500,
		height: 900,
		frame: false,
		webPreferences: {
			contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
			nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
			preload: path.join(__dirname, 'preload.js'),
			webSecurity: false,
			devTools: true
		}
	});


	ipcMain.handle('minimize', () => win.minimize());
	ipcMain.handle('maximize', () => win.isMaximized() ? win.unmaximize() : win.maximize());
	ipcMain.handle('close', () => {win.webContents.closeDevTools(); win.close()});
	ipcMain.handle('reload', (event, args) => win.webContents.reload());

	ipcMain.handle('getPathToExecutable', async () => app.getPath('exe'));
	ipcMain.handle('selectFolder', async () => dialog.showOpenDialog({properties: ['openDirectory', 'multiSelections']}));

	ipcMain.handle('settingsHaveBeenUpdated', () => win.webContents.send('settingsHaveBeenUpdated', null));
	ipcMain.handle('songStateHasBeenUpdated', (event, args) => win.webContents.send('songStateHasBeenUpdated', args));


	if (process.env.WEBPACK_DEV_SERVER_URL) {
		// Load the url of the dev server if in development mode
		await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
	} else {
		createProtocol('app');
		// Load the index.html when not in development
		win.loadURL('app://./index.html');
	};


	// Emitted when the window is closed.
	win.on('closed', function () {
		// Dereference the window object
		// Usually you would store windows in an array
		// If your app supports multi windows, this is the time when you should delete the corresponding element
		win = null;
	});


	isDevelopment && !process.env.IS_TEST ? win.webContents.openDevTools() : {};

};


// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
	{ scheme: 'app', privileges: { secure: true, standard: true } }
]);


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
	if (isDevelopment && !process.env.IS_TEST) {
		// Install Vue Devtools
	}
	createWindow();
});


// Quit when all windows are closed.
app.on('window-all-closed', () => {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit();
	};
});


app.on('activate', () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) createWindow();
});


// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
	if (process.platform === 'win32') {
		process.on('message', (data) => {
			if (data === 'graceful-exit') app.quit();
		});
	} else {
		process.on('SIGTERM', () => {
			app.quit();
		});
	};
};
