import * as id3 from 'id3js';

const path = require('path');
const { contextBridge, ipcRenderer } = require('electron');
const jsonfile = require('jsonfile');
const { YMApi } = require('ym-api');


let Song = class {
	constructor(
		artist,
		album,
		title,
		number,
		year,
		duration,
		cover,
		path
	) {
		this.artist = artist;
		this.album = album;
		this.title = title;
		this.number = number;
		this.year = year;
		this.duration = duration;
		this.cover = cover;
		this.path = path;
	};
};


// const obj = {
// 	name: 'one',
// 	surname: 'тык'
// };
// jsonfile.writeFile(settingsFile, obj, { spaces: 4 }, function (err) {
// 	if (err) console.error(err)
// })
// jsonfile.readFile(settingsFile, function (err, obj) {
// 	if (err) console.error(err)
// 	console.dir(obj)
// })


// function readFiles(dirname, onFileContent, onError) {
// 	fs.readdir(dirname, function (err, filenames) {
// 		if (err) {
// 			onError(err)
// 			return
// 		}
// 		filenames.forEach(function (filename) {
// 			fs.readFile(dirname + filename, 'utf-8', function (err, content) {
// 				if (err) {
// 					onError(err)
// 					return
// 				}
// 				onFileContent(filename, content)
// 			})
// 		})
// 	})
// }

// readFiles(result.filePaths[0] + '\\', (content) => {
// 	win.webContents.send('sendFolder', content);
// }, (err) => {throw err})


// id3.fromPath('C:/Users/Zanda/Desktop/test2.mp3').then((tags) => {
// 	console.log(tags);
// 	console.log(tags.artist);
// 	console.log(tags.album);
// 	console.log(tags.title);
// 	console.log(tags.year);
// 	console.log(tags.images.data);
// });


contextBridge.exposeInMainWorld('windowControls', {
	minimize: () => ipcRenderer.invoke('minimize'),

	maximize: () => ipcRenderer.invoke('maximize'),

	close: () => ipcRenderer.invoke('close')
});


contextBridge.exposeInMainWorld('folderHandling', {
	selectFolder: () => {
		ipcRenderer.invoke('selectFolder');
		ipcRenderer.invoke('getExecutablePath')
			.then(result => {
				const pathToSettings = path.dirname(result) + '\\settings.json';
				console.log(pathToSettings);
			});
	},

	addFolderToSettings: (message) => {
		ipcRenderer.on('addFolderToSettings', message);
	}
});


ipcRenderer.on('addFolderToSettings', (e, args) => {
	console.log(args);
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
