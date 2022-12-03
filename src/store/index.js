import { createStore } from 'vuex';
import { reactive } from 'vue'


export default reactive(createStore({

	state: {
		songs: new Array(),
		albums: new Array(),

		songsByAlbum: new Object(),

		currentSong: new Object,
		currentSongState: {
			isLoading: false,
			isPlaying: false
		},

		currentPlaylist: new Array()
	},


	getters: {

	},


	mutations: {
		UPDATE_SONGS(state, payload) {
			state.songs = payload;
		},

		UPDATE_SONGS_BY_ALBUM(state, payload) {
			state.songsByAlbum = payload;
		},

		UPDATE_ALBUMS(state, payload) {
			state.albums = payload;
		},

		UPDATE_CURRENT_SONG(state, payload) {
			state.currentSong = payload;
		},

		UPDATE_CURRENT_SONG_STATE(state, payload) {
			state.currentSongState = payload;
		},

		UPDATE_CURRENT_PLAYLIST(state, payload) {
			state.currentPlaylist = payload;
		},
	},


	actions: {
		async fetchSongs(context) {
			const songs = await window.fileHandling.readFolders;
			context.commit('UPDATE_SONGS', songs);

			const songsByAlbum = songs.reduce((acc, song) => {
				const { album } = song;
				acc[album] = acc[album] ?? [];
				acc[album].push(song);
				return acc;
			}, {});
			context.commit('UPDATE_SONGS_BY_ALBUM', songsByAlbum);

			const albums = Object.keys(songsByAlbum).sort();
			context.commit('UPDATE_ALBUMS', albums);

			const playlist = [];
			for (const album of albums) {
				for (const song of songsByAlbum[album]) {
					playlist.push(song);
				};
			};
			context.commit('UPDATE_CURRENT_PLAYLIST', playlist);
		},

		setCurrentSong(context, payload) {
			window.songControls.playSong(payload.path);
			context.commit('UPDATE_CURRENT_SONG', payload);
		},

		setCurrentSongState(context, payload) {
			context.commit('UPDATE_CURRENT_SONG_STATE', payload);
		},

		setNextSongAsCurrent(context) {
		},

		setPreviousSongAsCurrent(context) {
		},

		setCurrentPlaylist(context, payload) {
			const playlist = [];
			for (const album of Object.keys(payload).sort()) {
				for (const song of payload[album]) {
					playlist.push(song);
				}
			}
			context.commit('UPDATE_CURRENT_PLAYLIST', playlist);
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
