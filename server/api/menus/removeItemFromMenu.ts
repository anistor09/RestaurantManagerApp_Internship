export default defineEventHandler((event) => {
	readBody(event).then(async (data) => {
		console.log(JSON.stringify(data));
		const response = await fetch(
			`https://dev-api.ewai.fr/carte/removeitem?carteId=${data.id}&itemId=${data.itemId}`,
			{
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);
		const responseData = await response.json();
		console.log(responseData);
	});
});
