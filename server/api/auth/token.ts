export default defineEventHandler((event) => {
	return readBody(event).then(async (code) => {
		const clientId = '69us2hj5rvvotdu17lamc00tu9';
		const clientSecret = 'kfh7t64r74vt93vq50vqenkml4m3a19449s4arptvfg1ih3q0ra';
		const redirectUri = 'http://localhost:3000/callback';

		const requestBody = new URLSearchParams();
		requestBody.append('response_type', 'code');
		requestBody.append('client_id', clientId);
		requestBody.append('client_secret', clientSecret);
		requestBody.append('redirect_uri', redirectUri);
		requestBody.append('grant_type', 'authorization_code');
		requestBody.append('code', code);

		const response = await fetch('https://auth.ewai.fr/oauth2/token', {
			method: 'POST',
			body: requestBody,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		});

		const responseData = await response.json();

		console.log(responseData);

		return responseData;
	});
});
