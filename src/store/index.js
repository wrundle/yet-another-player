import { createStore } from 'vuex';
import { reactive } from 'vue'


export default reactive(createStore({

	state: {
		songs: new Array(),
		currentSong: new Object,
		howlInstance: new Object,
		currentPlaylist: new Array()
	},

	getters: {

	},

	mutations: {
		UPDATE_SONGS(state, payload) {
			state.songs = payload;
		},

		UPDATE_CURRENT_SONG(state, payload) {
			state.currentSong = payload;
		},

		UPDATE_HOWL_INSTANCE(state, payload) {
			state.howlInstance = payload;
		},

		UPDATE_CURRENT_PLAYLIST(state, payload) {
			state.playlist = payload;
		},
	},

	actions: {
		async fetchSongs(context) {
			const response = await window.fileHandling.readFolders;
			context.commit('UPDATE_SONGS', response);
		},

		setCurrentSong(context, payload) {
			context.commit('UPDATE_CURRENT_SONG', payload);

			window.songControls.playSong(payload.path);
		},

		playTrack(context) {
			const track = new Howl({
				src: [context.state.playlist[0]]
			});
			track.play();
			Howler.volume(0.5);
		},

		addToCurrentPlaylist(context, payload) {
			const playlist = context.state.playlist;
			playlist.push(payload);
			context.commit('UPDATE_CURRENT_PLAYLIST', playlist);
		},
	},

	modules: {

	}

}));
