// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ['@element-plus/nuxt'],
	vite: {
		resolve: {
			alias: {
				'./runtimeConfig': './runtimeConfig.browser',
			},
		},
	},
});
