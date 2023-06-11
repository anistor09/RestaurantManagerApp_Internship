export default defineEventHandler((event) => {
	return readBody(event).then(async (data) => {
		const parsedData = {
			id: parseInt(data.cid),
			name: data.requestBody.name,
			description: data.requestBody.description,
			presentationOrder: parseInt(data.requestBody.presentationOrder),
			imageUrl: data.requestBody.imageUrl,
			restaurantId: parseInt(data.requestBody.restaurant.id)
		};
		
		await fetch(`https://dev-api.ewai.fr/category/${parseInt(data.cid)}`, {
			method: 'PUT',
			body: JSON.stringify(parsedData),
			headers: {
				'Content-Type': 'application/json',
			},
		});
	
		
		
		return `Succesfully edited category ${data.cid}`;
	});
});
