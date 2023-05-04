const path = require("path");
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    additionalData: '@import "src/styles/index.scss";',
  },
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'images.ctfassets.net',
			},
		],
	},
	webpack: (config, context) => {
		config.resolve.modules.push(path.resolve(__dirname, './src'));
		config.resolve.modules.push(path.resolve(__dirname, 'public'));
		
		return config;
	}
}

module.exports = nextConfig
