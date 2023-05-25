export default defineEventHandler((event) => {
	readBody(event).then(async (data) => {
		const parsedData = {
			number: parseInt(data.number),
			capacity: parseInt(data.capacity),
			restaurantId: parseInt(data.restaurantId),
		};

		await fetch(`https://dev-api.ewai.fr/table/${parseInt(data.id)}`, {
			method: 'PUT',
			body: JSON.stringify(parsedData),
			headers: {
				'Content-Type': 'application/json',
			},
		});
	});
});
