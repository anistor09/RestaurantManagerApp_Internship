import { Carte } from '~/interfaces/Carte';

export default defineEventHandler((event) => {
	const token = getCookie(event, 'token');
	readBody(event).then(async (data: Carte) => {
		const response = await fetch(`https://auth-api.ewai.fr/carte/?restaurantId=1`, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
	});
});
