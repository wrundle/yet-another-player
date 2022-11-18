import { Howl, Howler } from 'howler';
import { createStore } from 'vuex';
import { reactive } from 'vue'


// window.folderHandling.msgLibraryUpdated((event, args) => {
// 	console.log(args);

// 	var audioSrc = 'data:audio/mp3;base64,' + message;
// 	var audio = new Audio();
// 	audio.src = audioSrc;
// 	audio.load();
// 	audio.play();
// });


export default reactive(createStore({

	state: {
		currentSong: new Object,
		howlInstance: new Object,
		playlist: []
	},

	getters: {

	},

	mutations: {
		UPDATE_CURRENT_SONG(state, payload) {
			state.currentSong = payload;
		},

		UPDATE_HOWL_INSTANCE(state, payload) {
			state.howlInstance = payload;
		},

		UPDATE_PLAYLIST(state, payload) {
			state.playlist = payload;
		},

		UPDATE_MUSIC_LIBRARY(state, payload) {
			state.musicLibrary = payload;
		}
	},

	actions: {
		setCurrentSong(context, payload) {
			context.commit('UPDATE_CURRENT_SONG', payload);

			window.fileHandling.playSong(payload.path);
		},

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

}));
