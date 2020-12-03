let jsonWebToken = require('jsonwebtoken');

const DAYS_VALID = 180;
const MILLISECONDS_IN_A_DAY = 86400000;

function parseKeyFromEnv(key) {
	const head = '-----BEGIN PRIVATE KEY-----';
	const tail = '-----END PRIVATE KEY-----';
	let body = key
		.replace(new RegExp(head), '')
		.replace(new RegExp(tail), '')
		.replace(/\s/g, '\n');
	return `${head}${body}${tail}`;
}

exports.handler = async () => {
	let developerToken = jsonWebToken.sign(
		{},
		parseKeyFromEnv(process.env.APPLE_DEV_AUTH_KEY),
		{
			algorithm: 'ES256',
			expiresIn: DAYS_VALID + 'd',
			issuer: process.env.APPLE_DEV_TEAM_ID,
			header: {
				alg: 'ES256',
				kid: process.env.APPLE_DEV_KEY_ID,
			},
		}
	);

	let expiration = Date.now() + (DAYS_VALID - 1) * MILLISECONDS_IN_A_DAY;

	return {
		statusCode: 200,
		body: JSON.stringify({ developerToken, expiration }),
	};
};
