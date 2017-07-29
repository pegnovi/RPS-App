import React, {Component} from 'react';
import {connect} from 'react-redux';

class HandsignButton extends Component {

	render(){
		return (
			<input
				type='button'
				name={this.props.buttonName}
				value={this.props.buttonValue}
				onClick={() => this.props.onHandsignClick()}
			/>
		);
	}
}

function mapStateToProps(state){
	return {
		handsign: state.handsign
	}
}

export default connect(mapStateToProps)(HandsignButton);
