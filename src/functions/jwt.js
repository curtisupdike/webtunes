let jwt = require('jsonwebtoken');

function parseKey(keyFromEnv) {
	// TODO: learn regex groups
	let head = '-----BEGIN PRIVATE KEY-----';
	let tail = '-----END PRIVATE KEY-----';
	let body = keyFromEnv
		.replace(new RegExp(head), '')
		.replace(new RegExp(tail), '')
		.replace(/\s/g, '\n');
	return `${head}${body}${tail}`;
}

exports.handler = async (event, context) => {
	let token = jwt.sign(
		// payload
		{
			iss: process.env.APPLE_DEV_TEAM_ID,
			iat: Math.floor(Date.now() / 1000),
			exp: Math.floor(Date.now() + 18000000)
		},
		parseKey(process.env.PRIVATE_KEY), 
		// options 
		{
		algorithm: 'ES256',
			header: {
				alg: 'ES256',
				kid: process.env.APPLE_DEV_KEY_ID
			}
		}
	);
	
	return {
		statusCode: 200,
		body: JSON.stringify({token})
	};
};