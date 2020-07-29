/**
 * External dependencies
 */
import classnames from 'classnames';
import map from 'lodash/map';

import { __ } from '@wordpress/i18n';

const Markup = ( props ) => {
	const attributes = props.attributes;
	const counters = {
		days: {
			'singular' : __( 'Day', 'ib-block-countdown' ),
			'plural'   : __( 'Days', 'ib-block-countdown' ),
		},
		hours: {
			'singular' : __( 'Hour', 'ib-block-countdown' ),
			'plural'   : __( 'Hours', 'ib-block-countdown' ),
		},
		minutes: {
			'singular' : __( 'Minute', 'ib-block-countdown' ),
			'plural'   : __( 'Minutes', 'ib-block-countdown' ),
		},
		seconds: {
			'singular' : __( 'Second', 'ib-block-countdown' ),
			'plural'   : __( 'Seconds', 'ib-block-countdown' ),
		},
	};

	const renderCircles = () => {
		const size = attributes.circleSize ? attributes.circleSize : 100;
		const pos = size / 2;
		const radius = pos - 10;
		const dash = ((Math.PI * 2) * radius).toFixed(2);

		return(
			<div className='ib-countdown-svg-wrap'>
				<svg className="svg" viewBox={`0 0 ${size} ${size}`} version="1.1" preserveAspectRatio="xMinYMin meet">
					<circle className="ib-number-bg" r={ radius } cx={ pos } cy={ pos } fill="transparent" strokeDasharray={ dash } strokeDashoffset="0"></circle>
					<circle className="ib-number" r={ radius } cx={ pos } cy={ pos } fill="transparent" strokeDasharray={ dash } strokeDashoffset={ dash } transform={`rotate(-90 ${pos} ${pos})`}></circle>
				</svg>	
			</div>
		)
	};

	const getTime = () => {
		let output = attributes.datetime;
		if ( 'evergreen' === attributes.timerType ) {
			const time = attributes.evergreenTime;
			let { days, hours, minutes } = time;
			days = Number( days ) < 10 ? '0' + days : days;
			hours = Number( hours ) < 10 ? '0' + hours : hours;
			minutes = Number( minutes ) < 10 ? '0' + minutes : minutes;
			output = `${ days },${ hours }:${ minutes }:00`;
		}
		return output;
	}

	return (
		<div
			id={`ib-block-${ attributes.blockId }`}
			className="ib-block-countdown"
			data-time={ getTime() }
			data-layout={ attributes.layout }
			data-fixed={ 'fixed' === attributes.timerType }
			data-hide={ attributes.hideCountdown }
		>
			<div
				className={
					classnames(
						'ib-countdown',
						`ib-countdown-layout-${ attributes.layout }`,
						'none' !== attributes.separatorType && 'numbers' === attributes.layout ? `ib-countdown-separator-${ attributes.separatorType }` : '',
					)
				}
			>
				<div className="ib-countdown-time">
				{
					map( counters, ( data, key ) => {
						if ( 'days' === key && attributes.hideDays ) {
							return;
						}
						if ( 'hours' === key && attributes.hideHours ) {
							return;
						}
						return(
							<div className={ classnames( 'ib-countdown-number', `ib-countdown-${key}` ) } key={key}>
								<div className="ib-countdown-unit">
									<span className="ib-countdown-unit-number">00</span>
									<div className="ib-countdown-unit-label" data-label={ JSON.stringify( data ) }>{ data.singular }</div>
								</div>
								{
									'circle' === attributes.layout && (
										<div className="ib-countdown-circle-container">
											{ renderCircles() }
										</div>
									)
								}
							</div>
						);
					})
				}
				</div>
				{
					( ! attributes.redirect && attributes.showMsg ) &&
					<div className="ib-countdown-msg">{ attributes.message }</div>
				}
				{
					( attributes.redirect && attributes.redirectTo ) && 
					<input type="hidden" className="ib-countdown-redirect" value={ `${ attributes.redirectTo }` } />
				}
			</div>
		</div>
	)
}

export default Markup;