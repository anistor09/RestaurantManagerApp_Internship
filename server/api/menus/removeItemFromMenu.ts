export default defineEventHandler((event) => {
	readBody(event).then(async (data) => {
		await fetch(
			`https://dev-api.ewai.fr/carte/removeitem?carteId=${data.id}&itemId=${data.itemId}`,
			{
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);
	});
});
