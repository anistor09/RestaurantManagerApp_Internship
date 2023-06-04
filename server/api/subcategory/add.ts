export default defineEventHandler((event) => {
	return readBody(event).then(async (data) => {
		const parsedData = {
			
			name: data.name,
			description: data.description,
			presentationOrder: parseInt(data.presentationOrder),
			imageUrl: data.imageUrl,
			restaurant: {
				id: parseInt(data.restaurant.id),
				name: data.restaurant.name,
				imageUrl: data.restaurant.imageUrl,
				latitude: parseInt(data.restaurant.latitude),
				longitude: parseInt(data.restaurant.longitude),
				rating : parseInt(data.restaurant.rating),
				category : data.restaurant.category,
				backgroundColor : data.restaurant.backgroundColor,
				foregroundColor: data.restaurant.foregroundColor,
				font_color: data.restaurant.font_color,
				description: data.restaurant.description,
				logoUrl: data.restaurant.logoUrl,
				addresse: data.restaurant.addresse,
				phoneNumber: data.restaurant.phoneNumber,
				email: data.restaurant.email,
				averageWaitingTime: parseInt("0"),
			}
		};
		
		
		const response = await fetch(`https://dev-api.ewai.fr/subcategory/?categoryid=${parseInt(data.categoryId)}`, {
			method: 'POST',
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
