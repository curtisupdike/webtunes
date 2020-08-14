var MK = (function () {
	return {
		get instance() {
			if (!window.music) {
				window.music = window.MusicKit.getInstance();
			}
			return window.music;
		},

		homeRecommendations() {
			var recentlyPlayed = this.instance.api.recentPlayed().then((content) => ({
				id: 'recentlyPlayed',
				title: 'Recently Played',
				content,
			}));
			var recommendations = this.instance.api
				.recommendations()
				.then(formatApiResponse);
			var flatten = (arr) => [].concat(...arr);
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
