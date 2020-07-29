import Inspector from './inspector';
import Markup from './markup';
import Styles from './style';

function Edit( props ) {
	const { attributes, setAttributes } = props;
	
	if ( props.isSelected && ! attributes.blockId ) {
		const clientId = props.clientId;
		setAttributes( { blockId: clientId.replace( /-/g, '' ) } );
	}

	if ( 'undefined' !== typeof ibCountdown && 'function' === typeof ibCountdown._init ) {
		setTimeout( () => {
			const id = `ib-block-${ attributes.blockId }`;
			if ( 'undefined' !== typeof ibCountdown[ id ] ) {
				if ( null !== localStorage.getItem( id + '-evergreen-endtime' ) ) {
					localStorage.removeItem( id + '-evergreen-endtime' );
				}
				ibCountdown[ id ].initCountdown();
			} else {
				ibCountdown._init();
			}
			toggleCountdown( id );
		}, 500 );
	}

	const toggleCountdown = ( id ) => {
		const el = document.getElementById( id );
		if ( null !== el ) {
			const expired = Date.parse( attributes.datetime ) < Date.now();
			if ( attributes.hideCountdown && expired ) {
				el.firstChild.firstChild.style.display = 'none';
			} else {
				el.firstChild.firstChild.style.display = 'block';
			}
		}
	};

	return (
		<>
			<Inspector {...{ attributes, setAttributes }} />
			<Styles { ...{ attributes } } />
			<Markup { ...{ attributes } } />
		</>
	);
}

export default Edit;