import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'NimForUE documentation',
			description: 'NimForUE is a Nim language wrapper for Unreal Engine 5',
			logo: {
				src: './src/assets/logo_nimforue.png',
			},
			social: {
				github: 'https://github.com/jmgomez/NimForUE',
				discord: 'https://discord.gg/smD8vZxzHh',
				twitter: 'https://twitter.com/_jmgomez_',
			},
			editLink: {
				baseUrl: 'https://github.com/jmgomez/NimForUE_docs/edit/main/',
			},
			sidebar: [
				{
					label: 'Getting started',
					items: [
						{ label: 'Introduction', link: '/start/introduction/' },
						{ label: 'Installation', link: '/start/install/' },
						{ label: 'Usage', link: '/start/usage/' },
					],
				},
				{
					label: 'Concepts',
					autogenerate: { directory: 'concepts' },
				},
				{
					label: 'Utilities',
					autogenerate: { directory: 'utils' },
				},
				{
					label: 'Guides',
					autogenerate: { directory: 'guides' },
				},
				{
					label: 'Examples',
					autogenerate: { directory: 'examples' },
				},
			],
			lastUpdated: true,
			customCss: [
				// Relative path to your custom CSS file
				'./src/styles/custom.css',
			],
		}),
	],
});
