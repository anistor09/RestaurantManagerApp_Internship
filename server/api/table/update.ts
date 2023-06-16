export default defineEventHandler((event) => {
	const token = getCookie(event, 'token');
	readBody(event).then(async (data) => {
		const parsedData = {
			number: parseInt(data.number),
			capacity: parseInt(data.capacity),
			restaurantId: parseInt(data.restaurantId),
		};

		await fetch(`https://auth-api.ewai.fr/table/${parseInt(data.id)}`, {
			method: 'PUT',
			body: JSON.stringify(parsedData),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
	});
});
