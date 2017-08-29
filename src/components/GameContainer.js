import React, { Component } from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';

import Snackbar from 'material-ui/Snackbar';
import Divider from 'material-ui/Divider';

import * as gameStateActionCreators from '../actions/gameStateActions';
import Lobby from './Lobby';
import Play from './Play';

import { includes } from 'lodash';

const style = { margin: '10em' }; // simple inline styles

const lobbyStates = [
	'LOBBY',
	'LOBBY_JOIN_ROOM_FAILED',
	'WAITING_FOR_OPPONENT',
	'WAITING_FOR_READY'
];

// Something to consider
// https://github.com/reactjs/redux/issues/419
class GameContainer extends Component {
	render(){
		const gameState = this.props.gameState;
		console.log(gameState.state);
		console.log(includes(lobbyStates, gameState.state));
		return (
			<div style={style}>
				<Snackbar
					open={gameState.state === 'LOBBY_JOIN_ROOM_FAILED'}
					message="Cannot Join Room"
					autoHideDuration={4000}
				/>
				<div className="app-header" style={{float: 'left'}}>
					Room: {gameState.roomId}
					<br/>
				</div>
				<br/>
				<Divider style={{display: 'block'}}/>
				<br/>
				<div>
					{includes(lobbyStates, gameState.state) ?
						<Lobby state={gameState.state}
							joinGame={this.props.joinGame}
							roomComplete={this.props.roomComplete}
							setReady={this.props.setReady}
							allReady={this.props.allReady}
						/>
						:
						<Play state={gameState.state} />
					}
				</div>
			</div>
		);
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

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
