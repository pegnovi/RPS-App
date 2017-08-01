import React, { Component } from 'react';

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as gameStateActionCreators from '../actions/gameStateActions';

class Play extends Component {
	render() {
		const gameState = this.props.gameState;
		if(gameState === 'IN_GAME_CHOOSING') {
			return (
				<div>
					Choose buttons
				</div>
			);
		}
		else {
			return (<div></div>);
		}

		// UI Structure
		/*
		round number / max rounds
		countdown timer

		opponent's handsign only shows when eval winner
		opponent's score

		own handsign
		own score
		*/

	}
}

function mapStateToProps(state){
	return {
		gameState: state.gameState
	}
}
function mapDispatchToProps(dispatch){
	return bindActionCreators(gameStateActionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Play);
