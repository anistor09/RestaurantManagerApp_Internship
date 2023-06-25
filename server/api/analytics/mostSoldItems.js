export default defineEventHandler(async () => {
	const response = await fetch(`https://dev-api.ewai.fr/analytics/mostSoldItems`, {
	});
	const responseData = await response.json();
	return responseData;
});
