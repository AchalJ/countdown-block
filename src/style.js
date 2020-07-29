import { renderStyle } from './components/utils';

const Styles = ( props ) => {
	const attributes = props.attributes;
	const {
		blockId,
		bgColor,
		numberColor,
		textColor,
		numberSize,
		numberSizeTablet,
		numberSizeMobile,
		textSize,
		textSizeTablet,
		textSizeMobile,
		horizontalPadding,
		verticalPadding,
		borderRadius,
		spacing,
		separatorType,
		separatorColor,
		separatorSize,
		circleFgColor,
		circleBgColor,
		circleSize,
		circleSizeTablet,
		circleSizeMobile,
		circleStrokeSize,
		msgTextColor,
		msgTextSize
	} = attributes;

	const selectorPrefix = `#ib-block-${ blockId }`;
	const isCricleLayout = 'circle' === attributes.layout;

	let rules = {
		desktop: {
			'.ib-countdown .ib-countdown-number': {
				'margin-left': spacing ? spacing + 'px' : undefined,
				'margin-right': spacing ? spacing + 'px' : undefined,
			},
			'.ib-countdown .ib-countdown-unit-number': {
				'color': numberColor ? numberColor : undefined,
				'font-size': numberSize ? numberSize + 'px' : undefined,
			},
			'.ib-countdown .ib-countdown-unit-label': {
				'color': textColor ? textColor : undefined,
				'font-size': textSize ? textSize + 'px' : undefined,
			},
			'.ib-countdown .ib-countdown-unit': {
				'padding-left': horizontalPadding ? horizontalPadding + 'px' : undefined,
				'padding-right': horizontalPadding ? horizontalPadding + 'px' : undefined,
				'padding-top': verticalPadding ? verticalPadding + 'px' : undefined,
				'padding-bottom': verticalPadding ? verticalPadding + 'px' : undefined,
				'background-color': ! isCricleLayout && bgColor ? bgColor : undefined,
				'border-radius': ! isCricleLayout && borderRadius ? borderRadius + 'px' : undefined,
			},
			'.ib-countdown-msg': {
				'font-size': msgTextSize ? msgTextSize + 'px' : undefined,
				'color': msgTextColor ? msgTextColor : undefined
			},
		},
		tablet: {
			'.ib-countdown .ib-countdown-unit-number': {
				'font-size': numberSizeTablet ? numberSizeTablet + 'px' : undefined,
			},
			'.ib-countdown .ib-countdown-unit-label': {
				'font-size': textSizeTablet ? textSizeTablet + 'px' : undefined,
			},
		},
		mobile: {
			'.ib-countdown .ib-countdown-unit-number': {
				'font-size': numberSizeMobile ? numberSizeMobile + 'px' : undefined,
			},
			'.ib-countdown .ib-countdown-unit-label': {
				'font-size': textSizeMobile ? textSizeMobile + 'px' : undefined,
			},
		}
	};

	if ( isCricleLayout ) {
		rules.desktop['.ib-countdown .ib-countdown-number'] = {
			...rules.desktop['.ib-countdown .ib-countdown-number'],
			'width': circleSize ? circleSize + 'px' : undefined,
			'height': circleSize ? circleSize + 'px' : undefined,
			'max-width': ! circleSize || '' === circleSize ? '100px' : undefined,
			'max-height': ! circleSize || '' === circleSize ? '100px' : undefined,
		};
		rules.desktop['.ib-countdown .ib-countdown-circle-container'] = {
			'max-width': circleSize ? circleSize + 'px' : undefined,
			'max-height': circleSize ? circleSize + 'px' : undefined,
		};
		rules.desktop['.ib-countdown svg circle'] = {
			'stroke-width': circleStrokeSize ? circleStrokeSize + 'px' : undefined,
		};
		rules.desktop['.ib-countdown svg circle.ib-number-bg'] = {
			'stroke': circleBgColor ? circleBgColor : undefined,
		};
		rules.desktop['.ib-countdown svg circle.ib-number'] = {
			'stroke': circleFgColor ? circleFgColor : undefined,
		};
		// Tablet.
		rules.tablet['.ib-countdown .ib-countdown-number'] = {
			...rules.tablet['.ib-countdown .ib-countdown-number'],
			'width': circleSizeTablet ? circleSizeTablet + 'px' : undefined,
			'height': circleSizeTablet ? circleSizeTablet + 'px' : undefined,
			'max-width': ! circleSizeTablet || '' === circleSizeTablet ? '100px' : undefined,
			'max-height': ! circleSizeTablet || '' === circleSizeTablet ? '100px' : undefined,
		};
		rules.tablet['.ib-countdown .ib-countdown-circle-container'] = {
			'max-width': circleSizeTablet ? circleSizeTablet + 'px' : undefined,
			'max-height': circleSizeTablet ? circleSizeTablet + 'px' : undefined,
		};
		// Mobile.
		rules.mobile['.ib-countdown .ib-countdown-number'] = {
			...rules.mobile['.ib-countdown .ib-countdown-number'],
			'width': circleSizeMobile ? circleSizeMobile + 'px' : undefined,
			'height': circleSizeMobile ? circleSizeMobile + 'px' : undefined,
			'max-width': ! circleSizeMobile || '' === circleSizeMobile ? '100px' : undefined,
			'max-height': ! circleSizeMobile || '' === circleSizeMobile ? '100px' : undefined,
		};
		rules.mobile['.ib-countdown .ib-countdown-circle-container'] = {
			'max-width': circleSizeMobile ? circleSizeMobile + 'px' : undefined,
			'max-height': circleSizeMobile ? circleSizeMobile + 'px' : undefined,
		};
	}

	if ( 'colon' === separatorType ) {
		rules.desktop['.ib-countdown .ib-countdown-number:after'] = {
			'width': spacing ? ( spacing * 2 ) + 'px' : undefined,
			'right': spacing ? '-' + ( spacing * 2 ) + 'px' : undefined,
			'color': separatorColor ? separatorColor : undefined,
			'font-size': separatorSize ? separatorSize + 'px' : undefined
		};
	}
	if ( 'line' === separatorType ) {
		rules.desktop['.ib-countdown .ib-countdown-number:after'] = {
			'right': spacing ? '-' + ( spacing ) + 'px' : undefined,
			'background': separatorColor ? separatorColor : undefined,
			'width': separatorSize ? separatorSize + 'px' : undefined
		};
	}

	return renderStyle( rules, selectorPrefix );
}

export default Styles;
