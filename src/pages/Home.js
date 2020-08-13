import React, { useState, useEffect } from 'react';
import { music } from '../services/music';
import Loading from '../components/common/Loading';
import MediaContainer from '../components/MediaContainer';

function Home() {
	const [recommendations, setRecomendations] = useState(null);

	useEffect(() => {
		music.api
			.recommendations()
			.then(formatResponse)
			.then(setRecomendations)
			.catch((e) => console.error(e));
	}, []);

	if (!recommendations) {
		return <Loading />;
	}

	return <MediaContainer title="Home" media={recommendations} />;

	function formatResponse(response) {
		return response.map(
			({
				attributes: {
					id,
					title: { stringForDisplay: title },
				},
				relationships: {
					contents: { data: content },
				},
			}) => ({ id, title, content })
		);
	}
}

export default Home;
