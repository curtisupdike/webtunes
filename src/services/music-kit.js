let MK = (function () {
	return {
		get instance() {
			if (!window.music) {
				window.music = window.MusicKit.getInstance();
			}
			return window.music;
		},

		homeRecommendations() {
			let recentlyPlayed = this.instance.api.recentPlayed().then((content) => ({
				id: 'recentlyPlayed',
				title: 'Recently Played',
				content,
			}));
			let recommendations = this.instance.api
				.recommendations()
				.then(formatApiResponse);
			let flatten = (arr) => [].concat(...arr);
			return Promise.all([recentlyPlayed, recommendations]).then(flatten);
		},
	};

	function formatApiResponse(response) {
		return response.map(
			({
				id,
				attributes: {
					title: { stringForDisplay: title },
				},
				relationships: {
					contents: { data: content },
				},
			}) => ({ id, title, content })
		);
	}
})();

export default MK;
