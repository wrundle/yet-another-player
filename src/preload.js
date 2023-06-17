const { isObjectEmpty } = require('./utilities/utilities.js');
const { contextBridge, ipcRenderer } = require('electron');
const musicMetadata = require('musicmetadata');
const {Howl, Howler} = require('howler');
const jsonfile = require('jsonfile');
const { YMApi } = require('ym-api');
const path = require('path');
const fs = require('fs');

import axios, {isCancel, AxiosError} from 'axios';

const YandexMusicApi = new YMApi();

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

var howlerInstance = new Object();

var APICallCount = 0;

function toDataUrl(url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.onload = function () {
		var reader = new FileReader();
		reader.onloadend = function () {
			callback(reader.result);
		}
		reader.readAsDataURL(xhr.response);
	};
	xhr.open('GET', url);
	xhr.responseType = 'blob';
	xhr.send();
};

const getImgFromAPI = async (tags) => {
	if (!(tags.album && tags.picture.length && tags.year) && (tags.artist.length && tags.title)) {
		console.log(`Problem with "${tags.artist[0]}" by "${tags.title}"`);
		console.log(`Missing tags: ${tags.album ? '' : '<album>'} ${tags.picture.length ? '' : '<picture>'} ${tags.year ? '' : '<year>'}`);

		const pathToExecutable = await ipcRenderer.invoke('getPathToExecutable');
		const pathToTemp = path.dirname(pathToExecutable) + '\\temp.json';
		const doesTempExists = await fs.promises.stat(pathToTemp).then(() => true, () => false);
		if (!doesTempExists) jsonfile.writeFileSync(pathToTemp, {});

		const temp = jsonfile.readFileSync(pathToTemp);

		if (`${tags.artist[0]} ${tags.title}` in temp) {
			console.log('Found url in temp!');
			console.log(
				"%c ",
				"display: inline-block ; background-image: url( 'https://bennadel.github.io/JavaScript-Demos/demos/console-log-css/rock.png' ) ; " +
				"background-size: cover ; padding: 10px 175px 158px 10px ; " +
				"border: 2px solid black ; font-size: 11px ; line-height: 11px ; " +
				"font-family: monospace ;"
			);
			return temp[`${tags.artist[0]} ${tags.title}`];
		};

		if (tags.album) {
			APICallCount++;
			console.log(`%cCalling the API for the ${APICallCount}~th time`, 'background: red');
			const response = await axios({
				method: 'GET',
				baseURL: 'https://yet-another-player-lyrics-api.vercel.app/',
				url: 'info',
				params: {
					'title': tags.artist[0] + ' ' + tags.title
				}
			});
			temp[`${tags.artist[0]} ${tags.title}`] = response.data.song_art_image_url;
			jsonfile.writeFileSync(pathToTemp, temp, {spaces: 4});
			return response.data.song_art_image_url;
		};
	};
};

const updateSongState = () => {
	ipcRenderer.invoke('songStateHasBeenUpdated', [howlerInstance.state(), howlerInstance.playing()]);
};

contextBridge.exposeInMainWorld('folderHandling', {
	addFolder: async () => {
		const res = await ipcRenderer.invoke('selectFolder');
		if (res.canceled) return;
		const pathToSettings = await ipcRenderer.invoke('getPathToSettings');
		const settings = jsonfile.readFileSync(pathToSettings);
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

			var imgFromAPI = null;
			if (settings.searchOnTheInternet && !tags.picture.length) {
				const response = await axios.get(await getImgFromAPI(tags),  { responseType: 'arraybuffer' });
				const buffer = Buffer.from(response.data, "utf-8");
				imgFromAPI = buffer;
			};

			const song = {
				// TODO: Utilize other cool tags like genre, disk.no, disk.of, track.of, etc.
				duration:	tags.duration,
				artists:	tags.artist,
				cover: 		tags.picture.length ? tags.picture[0].data : imgFromAPI,
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

contextBridge.exposeInMainWorld('settings', {
	readSettings: new Promise(async (resolve, reject) => {
		const pathToSettings = await ipcRenderer.invoke('getPathToSettings');
		const settings = jsonfile.readFileSync(pathToSettings);
		resolve(settings);
	}),

	setAlbumsView: async (param) => {
		const pathToSettings = await ipcRenderer.invoke('getPathToSettings');
		const settings = jsonfile.readFileSync(pathToSettings);
		settings.albumsView = param;
		jsonfile.writeFileSync(pathToSettings, settings, {spaces: 4});
	},

	setVolume: async (param) => {
		const pathToSettings = await ipcRenderer.invoke('getPathToSettings');
		const settings = jsonfile.readFileSync(pathToSettings);
		settings.volume = param;
		jsonfile.writeFileSync(pathToSettings, settings, {spaces: 4});
	},

	setСoverView: async (param) => {
		const pathToSettings = await ipcRenderer.invoke('getPathToSettings');
		const settings = jsonfile.readFileSync(pathToSettings);
		settings.coverView = param;
		jsonfile.writeFileSync(pathToSettings, settings, {spaces: 4});
	},

	setSearchOnTheInternet: async (param) => {
		const pathToSettings = await ipcRenderer.invoke('getPathToSettings');
		const settings = jsonfile.readFileSync(pathToSettings);
		settings.searchOnTheInternet = param;
		jsonfile.writeFileSync(pathToSettings, settings, {spaces: 4});
	},
});


contextBridge.exposeInMainWorld('songControls', {
	playSong: async (pathToFile) => {
		const pathToSettings = await ipcRenderer.invoke('getPathToSettings');
		const settings = jsonfile.readFileSync(pathToSettings);
		if (!isObjectEmpty(howlerInstance)) howlerInstance.unload();
		howlerInstance = new Howl({
			src: [pathToFile],
			html5: true,
			volume: settings.volume,
			onload: () => updateSongState()
		});
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

// (async () => {
// 	try {
// 		const result = await YandexMusicApi.search("Numenorean Adore");
// 		// const tracks = result.tracks.results;
// 		console.log(result);
// 	} catch (e) {
// 		console.log(`api error ${e.message}`);
// 	};
// })();
