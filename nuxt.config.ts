// , '@pinia-plugin-persistedstate/nuxt',
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ['@element-plus/nuxt', '@pinia/nuxt'],
	vite: {
		resolve: {
			alias: {
				'./runtimeConfig': './runtimeConfig.browser',
			},
		},
	},
	runtimeConfig: {
		clientSecret: '',

		public: {
			clientId: '',
			callback: '',
		},
	},
	css: ['~/assets/css/global.css'],
});
