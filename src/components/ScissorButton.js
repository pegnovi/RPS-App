import React, {Component} from 'react';
import {connect} from 'react-redux';

class ScissorButton extends Component {

	render(){
		return (
			<input
				type='button'
				name='scissor'
				value='scissor'
				onClick={() => this.props.onScissorClick()}
			/>
		);
	}
}

function mapStateToProps(state){
	return {
		handsign: state.handsign
	}
}

export default connect(mapStateToProps)(ScissorButton);
