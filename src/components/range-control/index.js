import { withState } from '@wordpress/compose';
import {
	RangeControl,
	BaseControl,
	DropdownMenu
} from '@wordpress/components';

import {
	desktop,
	tablet,
	mobile
} from '@wordpress/icons';

import { __ } from '@wordpress/i18n';

const BaseRangeControl = ( props ) => {
	return (
		<RangeControl
			value={ props.value }
			min={ props.min ? props.min : 1 }
			max={ props.max ? props.max : 100 }
			allowReset
			onChange={ props.onChange }
		/>
	)
}

const AdvancedRangeControl = ( props ) => {
	const device = props.device;
	const currentIcon = 'desktop' === device ? desktop : 'tablet' === device ? tablet : 'mobile' === device ? mobile : desktop;

	return (
		<BaseControl label={ props.label } className="ib-block-control--panel">
			<DropdownMenu
				label={ __( 'Responsive' ) }
				icon={ currentIcon }
				controls={ [
					{
						icon: desktop,
						title: __( 'Desktop' ),
						onClick: () => props.setState( { device: 'desktop' } )
					},
					{
						icon: tablet,
						title: __( 'Tablet' ),
						onClick: () => props.setState( { device: 'tablet' } )
					},
					{
						icon: mobile,
						title: __( 'Mobile' ),
						onClick: () => props.setState( { device: 'mobile' } )
					},
				] }
			/>
			{
				'desktop' === device &&
				<BaseRangeControl
					value={ props.value.desktop }
					onChange={ ( value ) => {
						props.onChange( value, device );
					} }
					min={ props.min }
					max={ props.max }
				/>
			}
			{
				'tablet' === device &&
				<BaseRangeControl
					value={ props.value.tablet }
					onChange={ ( value ) => {
						props.onChange( value, device );
					} }
					min={ props.min }
					max={ props.max }
				/>
			}
			{
				'mobile' === device &&
				<BaseRangeControl
					value={ props.value.mobile }
					onChange={ ( value ) => {
						props.onChange( value, device );
					} }
					min={ props.min }
					max={ props.max }
				/>
			}
		</BaseControl>
	)
}

export default withState( {
	device: 'desktop'
} )( AdvancedRangeControl );