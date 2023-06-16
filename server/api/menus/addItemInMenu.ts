export default defineEventHandler((event) => {
	const token = getCookie(event, 'token');
	readBody(event).then(async (data) => {
		console.log(JSON.stringify(data));
		const carteId = data.carteId;
		const itemId = data.itemId;
		const response = await fetch(
			`https://auth-api.ewai.fr/carte/additem?itemId=${itemId}&carteId=${carteId}`,
			{
				method: 'POST',
				body: '',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			},
		);
		console.log(response);
	});
});
