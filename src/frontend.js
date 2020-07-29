export default class IBCountdownBlock {
	constructor(settings, $) {
		this.$ 					= $;
		this.settings 			= settings;
		this.id 				= settings.container.attr( 'id' );
		this.container 			= settings.container;
		this.layout				= this.container.attr('data-layout');
		this.type 				= 'fixed';
		this.timestamp			= false;
		this.timezone 			= null;
		this._timeInterval		= '';

		// initialize the countdown
		this.initCountdown();
	}
	
	convertIsoToStandard( date ) {
		const d = date.toString().split('T');
		if ( 'undefined' === typeof d[1] || null !== date.toString().match( /\s/g ) ) {
			return date;
		}
		const fragments = d[0].split('-');

		return new Date( `${ fragments[1] }/${ fragments[2] }/${ fragments[0] } ${ d[1] }` );
	}

	/**
	 * Gets the defined timestamp and return the remaining time.
	 *
	 * @since  1.0.0
	 * @return {Object}
	 */
	getTimeRemaining( endtime ) {
		let t       = Date.parse( endtime ) - Date.parse( new Date() );
		let seconds = Math.floor( (t/1000) % 60 );
		let minutes = Math.floor( (t/1000/60) % 60 );
		let hours   = Math.floor( (t/(1000*60*60)) % 24 );
		let days    = Math.floor( t/(1000*60*60*24) );

		if ( 'fixed' === this.type ) {
			if ( 0 === this.dateWrapper.length && 0 === this.hoursWrapper.length ) {
				hours = hours + ( days * 24 );
				minutes = minutes + ( hours * 60 );
			} else if ( 0 === this.dateWrapper.length ) {
				hours = hours + ( days * 24 );
			} else if ( 0 === this.hoursWrapper.length ) {
				minutes = minutes + ( hours * 60 );
			}
		}

		return {
			'total'  : t,
			'days'   : ( days < 10 ) ? ( '0' + days ) : days,
			'hours'  : ( hours < 100 ) ? ('0' + hours).slice(-2) : hours,
			'minutes': ( minutes < 100 ) ? ('0' + minutes).slice(-2) : minutes,
			'seconds': ('0' + seconds).slice(-2)
		};
	}

	/**
	 * Gets the remaining time and updates the respective DOM elements.
	 *
	 * @see    getTimeRemaining()
	 * @since  1.0.0
	 * @return void
	 */
	setTimeRemaining() {
		const t        = this.getTimeRemaining( this.timestamp );
		const wrappers = {
				days  	: this.dateWrapper,
				hours 	: this.hoursWrapper,
				minutes : this.minutesWrapper,
				seconds : this.secondsWrapper,
			};
		const labels = {
				days  	: this.dateLabel,
				hours 	: this.hoursLabel,
				minutes : this.minutesLabel,
				seconds : this.secondsLabel,
			};

		if( t.total <= 0 ){
			clearInterval( this._timeInterval );
			this.$.each( wrappers, ( type, element ) => {
				if ( element.length > 0 ) {
					element.find('.ib-countdown-unit-number').html( '00' );
					let $circle = element.find( '.ib-number' );
					$circle.hide();
				}
			} );
			this.resetCountdown();
			this.runActions();

		} else {
			this.$.each( wrappers, ( type, element ) => {
				if ( element.length > 0 ) {
					element.find('.ib-countdown-unit-number').html( t[type] );
					let $el = element.find('.ib-countdown-unit-label');
					let label = parseInt( t[type] ) != 1 ? labels[type].plural : labels[type].singular;
					$el.html( label );
					let $circle = element.find( '.ib-number' );
					$circle.show();
				}
			} );

			// Hide expiry message.
			this.container.find( '.ib-countdown-msg' ).hide();
			this.container.find( '.ib-countdown-time' ).show();
		}
	}

	runActions() {
		this.container.trigger( 'countdown_expire', this.container );

		// Show expiry message.
		this.container.find( '.ib-countdown-msg' ).show();

		// Hide timer.
		if ( JSON.parse( this.hide ) ) {
			this.container.find( '.ib-countdown-time' ).hide();
		}

		// Redirect.
		if ( this.container.find( '.ib-countdown-redirect' ).length > 0 ) {
			const redirectTo = this.container.find( '.ib-countdown-redirect' ).val();
			if ( '' !== redirectTo && ! this.$( 'body' ).hasClass( 'wp-admin' ) ) {
				location.href = redirectTo;
			}
		}
	}

	setCircleCount() {
		const t   = this.getTimeRemaining( this.timestamp );
		const max = {
				days  	: 365,
				hours 	: 24,
				minutes : 60,
				seconds : 60
			};
		const circles = {
				days    : this.dateWrapper.find( 'svg' ),
				hours   : this.hoursWrapper.find( 'svg' ),
				minutes : this.minutesWrapper.find( 'svg' ),
				seconds : this.secondsWrapper.find( 'svg' ),
			};

		this.$.each( circles, ( type, element ) => {
			if ( element.length > 0 ) {
				let $circle   = element.find( '.ib-number' ),
					r      	  = $circle.attr('r'),
					circle 	  = Math.PI*(r*2),
					val    	  = t[type],
					total 	  = max[type],
					stroke 	  = ( 1 - ( val / total ) ) * circle;

				$circle.css({ strokeDashoffset: stroke });
			}
		} );

	}

	fixCircleAttrs() {
		if ( this.wrapper.find( 'circle' ).length === 0 ) {
			return;
		}

		const self = this;

		this.wrapper.find( 'circle' ).each( function() {
			let strokedasharray = self.$(this).attr( 'strokedasharray' );
			let strokedashoffset = self.$(this).attr( 'strokedashoffset' );
			if ( 'undefined' !== typeof strokedasharray ) {
				self.$(this).removeAttr( 'strokedasharray' ).attr( 'stroke-dasharray', strokedasharray );
			}
			if ( 'undefined' !== typeof strokedashoffset ) {
				self.$(this).removeAttr( 'strokedashoffset' ).attr( 'stroke-dashoffset', strokedashoffset );
			}
		} );
	}

	resetCountdown() {
		//this.container.html( this.html );
		this.initElements();

		const wrappers = {
			days  	: this.dateWrapper,
			hours 	: this.hoursWrapper,
			minutes : this.minutesWrapper,
			seconds : this.secondsWrapper,
		};

		clearInterval( this._timeInterval );
		this.$.each( wrappers, ( type, element ) => {
			if ( element.length > 0 ) {
				element.find('.ib-countdown-unit-number').html( '00' );
				let $circle = element.find( '.ib-number' );
				$circle.hide();
			}
		} );
	}

	setTimeZone( timezone = '' ) {
		if ( '' === timezone ) {
			return;
		}

		this.container.attr('data-timezone', timezone);
		this.initCountdown();
	}

	initElements() {
		this.wrapper 			= this.container.find( '.ib-countdown' );
		this.dateWrapper		= this.container.find( '.ib-countdown-days' );
		this.dateLabel 			= this.dateWrapper.find( '.ib-countdown-unit-label' ).data( 'label' );
		this.hoursWrapper		= this.container.find( '.ib-countdown-hours' );
		this.hoursLabel			= this.hoursWrapper.find( '.ib-countdown-unit-label' ).data( 'label' );
		this.minutesWrapper		= this.container.find( '.ib-countdown-minutes' );
		this.minutesLabel		= this.minutesWrapper.find( '.ib-countdown-unit-label' ).data( 'label' );
		this.secondsWrapper		= this.container.find( '.ib-countdown-seconds' );
		this.secondsLabel		= this.secondsWrapper.find( '.ib-countdown-unit-label' ).data( 'label' );
		this.type 				= JSON.parse( this.container.attr( 'data-fixed' ) ) ? 'fixed' : 'evergreen';
		this.layout 			= this.container.attr( 'data-layout' );
		this.hide 				= this.container.attr( 'data-hide' );
	}

	initEvergreen() {
		const cacheKey = this.id + '-evergreen-endtime';
		const days = this.timestamp.split( ',' )[0];
		const time = this.timestamp.split( ',' )[1].split(':');
		const secondsInDays = Math.floor( days * 24 * 60 * 60 );
		const secondsInHours = Math.floor( time[0] * 60 * 60 );
		const secondsInMinutes = Math.floor( time[1] * 60 );
		const seconds = Math.floor( time[2] );
		const endTime = Date.now() + ( ( secondsInDays + secondsInHours + secondsInMinutes + seconds ) * 1000 );

		this.timestamp = new Date( endTime );
		localStorage.setItem( cacheKey, endTime );
	}

	initTimestamp() {
		this.timestamp = this.container.attr('data-time'); 
		this.timezone = this.container.attr('data-timezone');

		if ( 'evergreen' === this.type ) {
			const cacheKey = this.id + '-evergreen-endtime';
			const cachedTime = localStorage.getItem( cacheKey );
			if ( null === cachedTime ) {
				this.initEvergreen();
			}
			if ( null !== cachedTime && cachedTime > 0 ) {
				this.timestamp = new Date( parseInt( cachedTime ) );
			}
		}

		if ( 'undefined' !== typeof this.timezone && null !== this.timezone ) {
			this.timestamp += this.timezone;
		}

		if ( ! this.timestamp || 'undefined' === typeof this.timestamp ) {
			this.timestamp = new Date(new Date().getTime() + ( 24*60*60*1000 ));
		} else {
			this.timestamp = this.convertIsoToStandard( this.timestamp );
		}
	}

	/**
	 * Initialize the logic for the countdown.
	 *
	 * @see    setTimeRemaining()
	 * @since  1.0.0
	 * @return void
	 */
	initCountdown() {
		this.initElements();

		const self = this;

		if ( 0 === this.wrapper.length ) {
			return;
		}

		this.resetCountdown();
		this.initTimestamp();

		this.fixCircleAttrs();
		this.setTimeRemaining();

		if( this.layout == 'circle' ){
			this.setCircleCount();
		}

		clearInterval( this._timeInterval );
		this._timeInterval = setInterval( function(){
			self.setTimeRemaining();
			if( self.layout == 'circle' ){
				self.setCircleCount();
			}
		}, 1000 );

	}
}
;(function($) {
	window['ibCountdown'] = window['ibCountdown'] || {};

	let initCountdown = () => {
		$('.ib-block-countdown').each(function() {
			let id = $(this).attr('id');
			if ( 'undefined' !== typeof window['ibCountdown'][ id ] ) {
				window['ibCountdown'][ id ].initCountdown();
			} else {
				window['ibCountdown'][ id ] = new IBCountdownBlock( {
					container: $(this)
				}, $ );
			}
		});
	};

	window['ibCountdown']['_init'] = initCountdown;

	if ( 'undefined' !== typeof wp.domReady ) {
		wp.domReady( initCountdown );
	} else {
		$( document ).ready( initCountdown );
	}
})(jQuery);