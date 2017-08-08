import React, { Component } from 'react';
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import HandsignButton from './HandsignButton';

import { playHandSign } from '../actions/playerStateActions';

let count = 0;
const handsigns = ['rock', 'paper', 'scissors'];
const style = { display: 'inline' };

class HandsignContainer extends Component {
	render(){
		// setup elements
		const elements = handsigns.map((handsign)=>{
			return (
				<HandsignButton
					key={count++}
					handSignType={handsign}
					onHandsignClick={() => this.props.playHandSign(handsign)}
				/>
			);
		});

		return (
			<div style={style}>
				{elements}
			</div>
		);
	}
}

function mapStateToProps(state){
	return {
		handsign: state.handsign
	}
}

function mapDispatchToProps(dispatch){
	// using ES6 property value shorthand, equivalent to { playHandSign: playHandSign, ... }
	return bindActionCreators({ playHandSign }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HandsignContainer);
