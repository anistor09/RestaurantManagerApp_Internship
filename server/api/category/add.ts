import { Category } from '~/interfaces/Category';
export default defineEventHandler((event) => {
	const token = getCookie(event, 'token');
	// Reads the body of the event and returns a promise
	return readBody(event).then(async (data) => {
		// Parses the data received from the event
		const parsedData = {
			name: data.name,
			description: data.description ,
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
		// Sends a POST request to the specified URL with the parsed data
		const response = await fetch(`https://auth-api.ewai.fr/category/?restaurantId=${parseInt(data.restaurant.id)}`, {
			method: 'POST',
			body: JSON.stringify(parsedData),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		const returnedCategory: Category = await response.json();
		// Returns the ID of the returned category
		return returnedCategory.id;
	});
});
