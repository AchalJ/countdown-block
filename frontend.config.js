const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require('path');

const config = {
	...defaultConfig,
	watch: true,
	entry: 'frontend.js',
	output: {
		path: path.resolve(__dirname, 'blocks'),
		filename: 'frontend.js'
	},
    module: {
		...defaultConfig.module,
        rules: [
            ...defaultConfig.module.rules,
        ],
    },
};

if ( 'undefined' !== typeof config.devtool ) {
	delete config.devtool;
}

module.exports = config;