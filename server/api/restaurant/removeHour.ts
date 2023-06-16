export default defineEventHandler(async(event) => {
	const data = await readBody(event);
	const response = await fetch(`https://dev-api.ewai.fr/restaurant/{id}/hours/remove?restaurantId=1'`, {
		method: 'POST',
        body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	console.log(response);
});
