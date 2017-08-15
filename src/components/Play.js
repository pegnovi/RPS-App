import React, { Component } from 'react';

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as gameStateActionCreators from '../actions/gameStateActions';
import * as playerStateActionCreators from '../actions/playerStateActions';
import * as gameAndPlayerStateActionCreators from '../actions/gameAndPlayerStateActions';
import RaisedButton from 'material-ui/RaisedButton';
//import FontAwesome from 'react-fontawesome';

import { merge } from 'lodash';

import HandSignContainer from './HandsignContainer';
import ChosenHandSignVisual from './ChosenHandSignVisual';
import ScoreBoardVisual from './ScoreBoardVisual';

class Play extends Component {
	render() {
		const gameState = this.props.gameState;
		const playerState = this.props.playerState;
		let stuffToRender;
		let inGame = false;
		if(gameState.state === 'IN_GAME_CHOOSING') {
			stuffToRender = (
				<div>
					Choose your move before the timer runs out!
				</div>
			);
			inGame = true;
		}
		else if(gameState.state === 'ROUND_OVER') {
			stuffToRender = (<div>
				ROUND OVER
				<br/>
				You {gameState.matchResult.toUpperCase()} !!!
			</div>);
			inGame = true;
		}
		else if(gameState.state === 'GAME_OVER') {
			stuffToRender = (
				<div>
					<p>GAME OVER</p>

					<p>You {gameState.matchResult.toUpperCase()} !!!</p>

					<RaisedButton
						label='exit'
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
			return (
				<div>
					<div>
						{stuffToRender}
					</div>

					<p>Opponent's score: {playerState.opponent.score} / {gameState.maxScore}</p>
					<ChosenHandSignVisual handSign={playerState.opponent.handSign} />

					{/*https://codepen.io/carsy/pen/VvqJwm*/}
					{/*https://kimmobrunfeldt.github.io/progressbar.js/*/}
					<p>You have, {0} seconds remaining to choose.</p>

					<p>Your choice:</p>

					<ChosenHandSignVisual handSign={playerState.own.handSign} />

					<HandSignContainer />
					<p>Score: {playerState.own.score} / {gameState.maxScore}</p>
					<ScoreBoardVisual score={playerState.own.score} maxScore={gameState.maxScore} />

					<form className='debug-controls'>
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
					</form>
				</div>
			);
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
