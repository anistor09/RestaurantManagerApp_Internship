export default defineEventHandler((event) => {
	return readBody(event).then(async (code) => {
		const config = useRuntimeConfig();

		const clientId = config.public.clientId;
		const clientSecret = config.clientSecret;
		const redirectUri = config.public.callback;

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

		console.log(responseData.access_token);

		setCookie(event, 'token', responseData.access_token);

		return 'Token set';
	});
});
