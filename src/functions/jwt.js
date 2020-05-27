const jwt = process.env.REACT_APP_JWT;

exports.handler = async (event, context) => {
	return {
		statusCode: 200,
		body: JSON.stringify({ jwt })
	};
};