export default defineNuxtRouteMiddleware((to) => {
	const token = useCookie('token'); // get token from cookies

	// if token doesn't exist redirect to log in
	if (
		to.path !== '/callback' &&
		to.path !== '/login' &&
		(token.value === undefined || token.value === null)
	) {
		return navigateTo('/login');
	}
});
