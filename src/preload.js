import * as id3 from 'id3js';

const { contextBridge, ipcRenderer } = require('electron');
const { YMApi } = require('ym-api');


window.ipcRenderer = require('electron').ipcRenderer;


contextBridge.exposeInMainWorld('versions', {
	node: () => process.versions.node,
	chrome: () => process.versions.chrome,
	electron: () => process.versions.electron,
	ping: () => ipcRenderer.invoke('ping'),
	// we can also expose variables, not just functions
})


// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
// contextBridge.exposeInMainWorld(
// 	"api", {
// 	send: (channel, data) => {
// 		// whitelist channels
// 		let validChannels = ["toMain"];
// 		if (validChannels.includes(channel)) {
// 			ipcRenderer.send(channel, data);
// 		}
// 	},
// 	receive: (channel, func) => {
// 		let validChannels = ["fromMain"];
// 		if (validChannels.includes(channel)) {
// 			// Deliberately strip event as it includes `sender`
// 			ipcRenderer.on(channel, (event, ...args) => func(...args));
// 		}
// 	}
// }
// );


const api = new YMApi();

(async () => {
	try {
		// await api.init({ username: "@.", password: "" });
		// const result = await api.searchArtists("gorillaz");


		const result = await api.searchTracks("дао");
		const tracks = result.tracks.results;
		console.log(tracks);


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
		id3.fromPath('C:/Users/Zanda/Desktop/test2.mp3').then((tags) => {
			console.log(tags);
			console.log(tags.artist);
			console.log(tags.album);
			console.log(tags.title);
			console.log(tags.year);
		});
	} catch (e) {
		console.log(`api error ${e.message}`);
	}
})();

// console.log('smth');
// alert("It Worked!") // Remove this line once you confirm it worked
