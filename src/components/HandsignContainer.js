import React, { Component } from 'react';
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import HandsignButton from './HandsignButton';
import { playHandSign } from '../actions/playerStateActions';

const handsigns = ['rock', 'paper', 'scissors'];
const icons = handsigns.map((handsign) => 'hand-' + handsign + '-o'); //font awesome icon names
const style = { display: 'inline-block' };
let count = 0;


// need to call a function which waits three seconds and then dispatches an action
class HandsignContainer extends Component {
	render(){
		// setup elements
		const elements = handsigns.map((handsign, index)=>{
			return (
				<HandsignButton
					key={count++}
					iconName={icons[index]}
					handSignType={handsign}
					onHandsignClick={() => {
						return this.props.playHandSign(handsign)}
					}
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
