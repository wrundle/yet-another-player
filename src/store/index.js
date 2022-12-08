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

		currentPlaylist: new Array(),

		settings: {
			albumsView: true,
			coverView: true
		},

		modal: 0
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

		UPDATE_SETTINGS(state, payload) {
			state.settings = payload;
		},

		UPDATE_COVER_VIEW(state, payload) {
			state.settings.coverView = payload;
		},

		UPDATE_MODAL(state, payload) {
			state.modal = payload;
		},
	},


	actions: {
		async fetchSongs(context) {
			const songs = await window.folderHandling.readFolders;
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

		async fetchSettings(context) {
			const settings = await window.settings.readSettings;
			context.commit('UPDATE_SETTINGS', settings);
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
				};
			};
			context.commit('UPDATE_CURRENT_PLAYLIST', playlist);
		},

		addToCurrentPlaylist(context, payload) {
			const playlist = context.state.playlist;
			playlist.push(payload);
			context.commit('UPDATE_CURRENT_PLAYLIST', playlist);
		},

		setCoverView(context, payload) {
			window.settings.setСoverView(payload);
			context.commit('UPDATE_COVER_VIEW', payload);
		},

		setModal(context, payload) {
			context.commit('UPDATE_MODAL', payload);
		},
	},


	modules: {

	}

}));
