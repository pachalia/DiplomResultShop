import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@services': path.resolve(__dirname, 'src/services'),
			'@components': path.resolve(__dirname, 'src/components'),
			'@inputs': path.resolve(__dirname, 'src/inputConfigs'),
			'@interfaces': path.resolve(__dirname, 'src/interfaces'),
			'@routing': path.resolve(__dirname, 'src/routing'),
			'@redux': path.resolve(__dirname, 'src/redux'),
			'@constans': path.resolve(__dirname, 'src/constans'),
			'@types': path.resolve(__dirname, 'src/types'),
		},
	},
});
