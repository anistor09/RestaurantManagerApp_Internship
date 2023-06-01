import { Table } from '~/interfaces/Table';

export default defineEventHandler((event) => {
	const token = getCookie(event, 'token');
	return readBody(event).then(async (data) => {
		const parsedData = {
			number: parseInt(data.number),
			capacity: parseInt(data.capacity),
			restaurantId: parseInt(data.restaurantId),
		};

		const response = await fetch(`https://auth-api.ewai.fr/table/`, {
			method: 'POST',
			body: JSON.stringify(parsedData),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});

		const responseData: Table = await response.json();
		return responseData;
	});
});
