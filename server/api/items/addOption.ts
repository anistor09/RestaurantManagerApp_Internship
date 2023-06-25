export default defineEventHandler((event) => {
	const token = getCookie(event, 'token');
	readBody(event).then(async (data) => {
        const option=data.option
        const item=data.item
		await fetch(`https://auth-api.ewai.fr/item/${parseInt(item)}/option/add/?optionId=${parseInt(option)}`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	});
	return "ok";
});
