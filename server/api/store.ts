export default defineEventHandler(async (event) => {
	const token = getCookie(event, 'token');
	const response = await fetch(`https://auth-api.ewai.fr/restaurant/`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	const responseData = await response.json();
	console.log(responseData);
	return responseData;
});
