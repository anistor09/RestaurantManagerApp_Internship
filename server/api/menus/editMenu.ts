import { Carte } from '~/interfaces/Carte';

export default defineEventHandler((event) => {
	const token = getCookie(event, 'token');
	readBody(event).then(async (data: Carte) => {
		await fetch(`https://auth-api.ewai.fr/carte/${data.id}`, {
			method: 'PUT',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
	});
	return "ok";
});
