'use strict';
/** Import Dependencies **/
const Electron = require('electron');
const Config = require('electron-config');

const App = Electron.app;
const config = new Config();

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// prevent window being garbage collected
let mainWindow;
let isNotMac = process.platform !== 'darwin';

function onClosed() {
	// dereference the window
	// for multiple windows store them in an array
	mainWindow = null;
}

function createMainWindow() {
	const win = new Electron.BrowserWindow({
		width: 600,
		height: 400,
		frame: false,
		backgroundColor: '#EEE'
	});

	win.loadURL(`file://${__dirname}/index.html`);
	win.on('closed', onClosed);

	return win;
}

App.on('window-all-closed', () => {
	if (isNotMac) {
		App.quit();
	}
});

App.on('activate', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

App.on('ready', () => mainWindow = createMainWindow());
