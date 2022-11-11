const { YMApi } = require('ym-api');
const api = new YMApi();

import * as id3 from 'id3js';


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
