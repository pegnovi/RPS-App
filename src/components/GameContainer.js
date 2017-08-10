import React, { Component } from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';

import * as gameStateActionCreators from '../actions/gameStateActions';
import Lobby from './Lobby';
import Play from './Play';

const style = { margin: '10em' }; // simple inline styles for now

// Something to consider
// https://github.com/reactjs/redux/issues/419
class GameContainer extends Component {
	render(){
		const gameState = this.props.gameState;
		return (
			<div style={style}>
				<Lobby state={gameState.state}
					joinGame={this.props.joinGame}
					roomComplete={this.props.roomComplete}
					setReady={this.props.setReady}
					allReady={this.props.allReady}
				/>

				<Play state={gameState.state} />

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
