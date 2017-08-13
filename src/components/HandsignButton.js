import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import { RaisedButton } from 'material-ui';

const style = { margin: '0.5em' };

class HandsignButton extends Component {
	render(){
		return (
			<RaisedButton
				style={style}
				label={<FontAwesome name={this.props.iconName} size='lg' />}
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
