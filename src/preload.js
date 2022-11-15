import * as id3 from 'id3js';

const { contextBridge, ipcRenderer } = require('electron');
const jsonfile = require('jsonfile');
const { YMApi } = require('ym-api');
const path = require('path');
const fs = require('fs')


const defaultSettings = {allowedFolders: []};

const getPathToSettings = async () => {
	const pathToExecutable = await ipcRenderer.invoke('getPathToExecutable');
	const pathToSettings = path.dirname(pathToExecutable) + '\\settings.json';
	const doSettingsExist = await fs.promises.stat(pathToSettings).then(() => true, () => false);
	if (!doSettingsExist) {
		jsonfile.writeFileSync(pathToSettings, defaultSettings);
	};
	return pathToSettings;
};


contextBridge.exposeInMainWorld('folderHandling', {

	addFolder: async () => {
		const res = await ipcRenderer.invoke('selectFolder');
		if (res.canceled) {
			return;
		};
		const pathToFolder = res.filePaths[0] + '\\';
		const pathToSettings = await getPathToSettings();
		var settings = jsonfile.readFileSync(pathToSettings);
		if (!settings.allowedFolders.includes(pathToFolder)) {
			settings.allowedFolders.push(pathToFolder);
			jsonfile.writeFileSync(pathToSettings, settings);
		};
	},

	readFolders: new Promise(async (resolve, reject) => {
		const pathToSettings = await getPathToSettings();
		const settings = jsonfile.readFileSync(pathToSettings);
		var files = [];
		settings.allowedFolders.forEach(pathToFolder => {
			fs.readdirSync(pathToFolder).forEach(filename => {
				const pathToFile = pathToFolder + filename;
				if (path.extname(pathToFile) == ".mp3") {
					files.push(pathToFile);
				}
			});
		});
		var songs = [];
		for (const pathToFile of files) {
			const base64File = new Buffer(pathToFile, 'binary').toString('base64');
			const tags = await id3.fromPath(pathToFile);
			const song = {
				artist: tags.artist,
				album: tags.album,
				title: tags.title,
				track: tags.track,
				year: tags.year,
				images: tags.images,
				path: pathToFile,
				base64: base64File
			};
			songs.push(song);
		};
		resolve(songs);
	})

});


contextBridge.exposeInMainWorld('windowControls', {
	minimize: () => ipcRenderer.invoke('minimize'),
	maximize: () => ipcRenderer.invoke('maximize'),
	close: () => ipcRenderer.invoke('close')
});


ipcRenderer.on('addFolderToSettings', (e, message) => {
	// console.log(message);
});


const api = new YMApi();

(async () => {
	try {
		// await api.init({ username: "@.", password: "" });
		// const result = await api.searchArtists("gorillaz");


		// const result = await api.searchTracks("дао");
		// const tracks = result.tracks.results;
		// console.log(tracks);


		// const getTrackDownloadInfoResult = await api.getTrackDownloadInfo("86505477");
		// console.log(getTrackDownloadInfoResult);

		// const mp3Tracks = getTrackDownloadInfoResult
		// 	.filter((r) => r.codec === "mp3")
		// 	.sort((a, b) => b.bitrateInKbps - a.bitrateInKbps);
		// const hqMp3Track = mp3Tracks[0];
		// console.log(mp3Tracks, hqMp3Track);

		// const getTrackDirectLinkResult = await api.getTrackDirectLink(
		// 	hqMp3Track.downloadInfoUrl
		// );
		// console.log({ getTrackDirectLinkResult });
	} catch (e) {
		console.log(`api error ${e.message}`);
	}
})();
