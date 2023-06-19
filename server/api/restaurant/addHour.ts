export default defineEventHandler(async (event) => {
	const data = await readBody(event);
	await fetch(`https://dev-api.ewai.fr/restaurant/1/hours/add?restaurantId=1`, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
		},
	});
});
