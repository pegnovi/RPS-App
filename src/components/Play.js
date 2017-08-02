import React, { Component } from 'react';

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as gameStateActionCreators from '../actions/gameStateActions';
import * as playerStateActionCreators from '../actions/playerStateActions';
import * as gameAndPlayerStateActionCreators from '../actions/gameAndPlayerStateActions';

import { merge } from 'lodash';

import HandSignContainer from './HandsignContainer';

class Play extends Component {
	render() {
		const gameState = this.props.gameState;
		const playerState = this.props.playerState;
		let stuffToRender;
		let inGame = false;
		if(gameState.state === 'IN_GAME_CHOOSING') {
			stuffToRender = (
				<div>
					Choose buttons
				</div>
			);
			inGame = true;
		}
		else if(gameState.state === 'GAME_OVER') {
			stuffToRender = (
				<div>
					GAME OVER
					<input type="button"
						name="exit"
						value="exit"
						onClick={() => this.props.exitMatch()}
					/>
				</div>
			);
			inGame = true;
		}
		else {
			stuffToRender = (<div></div>);
		}

		if(inGame) {
			return (<div>
				<br/>
				{stuffToRender}
				<br/>

				{/*
				<br/>
				Round {gameState.round} of {gameState.maxRounds}
				<br/>

				<br/>
				Opponent Score: {playerState.opponent.score}
				*/}

				<br/>
				Opponent Choice: {playerState.opponent.handSign}
				<br/>

				<br/>
				<br/>
				Timer
				<br/>
				<br/>

				<br/>
				{playerState.own.handSign}
				<br/>
				<HandSignContainer />
				<br/>
				{/*
				My Score: {playerState.own.score}
				<br/>
				*/}
				<br/>

				{/* Temporary for testing */}
				<input type="button"
					name="evalWinnerWin"
					value="evalWinnerWin"
					onClick={() => this.props.setMatchResult('win')}
				/>
				<input type="button"
					name="evalWinnerLose"
					value="evalWinnerLose"
					onClick={() => this.props.setMatchResult('lose')}
				/>
				<input type="button"
					name="evalWinnerTie"
					value="evalWinnerTie"
					onClick={() => this.props.setMatchResult('tie')}
				/>


			</div>);
		}
		else {
			return (<div></div>);
		}

	}
}

function mapStateToProps(state){
	return {
		gameState: state.gameState,
		playerState: state.playerState
	}
}
function mapDispatchToProps(dispatch){
	return bindActionCreators(
		merge(
			gameStateActionCreators,
			playerStateActionCreators,
			gameAndPlayerStateActionCreators
		),
		dispatch
	);
}
export default connect(mapStateToProps, mapDispatchToProps)(Play);
