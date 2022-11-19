import { createStore } from 'vuex';
import { reactive } from 'vue'


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

			window.songControls.playSong(payload.path);
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
