const { isObjectEmpty } = require('./utilities/utilities.js');
const { contextBridge, ipcRenderer } = require('electron');
const musicMetadata = require('musicmetadata');
const {Howl, Howler} = require('howler');
const jsonfile = require('jsonfile');
const { YMApi } = require('ym-api');
const path = require('path');
const fs = require('fs');


const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const YandexMusicApi = new YMApi();

var howlerInstance = new Object();


const updateSongState = () => {
	ipcRenderer.invoke('songStateHasBeenUpdated', [howlerInstance.state(), howlerInstance.playing()]);
};


contextBridge.exposeInMainWorld('fileHandling', {

	addFolder: async () => {
		const res = await ipcRenderer.invoke('selectFolder');
		if (res.canceled) {
			return;
		};
		const pathToSettings = await ipcRenderer.invoke('getPathToSettings');
		var settings = jsonfile.readFileSync(pathToSettings);
		for (const iterator of res.filePaths) {
			const pathToFolder = iterator + '\\';
			if (!settings.allowedFolders.includes(pathToFolder)) {
				settings.allowedFolders.push(pathToFolder);
				jsonfile.writeFileSync(pathToSettings, settings, {spaces: 4});
			};
		};
		ipcRenderer.invoke('reload');
	},

	readFolders: new Promise(async (resolve, reject) => {
		const pathToSettings = await ipcRenderer.invoke('getPathToSettings');
		const settings = jsonfile.readFileSync(pathToSettings);
		var files = [];
		settings.allowedFolders.forEach(pathToFolder => {
			fs.readdirSync(pathToFolder).forEach(filename => {
				const pathToFile = pathToFolder + filename;
				if (path.extname(pathToFile) == ".mp3") {
					files.push(pathToFile);
				};
			});
		});
		var id = 0;
		var songs = [];
		for (const pathToFile of files) {
			var tags;
			var readableStream = fs.createReadStream(pathToFile);
			musicMetadata(readableStream, { duration: true }, (err, metadata) => {
				if (err) throw err;
				tags = metadata;
				readableStream.close();
			});
			// TODO: Comment this atrocity
			await new Promise((resolve, reject) => readableStream.on('close', () => resolve()));
			const song = {
				// TODO: Utilize other cool tags like genre, disk.no, disk.of, track.of, etc.
				duration:	tags.duration,
				artists:	tags.artist,
				cover: 		tags.picture[0].data,
				track:		tags.track,
				album:		tags.album,
				title:		tags.title,
				year:		tags.year,
				path:		pathToFile,
				id:			id
			};
			id++;
			songs.push(song);
		};
		resolve(songs);
	}),

});


contextBridge.exposeInMainWorld('songControls', {

	playSong: (pathToFile) => {
		if (!isObjectEmpty(howlerInstance)) howlerInstance.unload();
		howlerInstance = new Howl({ src: [pathToFile], html5: true, volume: 0.25, onload: () => updateSongState() });
		howlerInstance.play();
		updateSongState();
	},

	togglePause: () => {
		if (isObjectEmpty(howlerInstance)) return;
		howlerInstance.playing() ? howlerInstance.pause() : howlerInstance.play();
		updateSongState();
	},

	songStateHasBeenUpdated: args => {
		ipcRenderer.on('songStateHasBeenUpdated', args)
	},

});


contextBridge.exposeInMainWorld('windowControls', {
	minimize: () => ipcRenderer.invoke('minimize'),
	maximize: () => ipcRenderer.invoke('maximize'),
	close: () => ipcRenderer.invoke('close'),
	reload: () => ipcRenderer.invoke('reload')
});


(async () => {
	try {
		// const result = await YandexMusicApi.searchTracks("дао");
		// const tracks = result.tracks.results;
	} catch (e) {
		console.log(`api error ${e.message}`);
	};
})();
