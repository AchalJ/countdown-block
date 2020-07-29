import { withState } from '@wordpress/compose';
import {
	BaseControl,
	SelectControl,
	TextControl
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';

const TimePickerControl = ( props ) => {
	let values = {
		days: props.value.days ? props.value.days : '0',
		hours: props.value.hours ? props.value.hours : '0',
		minutes: props.value.minutes ? props.value.minutes : '0',
	}

	const onChange = ( value, type ) => {
		value = Number( value );
		if ( isNaN( value ) || 0 > value ) {
			value = 0;
		}
		values[ type ] = value;
		props.onChange( values );
		console.log(values, props);
	}

	const getRange = ( start, end ) => {
		let range = [];
		for ( let i = start; i <= end; i++ ) {
			let number = i < 10 ? '0' + i : i;
			range.push( number );
		}

		return range;
	}

	const getOptions = ( type ) => {
		let range = [];
		let options = [];

		if ( 'days' === type ) {
			range = getRange( 0, 31 );
		}
		if ( 'hours' === type ) {
			range = getRange( 0, 23 );
		}
		if ( 'minutes' === type ) {
			range = getRange( 0, 59 );
		}

		range.forEach((i) => {
			options.push( {
				value: parseInt( i ),
				label: i
			} );
		});

		return options
	}

	return (
		<BaseControl label={ props.label ? props.label : '' } className="ib-block-control--timepicker">
			<TextControl
				label={ __( 'Days' ) }
				min="1"
				value={ values.days }
				onChange={ ( value ) => { onChange( value, 'days' ) } }
			/>
			<SelectControl
				label={ __( 'Hours' ) }
				value={ values.hours }
				onChange={ ( value ) => { onChange( value, 'hours' ) } }
				options={ getOptions( 'hours' ) }
			/>
			<SelectControl
				label={ __( 'Minutes' ) }
				value={ values.minutes }
				onChange={ ( value ) => { onChange( value, 'minutes' ) } }
				options={ getOptions( 'minutes' ) }
			/>
		</BaseControl>
	)
}

export default TimePickerControl;