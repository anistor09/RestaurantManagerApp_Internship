import { Carte } from "~/interfaces/Carte";

export default defineEventHandler((event) => {
	readBody(event).then(async (data: Carte) => {
        console.log(JSON.stringify(data))
		const response = await fetch(`https://dev-api.ewai.fr/carte/?restaurantId=1`, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		});
        console.log(response);
	});
});
