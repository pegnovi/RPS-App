import React, {Component} from 'react';
import {connect} from 'react-redux';

import { RaisedButton } from 'material-ui';

const style = { margin: '0.5em' };

class HandsignButton extends Component {

	render(){
		return (
			<RaisedButton
				style={style}
				label={this.props.handSignType}
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

// old jsx
// <input
// 	type='button'
// 	name={this.props.handSignType}
// 	value={this.props.handSignType}
// 	onClick={() => this.props.onHandsignClick()}
// />
