export default defineEventHandler((event) => {
	const token = getCookie(event, 'token');
	readBody(event).then(async (data) => {
		await fetch(
			`https://auth-api.ewai.fr/carte/removeitem?carteId=${data.id}&itemId=${data.itemId}`,
			{
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			},
		);
	});
	return "ok";
});
