import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import RockButton from './RockButton';
import ScissorButton from './ScissorButton';

import {playRockHand, playScissorHand} from '../actions/hangsignActions';

class HandsignContainer extends Component {

	render(){
		return (
			<div>
				<RockButton onRockClick={() => this.props.playRockHand('rock')} />
				<ScissorButton onScissorClick={() => this.props.playScissorHand('scissor')} />
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
	return bindActionCreators({
		playRockHand: playRockHand,
		playScissorHand: playScissorHand
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HandsignContainer);
