import { Howl, Howler } from 'howler';
import { createStore } from 'vuex';


// window.folderHandling.msgLibraryUpdated((event, args) => {
// 	console.log(args);

// 	var audioSrc = 'data:audio/mp3;base64,' + message;
// 	var audio = new Audio();
// 	audio.src = audioSrc;
// 	audio.load();
// 	audio.play();
// });


export default createStore({

	state: {
		currentSong: {},
		playlist: []
	},

	getters: {

	},

	mutations: {
		UPDATE_PLAYLIST(state, payload) {
			state.playlist = payload;
		},

		UPDATE_MUSIC_LIBRARY(state, payload) {
			state.musicLibrary = payload;
		}
	},

	actions: {
		addToPlaylist(context, payload) {
			const playlist = context.state.playlist;
			playlist.push(payload);
			context.commit('UPDATE_PLAYLIST', playlist);
		},

		playTrack(context) {
			const track = new Howl({
				src: [context.state.playlist[0]]
			});
			track.play();
			Howler.volume(0.5);
		},

		log(context) {
			console.log(context.state.playlist);
		}
	},

	modules: {

	}

});
