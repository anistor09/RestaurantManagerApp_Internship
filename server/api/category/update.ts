export default defineEventHandler((event) => {
	const token = getCookie(event, 'token');
	// Reads the body of the event and returns a promise
	return readBody(event).then(async (data) => {
		// Parses the data received from the event
		const parsedData = {
			id: parseInt(data.cid),
			name: data.requestBody.name,
			description: data.requestBody.description,
			presentationOrder: parseInt(data.requestBody.presentationOrder),
			imageUrl: data.requestBody.imageUrl,
			restaurantId: parseInt(data.requestBody.restaurant.id)
		};
		// Sends a PUT request to the specified URL with the parsed data
		await fetch(`https://auth-api.ewai.fr/category/${parseInt(data.cid)}`, {
			method: 'PUT',
			body: JSON.stringify(parsedData),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		// Returns a success message
		return `Succesfully edited category ${data.cid}`;
	});
});
