import React, {Component} from 'react';
import {connect} from 'react-redux';

import {RaisedButton} from 'material-ui';

class HandsignButton extends Component {

	render(){
		return (
		<div>

			<RaisedButton
				label={this.props.handSignType}
				onClick={() => this.props.onHandsignClick()}
			/>

		</div>
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
