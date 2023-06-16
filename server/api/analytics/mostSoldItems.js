export default defineEventHandler(async () => {
	const response = await fetch(`http://localhost:8085/analytics/mostSoldItems`, {
	});
	const responseData = await response.json();
	return responseData;
});
