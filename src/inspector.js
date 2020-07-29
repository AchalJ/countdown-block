/**
 * WordPress dependencies
 */
import {
	InspectorControls,
	URLInput
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	RangeControl,
	BaseControl,
	DateTimePicker,
	TextareaControl,
	ToggleControl
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';

import { ColorPickerControl } from './components';
import { AdvancedRangeControl } from './components';
import { TimePickerControl } from './components';

import classnames from 'classnames';

const Inspector = ( props ) => {
	const { attributes, setAttributes } = props;

	return (
		<InspectorControls>
			<PanelBody title={ __( 'General', 'ib-block-countdown' ) } initialOpen>
				<SelectControl
					label={ __( 'Layout', 'ib-block-countdown' ) }
					value={ attributes.layout }
					onChange={ ( layout ) => setAttributes( { layout } ) }
					options={ [
						{ value: 'numbers', label: __( 'Numbers', 'ib-block-countdown' ) },
						{ value: 'circle', label: __( 'Numbers + Circle', 'ib-block-countdown' ) }
					] }
				/>
				<SelectControl
					label={ __( 'Type', 'ib-block-countdown' ) }
					value={ attributes.timerType }
					onChange={ ( timerType ) => setAttributes( { timerType } ) }
					options={ [
						{ value: 'fixed', label: __( 'Fixed Timer', 'ib-block-countdown' ) },
						{ value: 'evergreen', label: __( 'Evergreen Timer', 'ib-block-countdown' ) }
					] }
					help={ 'evergreen' === attributes.timerType ? 
						__( 'The timer will continue from the time visitors first landed on the page regardless of when they enter.', 'ib-block-countdown' ) : 
						__( 'It is used to display the events or offers for a fixed period of time.', 'ib-block-countdown' ) }
				/>
				<BaseControl label={ __( 'Time', 'ib-block-countdown' ) } className={ classnames( 'ib-block-control--datetime', `ib-block-control--datetime-${ attributes.timerType }` ) }>
				{ 'fixed' === attributes.timerType &&
					<DateTimePicker
						currentDate={ attributes.datetime }
						onChange={ ( datetime ) =>
							setAttributes( { datetime } )
						}
						is12Hour={true}
					/>
				}
				{ 'evergreen' === attributes.timerType && 
					<TimePickerControl
						value={ attributes.evergreenTime }
						onChange={ ( evergreenTime ) => { setAttributes( { evergreenTime } ) } }
					/>
				}
				</BaseControl>
				<ToggleControl
					label={ __( 'Hide days', 'ib-block-countdown' ) }
					checked={ attributes.hideDays }
					onChange={ ( hideDays ) => 
						setAttributes( { hideDays } )
					}
				/>
				<ToggleControl
					label={ __( 'Hide hours', 'ib-block-countdown' ) }
					checked={ attributes.hideHours }
					onChange={ ( hideHours ) => 
						setAttributes( { hideHours } )
					}
				/>
			</PanelBody>
			<PanelBody title={ __( 'Numbers and Text', 'ib-block-countdown' ) } initialOpen={false}>
				{ 'circle' !== attributes.layout &&
					<ColorPickerControl
						label={ __( 'Background Color', 'ib-block-countdown' ) }
						value={ attributes.bgColor }
						onChange={ ( bgColor ) =>
							setAttributes( { bgColor } )
						}
					/>
				}
				<ColorPickerControl
					label={ __( 'Number Color', 'ib-block-countdown' ) }
					value={ attributes.numberColor }
					onChange={ ( numberColor ) =>
						setAttributes( { numberColor } )
					}
				/>
				<ColorPickerControl
					label={ __( 'Text Color', 'ib-block-countdown' ) }
					value={ attributes.textColor }
					onChange={ ( textColor ) =>
						setAttributes( { textColor } )
					}
				/>
				<AdvancedRangeControl
					label={ __( 'Number Size', 'ib-block-countdown' ) }
					value={ {
						desktop: attributes.numberSize,
						tablet: attributes.numberSizeTablet,
						mobile: attributes.numberSizeMobile
					} }
					onChange={ ( value, device ) => {
						if ( 'desktop' === device ) {
							setAttributes( { numberSize: value } );
						}
						if ( 'tablet' === device ) {
							setAttributes( { numberSizeTablet: value } );
						}
						if ( 'mobile' === device ) {
							setAttributes( { numberSizeMobile: value } );
						}	
					} }
				/>
				<AdvancedRangeControl
					label={ __( 'Text Size', 'ib-block-countdown' ) }
					value={ {
						desktop: attributes.textSize,
						tablet: attributes.textSizeTablet,
						mobile: attributes.textSizeMobile
					} }
					onChange={ ( value, device ) => {
						if ( 'desktop' === device ) {
							setAttributes( { textSize: value } );
						}
						if ( 'tablet' === device ) {
							setAttributes( { textSizeTablet: value } );
						}
						if ( 'mobile' === device ) {
							setAttributes( { textSizeMobile: value } );
						}	
					} }
				/>
				{
					'numbers' === attributes.layout &&
					<>
						<RangeControl
							label={ __( 'Horizontal Padding', 'ib-block-countdown' ) }
							value={ attributes.horizontalPadding }
							min="1"
							max="100"
							allowReset
							onChange={ ( horizontalPadding ) =>
								setAttributes( { horizontalPadding } )						
							}
						/>
						<RangeControl
							label={ __( 'Vertical Padding', 'ib-block-countdown' ) }
							value={ attributes.verticalPadding }
							min="1"
							max="100"
							allowReset
							onChange={ ( verticalPadding ) =>
								setAttributes( { verticalPadding } )						
							}
						/>
						<RangeControl
							label={ __( 'Border Radius', 'ib-block-countdown' ) }
							value={ attributes.borderRadius }
							min="0"
							max="100"
							allowReset
							onChange={ ( borderRadius ) =>
								setAttributes( { borderRadius } )						
							}
						/>
					</>
				}
				<RangeControl
					label={ __( 'Spacing', 'ib-block-countdown' ) }
					value={ attributes.spacing }
					min="0"
					max="100"
					allowReset
					onChange={ ( spacing ) =>
						setAttributes( { spacing } )						
					}
				/>
			</PanelBody>
			{
				'numbers' === attributes.layout &&
				<PanelBody title={ __( 'Separator', 'ib-block-countdown' ) } initialOpen={false}>
					<SelectControl
						label={ __( 'Separator Type', 'ib-block-countdown' ) }
						value={ attributes.separatorType }
						onChange={ ( separatorType ) => setAttributes( { separatorType } ) }
						options={ [
							{ value: 'none', label: __( 'None', 'ib-block-countdown' ) },
							{ value: 'line', label: __( 'Line', 'ib-block-countdown' ) },
							{ value: 'colon', label: __( 'Colon', 'ib-block-countdown' ) }
						] }
					/>
					{
						'none' !== attributes.separatorType &&
						<>
							<ColorPickerControl
								label={ __( 'Separator Color', 'ib-block-countdown' ) }
								value={ attributes.separatorColor }
								onChange={ ( separatorColor ) =>
									setAttributes( { separatorColor } )
								}
							/>
							<RangeControl
								label={ __( 'Separator Size', 'ib-block-countdown' ) }
								value={ attributes.separatorSize }
								min="0"
								max="100"
								allowReset
								onChange={ ( separatorSize ) =>
									setAttributes( { separatorSize } )						
								}
							/>
						</>
					}
				</PanelBody>
			}
			{
				'circle' === attributes.layout &&
				<PanelBody title={ __( 'Circle', 'ib-block-countdown' ) } initialOpen={false}>
					<ColorPickerControl
						label={ __( 'Circle Foreground Color', 'ib-block-countdown' ) }
						value={ attributes.circleFgColor }
						onChange={ ( circleFgColor ) =>
							setAttributes( { circleFgColor } )
						}
					/>
					<ColorPickerControl
						label={ __( 'Circle Background Color', 'ib-block-countdown' ) }
						value={ attributes.circleBgColor }
						onChange={ ( circleBgColor ) =>
							setAttributes( { circleBgColor } )
						}
					/>
					<AdvancedRangeControl
						label={ __( 'Circle Size', 'ib-block-countdown' ) }
						max="500"
						value={ {
							desktop: attributes.circleSize,
							tablet: attributes.circleSizeTablet,
							mobile: attributes.circleSizeMobile
						} }
						onChange={ ( value, device ) => {
							if ( 'desktop' === device ) {
								setAttributes( { circleSize: value } );
							}
							if ( 'tablet' === device ) {
								setAttributes( { circleSizeTablet: value } );
							}
							if ( 'mobile' === device ) {
								setAttributes( { circleSizeMobile: value } );
							}	
						} }
					/>
					<RangeControl
						label={ __( 'Circle Stroke Size', 'ib-block-countdown' ) }
						value={ attributes.circleStrokeSize }
						min="1"
						max="100"
						allowReset
						onChange={ ( circleStrokeSize ) =>
							setAttributes( { circleStrokeSize } )						
						}
					/>
				</PanelBody>
			}
			<PanelBody title={ __( 'Expiry Settings', 'ib-block-countdown' ) } initialOpen={false}>
				<ToggleControl
					label={ __( 'Hide Time', 'ib-block-countdown' ) }
					checked={ attributes.hideCountdown }
					onChange={ ( hideCountdown ) => 
						setAttributes( { hideCountdown } )
					}
				/>
				<ToggleControl
					label={ __( 'Redirect', 'ib-block-countdown' ) }
					checked={ attributes.redirect }
					onChange={ ( redirect ) => 
						setAttributes( { redirect } )
					}
				/>
				{ attributes.redirect &&
					<URLInput
						className="ib-block-control--url"
						label={ __( 'URL', 'ib-block-count' ) }
						value={ attributes.redirectTo }
						onChange={ ( redirectTo, post ) => setAttributes( { redirectTo } ) }
					/>
				}
				{ ! attributes.redirect &&
					<ToggleControl
						label={ __( 'Show Message', 'ib-block-countdown' ) }
						checked={ attributes.showMsg }
						onChange={ ( showMsg ) => 
							setAttributes( { showMsg } )
						}
					/>
				}
				{ ( ! attributes.redirect && attributes.showMsg ) && (
					<>
					<TextareaControl
						label={ __( 'Message', 'ib-block-countdown' ) }
						value={ attributes.message }
						help={ __( 'Message will be displayed after time expires.', 'ib-block-countdown' ) }
						onChange={ ( message ) =>
							setAttributes( { message } )
						}
					/>
					<ColorPickerControl
						label={ __( 'Message Text Color', 'ib-block-countdown' ) }
						value={ attributes.msgTextColor }
						onChange={ ( msgTextColor ) =>
							setAttributes( { msgTextColor } )
						}
					/>
					<RangeControl
						label={ __( 'Message Text Size', 'ib-block-countdown' ) }
						value={ attributes.msgTextSize }
						min="1"
						max="100"
						allowReset
						onChange={ ( msgTextSize ) =>
							setAttributes( { msgTextSize } )						
						}
					/>
					</>
					)
				}
			</PanelBody>
		</InspectorControls>
	)
}

export default Inspector;