import { Howl, Howler } from 'howler';
import * as id3 from 'id3js';

const { contextBridge, ipcRenderer } = require('electron');
const musicMetadata = require('musicmetadata');
const jsonfile = require('jsonfile');
const { YMApi } = require('ym-api');
const path = require('path');
const fs = require('fs');


const audioCtx = new (window.AudioContext || window.webkitAudioContext)();


var howlerInstance = new Object();

const updateSongState = () => {
	ipcRenderer.invoke('songStateHasBeenUpdated', [howlerInstance.state(), howlerInstance.playing()]);
};


const isObjectEmpty = (obj) => {
	for (const key in obj) return false;
	return true;
};


const normalizeString = (str) => {
	var result = '';
	for (const iterator of str) {
		if (iterator.charCodeAt() !== 0) {
			result += iterator;
		};
	};
	return result;
};


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


contextBridge.exposeInMainWorld('fileHandling', {

	addFolder: async () => {
		const res = await ipcRenderer.invoke('selectFolder');
		if (res.canceled) {
			return;
		};
		const pathToSettings = await getPathToSettings();
		var settings = jsonfile.readFileSync(pathToSettings);
		for (const iterator of res.filePaths) {
			const pathToFolder = iterator + '\\';
			if (!settings.allowedFolders.includes(pathToFolder)) {
				settings.allowedFolders.push(pathToFolder);
				jsonfile.writeFileSync(pathToSettings, settings, {spaces: 4});
			};
		}
		ipcRenderer.invoke('settingsHaveBeenUpdated');
	},

	settingsHaveBeenUpdated: args => {
		ipcRenderer.on('settingsHaveBeenUpdated', args);
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
			// FIXME: The application my take a long time to read all the files because of this
			// "...to calculate the duration musicmetadata may need to parse the entire file so only enable this
			// if you need the functionality" <- from the package documentation
			var durationInSeconds;
			var readableStream = fs.createReadStream(pathToFile);
			var parser = musicMetadata(readableStream, { duration: true }, function (err, metadata) {
				if (err) throw err;
				durationInSeconds = metadata.duration;
				readableStream.close();
			});
			const tags = await id3.fromPath(pathToFile);
			const song = {
				artist: normalizeString(tags.artist),
				album: normalizeString(tags.album),
				title: normalizeString(tags.title),
				track: normalizeString(tags.track),
				path: normalizeString(pathToFile),
				year: normalizeString(tags.year),
				images: tags.images,
				duration: durationInSeconds
			};
			songs.push(song);
		};
		resolve(songs);
	}),

});


contextBridge.exposeInMainWorld('songControls', {

	playSong: (pathToFile) => {
		if (!isObjectEmpty(howlerInstance)) howlerInstance.stop();
		howlerInstance = new Howl({ src: [pathToFile], html5: true, volume: 0.25, onload: () => updateSongState() });
		howlerInstance.play();
		updateSongState();

		// const audioSourceNode = audioCtx.createMediaElementSource(howlerInstance._sounds[0]._node);
		// const analyser = audioCtx.createAnalyser();
		// audioSourceNode.connect(analyser);
		// analyser.connect(audioCtx.destination);

		// analyser.fftSize = 128;
		// const bufferLength = analyser.frequencyBinCount;
		// const dataArray = new Uint8Array(bufferLength);
		// console.log(dataArray);
		// const barWidth = canvas.width / bufferLength;
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
