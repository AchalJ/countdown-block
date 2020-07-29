/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import Edit from './edit';
import Save from './save';
import { backup } from '@wordpress/icons';

import blockinfo from '../block.json';

const {
	name,
	title,
	description,
	category,
	keywords
} = blockinfo;

export const registerBlock = () => {
	registerBlockType( name, {
		title,
		description,
		category,
		icon: backup,
		keywords: keywords,
		supports: {
			align: false,
			html: false
		},
		attributes: {
			blockId: {
				type: 'string',
				default: undefined
			},
			layout: {
				type: 'string',
				default: 'numbers',
			},
			timerType: {
				type: 'string',
				default: 'fixed'
			},
			datetime: {
				type: 'string',
				default: new Date(new Date().getTime() + ( 24*60*60*1000 )),
			},
			evergreenTime: {
				type: 'object',
				default: {
					days: '0',
					hours: '0',
					minutes: '0'
				}
			},
			hideDays: {
				type: 'boolean',
				default: false
			},
			hideHours: {
				type: 'boolean',
				default: false
			},
			bgColor: {
				type: 'string',
				default: '',
			},
			numberColor: {
				type: 'string',
				default: '',
			},
			textColor: {
				type: 'string',
				default: '',
			},
			numberSize: {
				type: 'integer',
				default: 24,
			},
			numberSizeTablet: {
				type: 'integer',
				default: 20,
			},
			numberSizeMobile: {
				type: 'integer',
				default: 18,
			},
			textSize: {
				type: 'integer',
				default: 13,
			},
			textSizeTablet: {
				type: 'integer',
				default: 13,
			},
			textSizeMobile: {
				type: 'integer',
				default: 12,
			},
			horizontalPadding: {
				type: 'integer',
				default: '',
			},
			verticalPadding: {
				type: 'integer',
				default: '',
			},
			borderRadius: {
				type: 'integer',
				default: '',
			},
			spacing: {
				type: 'integer',
				default: '',
			},
			separatorType: {
				type: 'string',
				default: 'none',
			},
			separatorColor: {
				type: 'string',
				default: '',
			},
			separatorSize: {
				type: 'integer',
				default: '',
			},
			circleFgColor: {
				type: 'string',
				default: ''
			},
			circleBgColor: {
				type: 'string',
				default: ''
			},
			circleSize: {
				type: 'integer',
				default: 100,
			},
			circleSizeTablet: {
				type: 'integer',
				default: 100,
			},
			circleSizeMobile: {
				type: 'integer',
				default: 100,
			},
			circleStrokeSize: {
				type: 'integer',
				default: 2,
			},
			hideCountdown: {
				type: 'boolean',
				default: false,
			},
			redirect: {
				type: 'boolean',
				default: false,
			},
			redirectTo: {
				type: 'string',
			},
			showMsg: {
				type: 'boolean',
				default: false
			},
			message: {
				type: 'string',
				default: ''
			},
			msgTextColor: {
				type: 'string',
				default: '',
			},
			msgTextSize: {
				type: 'integer',
				default: 20
			}
		},
		edit: Edit,
		save: Save,
	} );
};