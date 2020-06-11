var jsonWebToken = require('jsonwebtoken');

function parseKey(keyFromEnv) {
	const head = '-----BEGIN PRIVATE KEY-----';
	const tail = '-----END PRIVATE KEY-----';
	let body = keyFromEnv
		.replace(new RegExp(head), '')
		.replace(new RegExp(tail), '')
		.replace(/\s/g, '\n');
	return `${head}${body}${tail}`;
}

exports.handler = async () => {
	let developerToken = jsonWebToken.sign(
		{}, 
		parseKey(process.env.APPLE_DEV_AUTH_KEY), 
		{
			algorithm: "ES256",
			expiresIn: "180d",
			issuer: process.env.APPLE_DEV_TEAM_ID,
			header: {
				alg: "ES256",
				kid: process.env.APPLE_DEV_KEY_ID
			}
		}
	);
	
	return {
		statusCode: 200,
		body: JSON.stringify({developerToken})
	};
};