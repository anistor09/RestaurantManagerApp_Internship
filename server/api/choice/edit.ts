export default defineEventHandler((event) => {
	const token = getCookie(event, 'token');
	readBody(event).then(async (data) => {
        const choice=data
		const response = await fetch(`https://auth-api.ewai.fr/choice/${parseInt(choice.id)}`, {
			method: 'POST',
			body: JSON.stringify(choice),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
        console.log(await response.text())
	});
});
