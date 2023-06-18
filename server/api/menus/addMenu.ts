export default defineEventHandler((event) => {
	const token = getCookie(event, 'token');
	return readBody(event).then(async (data) => {
		delete data.id;
		const response = await fetch(`https://auth-api.ewai.fr/carte/?restaurantId=1`, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		const responseString = await response.text();
		const id = parseInt(responseString.split(' ')[2]);
		return id;
	});
});
