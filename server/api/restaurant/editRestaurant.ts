export default defineEventHandler(async (event) => {
	const token = getCookie(event, 'token');
	const data = await readBody(event);
	await fetch(`https://auth-api.ewai.fr/restaurant/1`, {
		method: 'PUT',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});
	return "ok";
});
