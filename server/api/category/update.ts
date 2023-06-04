export default defineEventHandler((event) => {
	return readBody(event).then(async (data) => {
		const parsedData = {
			id: parseInt(data.cid),
			name: data.requestBody.name,
			description: parseInt(data.requestBody.description),
			presentationOrder: parseInt(data.requestBody.presentationOrder),
			imageUrl: data.requestBody.imageUrl,
			restaurant: {
				id: parseInt(data.requestBody.restaurant.id),
				name: data.requestBody.restaurant.name,
				imageUrl: data.requestBody.restaurant.imageUrl,
				latitude: parseInt(data.requestBody.restaurant.latitude),
				longitude: parseInt(data.requestBody.restaurant.longitude),
				rating : parseInt(data.requestBody.restaurant.rating),
				category : data.requestBody.restaurant.category,
				backgroundColor : data.requestBody.restaurant.backgroundColor,
				foregroundColor: data.requestBody.restaurant.foregroundColor,
				font_color: data.requestBody.restaurant.font_color,
				description: data.requestBody.restaurant.description,
				logoUrl: data.requestBody.restaurant.logoUrl,
				addresse: data.requestBody.restaurant.addresse,
				phoneNumber: data.requestBody.restaurant.phoneNumber,
				email: data.requestBody.restaurant.email,
				averageWaitingTime: parseInt("0"),
			}
		};
		
		const response =await fetch(`https://dev-api.ewai.fr/category/${parseInt(data.cid)}`, {
			method: 'PUT',
			body: JSON.stringify(parsedData),
			headers: {
				'Content-Type': 'application/json',
			},
		});
	
		const responseData = await response;
		
		const responseString = await responseData.text()
		const splitString =  responseString.split(" ")
		
		
		const newId =splitString[splitString.length - 1];
		
		return newId;
	});
});
