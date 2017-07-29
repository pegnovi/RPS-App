import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import RockButton from './RockButton';
import ScissorButton from './ScissorButton';
import HandsignButton from './HandsignButton';

import {playRockHand, playScissorHand, playHandSign} from '../actions/hangsignActions';

class HandsignContainer extends Component {

	render(){
		return (
			<div>
				<RockButton onRockClick={() => this.props.playRockHand('rock')} />
				<ScissorButton onScissorClick={() => this.props.playScissorHand('scissor')} />
				<HandsignButton
					handSignType='paper'
					onHandsignClick={() => this.props.playHandSign('paper')}
				/>
				<HandsignButton
					handSignType='rocketlauncher'
					onHandsignClick={() => this.props.playHandSign('rocketlauncher')}
				/>
			</div>
		);
	}

}

function mapStateToProps(state){
	console.log('state', state);
	return {
		handsign: state.handsign
	}
}

function mapDispatchToProps(dispatch){
	// using ES6 property value shorthand, equivalent to { playRockHand: playRockHand, ... }
	return bindActionCreators({ playRockHand, playScissorHand, playHandSign }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HandsignContainer);
