import Markup from './markup';
import Styles from './style';

function Save( props ) {
	const { attributes } = props;

	return (
		<>
			<Styles { ...{ attributes } } />
			<Markup { ...{ attributes } } />
		</>
	);
}

export default Save;