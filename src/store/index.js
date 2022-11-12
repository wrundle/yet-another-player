import { createStore } from 'vuex';
import { Howl, Howler } from 'howler';


export default createStore({

	state: {
		playlist: []
	},

	getters: {

	},

	mutations: {
		UPDATE_PLAYLIST(state, payload) {
			state.playlist = payload
		}
	},

	actions: {
		addToPlaylist(context, payload) {
			const playlist = context.state.playlist
			playlist.push(payload)
			context.commit('UPDATE_PLAYLIST', playlist)
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

})
