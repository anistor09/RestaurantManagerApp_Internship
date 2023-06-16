// , '@pinia-plugin-persistedstate/nuxt',
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ['@element-plus/nuxt', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt'],
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
	css: [
		'~/assets/css/loading.css',
		'~/assets/css/global.css',
		'~/assets/css/el-select.css',
		'~/assets/css/pop-up/choice-edit.css',
		'~/assets/css/pop-up/option-edit.css',
		'~/assets/css/pop-up/choice-delete.css',
		'~/assets/css/classes/special-select-item.css',
		'~/assets/css/classes/special-multiple-select-item.css',
	],
});
